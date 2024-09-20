const BASE_URL = import.meta.env.VITE_BASE_URL ;
console.log("BASE URL",BASE_URL);

export const authEndpoints = {
    SIGNUP : `${BASE_URL}/api/v1/user/register`,
    LOGIN : `${BASE_URL}/api/v1/user/login` ,
    SUGGESTED_USER : `${BASE_URL}/api/v1/user/suggestedUser` ,
    GET_PROFILE : `${BASE_URL}/api/v1/user/getProfile`,
    EDIT_PROFILE : `${BASE_URL}/api/v1/user/editProfile`
}

export const postEndpoints = {
    CREATE_POST : `${BASE_URL}/api/v1/post/addPost`,
    FETCH_ALL_POST :  `${BASE_URL}/api/v1/post/getAllPosts` ,
    DELETE_POST :`${BASE_URL}/api/v1/post/deletePost`,
    LIKE_DISLIKE :`${BASE_URL}/api/v1/post/likeOrDislikePost`,
    COMMENT_ON_POSTS : `${BASE_URL}/api/v1/post/addComment`
}