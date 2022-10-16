import React, {useState, useEffect, Fragment} from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../Api/FecthData';
import { checkDataAgeToCleanLocaleStorage } from '../cleanStorage/CleanStorage'

const GalleryShow = () => {

  const params = useParams()

  const imagePath = process.env.REACT_APP_AWS_S3_URL;

  const [infos ,setInfos] = useState([]);
  const [nameImages, setNameImages] = useState([]);


  useEffect(() => {

    if (localStorage.getItem('storageDateIndex')) {
      const date = localStorage.getItem('storageDateIndex');
      checkDataAgeToCleanLocaleStorage (date);
     }

    return () => {
      getInfos();

    }
  }, []);


  // to slow  if is inside function getInfo
  const isInLocaleStorage = localStorage.hasOwnProperty(`infoStorageGallery${params.id}`)

  const getInfos = async () => {

    if (isInLocaleStorage) {

      console.log(`storage gallery ${params.id}`)

      const infoStorage = JSON.parse(localStorage.getItem(`infoStorageGallery${params.id}`));
      const imageStorage = JSON.parse(localStorage.getItem(`imageStorageGallery${params.id}`));

      setInfos(infoStorage);
      setNameImages(imageStorage);

    } else {

      const fetchedData = await fetchData(`http://127.0.0.1:8000/api/blog_posts/${params.id}`);
      setInfos(fetchedData);

      const tmpImageStorage = [];

      fetchedData?.productImages?.forEach(element => {

          const filesName = fetchData('http://localhost:8000' + element);

          filesName.then(data => {
            setNameImages(prevState => [...prevState, data])
            tmpImageStorage.push(data);
            localStorage.setItem(`imageStorageGallery${params.id}`, JSON.stringify(tmpImageStorage))
          })
        })

      localStorage.setItem(`infoStorageGallery${params.id}`, JSON.stringify(fetchedData));

      if (!localStorage.getItem('storageDateIndex') ) {
        localStorage.setItem('storageDateIndex', Date.now());
      }
    }
  }

  const {title, text} = infos;

  return (
    <Fragment>
      <div>GalleryShow</div>

      <div>
          {
            nameImages.map(({id, name}) => {
              return (

                <img key={id} src={imagePath + name} alt={name} className="avatar-large m-2"  />
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
