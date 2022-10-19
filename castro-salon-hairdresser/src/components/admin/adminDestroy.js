
import { fetchDataWithMethod } from "../../Api/FetchDataWithMethod";


export const galleryDestroy = async (idBlogPost) => {

  const urlBlogPosts = `http://127.0.0.1:8000/api/blog_posts/${idBlogPost}`;

  const options = {};

  const fetchedData = await fetchDataWithMethod(urlBlogPosts, 'DELETE', options);

  return fetchedData
}

export const textIntroDestroy = async (idTextIntro) => {

  const urlBlogPosts = `http://127.0.0.1:8000/api/text_intros/${idTextIntro}`;

  const options = {};

  const fetchedData = await fetchDataWithMethod(urlBlogPosts, 'DELETE', options);

  return fetchedData
}
