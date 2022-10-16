import React, {useState, useEffect, Fragment} from 'react'
import { Link } from "react-router-dom";
import Banner from './Banner';
import { fetchData } from '../Api/FecthData';

const Gallery = () => {

  const imagePath = process.env.REACT_APP_AWS_S3_URL;

  const [info ,setInfo] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);


  useEffect(() => {

    if (localStorage.getItem('storageDateIndex')) {
      const date = localStorage.getItem('storageDateIndex');
      checkDataAgeToCleanLocaleStorage (date);
     }


    return () => {
      getInfo();

    }

  }, []);

  // const fetchData = async url => {

  //   try {

  //     const response = await fetch(url);

  //     if(!response.ok) {
  //       throw new Error();
  //     }

  //     const fetchedData = await response.json();

  //     return fetchedData;

  //   } catch (err) {

  //     console.log(err.message);
  //   }
  // }

  const checkDataAgeToCleanLocaleStorage = date => {
    const today = new Date(Date.now()).getDate();
    const dataDate = new Date(parseInt(date)).getDate()

    if (today - dataDate >= 2) {
      localStorage.clear()
      localStorage.setItem('storageDateIndex', Date.now());
    }

  }

  const isLocaleStorage = localStorage.hasOwnProperty('infoIndex')
  // to slow if is inside function getInfo
  const getInfo = async () => {

    if (isLocaleStorage) {

      console.log('storage')
      const storage = JSON.parse(localStorage.getItem('infoIndex'));

      const imageStorage = JSON.parse(localStorage.getItem('imageIndex'));

      setInfo(storage);
      setImageUrl(imageStorage);

    } else {

      const fetchedData = await fetchData('http://127.0.0.1:8000/api/blog_posts');
      setInfo(fetchedData);

      const imageStorage = [];

      fetchedData["hydra:member"]?.forEach(element => {
          const fileName = fetchData('http://localhost:8000' + element.productImages[0]);

          fileName.then(data => {

           setImageUrl(prevState => [...prevState, data])

           imageStorage.push(data);
           localStorage.setItem('imageIndex', JSON.stringify(imageStorage))
          })
        })

      localStorage.setItem('infoIndex', JSON.stringify(fetchedData));

      if ( !localStorage.getItem('storageDateIndex') ) {
        localStorage.setItem('storageDateIndex', Date.now());
      }
    }

  }


  const sortImages = imageUrl?.sort((a,b)=> parseInt(a.post.replace(/[^0-9]/g, "")) - parseInt(b.post.replace(/[^0-9]/g, "")));


  return (
    <Fragment>
      <Banner />
      <div>GalleryIndex</div>


      {
        info?.['hydra:member']?.map(({id, title} , index )=> {


          return (
            <Link to={`/gallerie/${id}`} key={id} >
              <Fragment >

                <div className='m-3'>
                  <h2 className='border border-success rounded w-25'>{title}</h2>
                  <p>{id}</p>
                  {sortImages[index] !== undefined && <img src={imagePath + sortImages[index]?.name} alt={sortImages[index]?.name} className="avatar-large" />}
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