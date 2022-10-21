
import { fetchDataWithMethod } from "../../Api/FetchDataWithMethod";

const urlMain = process.env.REACT_APP_URL_MAIN



export const galleryDestroy = async (idBlogPost) => {

  const urlBlogPosts = `${urlMain}/api/blog_posts/${idBlogPost}`;

  const options = {};

  const fetchedData = await fetchDataWithMethod(urlBlogPosts, 'DELETE', options);

  return fetchedData
}

export const textIntroDestroy = async (idTextIntro) => {

  const urlBlogPosts = `${urlMain}/api/text_intros/${idTextIntro}`;

  const options = {};

  const fetchedData = await fetchDataWithMethod(urlBlogPosts, 'DELETE', options);

  return fetchedData
}
