import React, {useState, useEffect, Fragment} from 'react'
import Banner from './Banner';
import { fetchData } from '../Api/FecthData';
import { checkDataAgeToCleanLocaleStorage } from '../cleanStorage/CleanStorage'

const Index = () => {

  const imagePath = process.env.REACT_APP_AWS_S3_URL;

  const [infos ,setInfos] = useState([]);
  const [nameImages, setNameImages] = useState([]);

  useEffect(() => {

    if (localStorage.getItem('storageDateHome')) {
      const date = localStorage.getItem('storageDateHome');
      checkDataAgeToCleanLocaleStorage(date);
     }

    return () => {
      getInfo();
    }

  }, []);



  const getInfo = async () => {

    console.log('storage index')
    if (localStorage.getItem('info')) {

      const infosStorage = JSON.parse(localStorage.getItem('info'));
      const imagesStorage = JSON.parse(localStorage.getItem('imageStorageIndex'));

      setInfos(infosStorage);
      setNameImages(imagesStorage)

    } else {

      const fetchedData = await fetchData('http://127.0.0.1:8000/api/text_intros');

      setInfos(fetchedData);

      const tmpImageStorage = []

      fetchedData["hydra:member"].forEach(element => {

          const filesName = fetchData('http://localhost:8000' + element.image);

          filesName.then(data => {

            tmpImageStorage.push(data)

            setNameImages([...tmpImageStorage])
            localStorage.setItem('imageStorageIndex', JSON.stringify(tmpImageStorage))
          })

        })


      localStorage.setItem('info', JSON.stringify(fetchedData));
      if ( !localStorage.getItem('storageDateHome') ) {
        localStorage.setItem('storageDateHome', Date.now());
      }
    }
  }


  // to sort images by id
  const sortedImages = nameImages?.sort((a,b)=> a?.id - b?.id);


  return (

    <div>
      <Banner />

      {

    infos?.['hydra:member']?.map(({id, title, text} , index )=> {

        return (

        <Fragment key={id}>

            <div className='m-5'>
              <h2 className='pattaya text-black' style={{fontSize: "24px"}}>{title}</h2>
              <p>{text}</p>
              {sortedImages[index] !== undefined && <img src={imagePath + sortedImages[index]?.name} alt={sortedImages[index]?.name} className="avatar-super-large" />}
            </div>


            {/* {sortedImages[index] !== undefined &&     <div className="card-category" style={{ backgroundImage: `url(${imagePath + sortedImages[index]?.name})` }}>
                <h3>{title}</h3>
            </div>} */}

        </Fragment>
          )
        })
      }


    </div>
  )
}

export default Index
