const Blogs = require('../../models/Blogs');
const User = require('../../models/User');

const ALLOWED_BLOG_IMAGE_MIME_TO_EXT = {
    jpeg: 'jpg',
    jpg: 'jpg',
    png: 'png',
    gif: 'gif',
    webp: 'webp'
};

function getBaseUrl(req) {
    return process.env.BACKEND_PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
}

function addImageUrl(req, blog) {
    const item = blog.toObject ? blog.toObject() : blog;

    let image_url = '';
    if (item.image_mimetype) {
        image_url = `${getBaseUrl(req)}/api/blogs/image/${item._id}`;
    } else if (item.image_extension) {
        // legacy blogs whose image was saved to disk before DB-backed storage
        image_url = `${getBaseUrl(req)}/assets/img/blogs/${item._id}.${item.image_extension}`;
    }

    return {
        ...item,
        image_url
    };
}

function parseBase64Image(image) {
    if (typeof image !== 'string') {
        return {
            image_extension: undefined,
            mimetype: undefined,
            imageBuffer: undefined
        };
    }

    const match = image.match(/^data:image\/(\w+);base64,(.+)$/);

    if (!match) {
        return {
            image_extension: undefined,
            mimetype: undefined,
            imageBuffer: undefined
        };
    }

    const mimeExt = match[1].toLowerCase();
    const image_extension = ALLOWED_BLOG_IMAGE_MIME_TO_EXT[mimeExt];

    if (!image_extension) {
        return {
            image_extension: undefined,
            mimetype: undefined,
            imageBuffer: undefined
        };
    }

    return {
        image_extension,
        mimetype: `image/${mimeExt}`,
        imageBuffer: Buffer.from(match[2], 'base64')
    };
}

exports.getImage = async function (req, res) {
    const blog = await Blogs.findById(req.params.id).select('image_data image_mimetype').catch(() => null);
    if (!blog || !blog.image_data) {
        return res.status(404).end();
    }
    res.set('Content-Type', blog.image_mimetype || 'application/octet-stream');
    return res.send(blog.image_data);
};

exports.getBlogs = async function (req, res) {
    try {
        const result = await Blogs.find({ parent_email: '' }).select('-image_data').lean();
        return res.status(200).json(result.map((blog) => addImageUrl(req, blog)));
    } catch (err) {
        console.log(err);
        return res.status(500).json([]);
    }
};

exports.getBlogComments = async function (req, res) {
    try {
        const { email } = req.body;
        const result = await Blogs.find({ parent_email: email }).select('-image_data').lean();
        return res.status(200).json(result.map((blog) => addImageUrl(req, blog)));
    } catch (err) {
        console.log(err);
        return res.status(500).json([]);
    }
};

exports.postBlog = async function (req, res) {
    try {
        const { email, title, content, image } = req.body;
        const { image_extension, mimetype, imageBuffer } = parseBase64Image(image);

        const blog = await Blogs.create({
            email,
            title,
            content,
            image_extension,
            image_data: imageBuffer,
            image_mimetype: mimetype,
            parent_email: ''
        });

        return res.json({
            result: 'success',
            blog: addImageUrl(req, blog)
        });
    } catch (err) {
        console.log(err);
        return res.json({
            result: 'fail'
        });
    }
};

exports.postComment = async function (req, res) {
    try {
        const data = req.body.data;
        const { email, comment, parent_email } = data;
        const user = await User.findOne({ email });

        await Blogs.create({
            email,
            content: comment,
            parent_email,
            title: user?.name || email
        });

        return res.json({
            result: 'success'
        });
    } catch (err) {
        console.log(err);
        return res.json({
            result: 'fail'
        });
    }
};
