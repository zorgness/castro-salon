
import { fetchDataWithMethod } from "../../Api/FetchDataWithMethod";
import { s3 } from "../../S3/S3";



export const galleryDestroy = async (idBlogPost) => {

  const urlBlogPosts = `http://127.0.0.1:8000/api/blog_posts/${idBlogPost}`;

  const options = {};

  const fetchedData = await fetchDataWithMethod(urlBlogPosts, 'DELETE', options);

  return fetchedData
}
