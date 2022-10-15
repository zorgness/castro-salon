import React, {useState, useEffect, Fragment} from 'react'
import Banner from './Banner';

const Gallery = () => {

  const imagePath = process.env.REACT_APP_AWS_S3_URL;

  const [info ,setInfo] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {

    if ( localStorage.getItem('storageDateIndex')) {
      const date = localStorage.getItem('storageDateIndex');
      checkDataAgeToCleanLocaleStorage (date);
     }
return () => {
  getInfo();
}

  }, []);


  const fetchData = async url => {

    try {

      const response = await fetch(url);

      if(!response.ok) {
        throw new Error();
      }

      const fetchedData = await response.json();

      setInfo(fetchedData);
      return fetchedData;

    } catch (err) {

      console.log(err.message);
    }
  }

  const checkDataAgeToCleanLocaleStorage = date => {
    const today = new Date(Date.now()).getDate();
    const dataDate = new Date(parseInt(date)).getDate()

    if (today - dataDate <= 2) {
      localStorage.clear()
      localStorage.setItem('storageDateIndex', Date.now());
    }

  }

  const getInfo = async () => {

    if (localStorage.getItem('infoIndex')) {

      const storage = JSON.parse(localStorage.getItem('infoIndex'));

      setInfo(storage);

    } else {

      const response = await fetchData('http://127.0.0.1:8000/api/blog_posts');

      localStorage.setItem('infoIndex', JSON.stringify(response));
      if ( !localStorage.getItem('storageDateIndex') ) {
        localStorage.setItem('storageDateIndex', Date.now());
      }
    }
  }

  // const getImagesNames = async () => {

  //   const imagesName = [];
  //   await info?.['hydra:member']?.map(({productImages}) => {
  //     const response = fetchData(`http://127.0.0.1:8000${productImages}`)
  //       imagesName.push(response);
  //   })

  //   console.log(imagesName);

  // }


  console.log(info)

  return (
    <Fragment>
      <Banner />
      <div>GalleryIndex</div>

      {
        info?.['hydra:member']?.map(({id, title })=> {
          return (
            <Fragment key={id}>

              <div>
                <p>{title}</p>
                <p>{}</p>

              </div>

            </Fragment>
            )
          })
      }

    </Fragment>

  )
}

export default Gallery
