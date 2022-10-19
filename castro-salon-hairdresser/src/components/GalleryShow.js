import React, {useState, useEffect, Fragment} from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../Api/FecthData';
import { checkDataAgeToCleanLocaleStorage } from '../cleanStorage/CleanStorage'

const GalleryShow = () => {

  const params = useParams()

  const imagePath = process.env.REACT_APP_AWS_S3_URL;
  const urlBlogPosts = `http://127.0.0.1:8000/api/blog_posts/${params.id}`;

  const [infos ,setInfos] = useState([]);
  const [nameImages, setNameImages] = useState([]);
  const [load, setLoad] = useState(true);



  useEffect(() => {

    if (localStorage.getItem('storageDateIndex')) {
      const date = localStorage.getItem('storageDateIndex');
      checkDataAgeToCleanLocaleStorage (date);
     }

  const isInLocaleStorage = localStorage.hasOwnProperty(`infoStorageGallery${params.id}`)
  const getInfos = async () => {

    if (isInLocaleStorage) {

      console.log(`storage gallery ${params.id}`)

      const infoStorage = JSON.parse(localStorage.getItem(`infoStorageGallery${params.id}`));
      const imagesStorage = JSON.parse(localStorage.getItem(`imageStorageGallery${params.id}`));

      setInfos(infoStorage);
      setNameImages(imagesStorage);

    } else {

      console.log("api")

      const fetchedData = await fetchData(urlBlogPosts);
      setInfos(fetchedData);

      const tmpImageStorage = [];

      fetchedData?.productImages?.forEach(element => {

          const filesName = fetchData('http://localhost:8000' + element);

          filesName.then(data => {
            tmpImageStorage.push(data);
            setNameImages([...tmpImageStorage])
            localStorage.setItem(`imageStorageGallery${params.id}`, JSON.stringify(tmpImageStorage))
          })
        })

      localStorage.setItem(`infoStorageGallery${params.id}`, JSON.stringify(fetchedData));

      if (!localStorage.getItem('storageDateIndex') ) {
        localStorage.setItem('storageDateIndex', Date.now());
      }
    }
  }

    if(load) {

      return () => {
        getInfos();
        setLoad(false)
      }
    }

  }, [infos, load, params.id, urlBlogPosts]);;



  const {title, text} = infos;

  return (
    <Fragment>
      <div>GalleryShow</div>

      <div>
          {
            nameImages?.map(({id, name}) => {
              return (

                <img key={id} src={imagePath + name} alt={name} className="m-2 w-25"  />
              )
            })
          }
      </div>

        <div className='m-3'>
          <h2 className='text-center'>{title}</h2>
          <p>{text}</p>
        </div>

    </Fragment>
  )
}

export default GalleryShow
