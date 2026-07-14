const fs = require('fs');
const path = require('path');
const User = require('../../models/User');

exports.getAvatar = async (req, res) => {
    const user = await User.findById(req.params.id)
        .select('avatar_data avatar_mimetype avatar_extension')
        .catch(() => null);

    if (!user) {
        return res.status(404).end();
    }

    if (user.avatar_data) {
        res.set('Content-Type', user.avatar_mimetype || 'application/octet-stream');
        return res.send(user.avatar_data);
    }

    // Fall back to a legacy avatar saved to disk before images moved into the DB.
    if (user.avatar_extension) {
        const legacyPath = path.join(process.cwd(), 'public', 'img', 'uploads', `${user._id}.${user.avatar_extension}`);
        if (fs.existsSync(legacyPath)) {
            return res.sendFile(legacyPath);
        }
    }

    return res.status(404).end();
};
