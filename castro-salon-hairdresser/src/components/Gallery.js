import React, {useState, useEffect, Fragment} from 'react'
import { Link } from "react-router-dom";
import Banner from './Banner';
import { fetchData } from '../Api/FecthData';
import { checkDataAgeToCleanLocaleStorage } from '../cleanStorage/CleanStorage'

const Gallery = () => {

  const imagePath = process.env.REACT_APP_AWS_S3_URL;

  const [infos ,setInfos] = useState([]);
  const [nameImages, setNameImages] = useState([]);
  const [load, setLoad] = useState(true);


  useEffect(() => {

    if (localStorage.getItem('storageDateIndex')) {
      const date = localStorage.getItem('storageDateIndex');
      checkDataAgeToCleanLocaleStorage (date);
     }

     // to slow  if is inside function getInfo
  const isInLocaleStorage = localStorage.hasOwnProperty('infoStorageGallery')

  const getInfos = async () => {

    if (isInLocaleStorage) {

      console.log('storage gallery')

      const infoStorage = JSON.parse(localStorage.getItem('infoStorageGallery'));
      const imageStorage = JSON.parse(localStorage.getItem('imageStorageGallery'));

      setInfos(infoStorage);
      setNameImages(imageStorage);

    } else {

      const fetchedData = await fetchData('http://127.0.0.1:8000/api/blog_posts');
      setInfos(fetchedData);

      const tmpImageStorage = [];

      fetchedData["hydra:member"]?.forEach(element => {

          const filesName = fetchData('http://localhost:8000' + element.productImages[0]);

          filesName.then(data => {
            setNameImages(prevState => [...prevState, data])
            tmpImageStorage.push(data);
            localStorage.setItem('imageStorageGallery', JSON.stringify(tmpImageStorage))
          })
        })

      localStorage.setItem('infoStorageGallery', JSON.stringify(fetchedData));

      if ( !localStorage.getItem('storageDateIndex') ) {
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

  }, [infos, load]);



  // to sort images by post id
  const sortedImages = nameImages?.sort((a,b)=> parseInt(a.post.replace(/[^0-9]/g, "")) - parseInt(b.post.replace(/[^0-9]/g, "")));


  return (
    <Fragment>

      <Banner />
        <div>GalleryIndex</div>

        {

        infos?.['hydra:member']?.map(({id, title} , index )=> {

           return (
            <Link to={`/gallerie/${id}`} key={id} >
              <Fragment >

                <div className='m-3'>
                  <h2 className='border border-success rounded w-25'>{title}</h2>
                  {sortedImages[index] !== undefined && <img src={imagePath + sortedImages[index]?.name} alt={sortedImages[index]?.name} className="avatar-large" />}
                </div>

              </Fragment>
            </Link>
            )
          })
        }

    </Fragment>

  )
}

export default Gallery
