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
    if (!id || !user?.avatar_extension) return undefined;
    return `${API_BASE_URL}/api/users/avatar/${id}`;
};

export const isArray = (value) => {
    let is_array = true;
    for(let key in value) {
        is_array = false;
    }
    return is_array;
}