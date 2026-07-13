import { API_BASE_URL } from '../config/const';

export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        callback(reader.result);
    });
    reader.readAsDataURL(img);
};

export const getAvatarUrl = (user) => {
    const id = user?.id || user?._id;
    const extension = user?.avatar_extension;
    if (!id || !extension) return undefined;
    return `${API_BASE_URL}/uploads/${id}.${extension}`;
};

export const isArray = (value) => {
    let is_array = true;
    for(let key in value) {
        is_array = false;
    }
    return is_array;
}