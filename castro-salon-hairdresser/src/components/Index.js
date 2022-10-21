import React, {useState, useEffect} from 'react'
import Banner from './Banner';
import Brand from './Brand';
import { fetchData } from '../Api/FecthData';
import { checkDataAgeToCleanLocaleStorage } from '../cleanStorage/CleanStorage'
import { capitalizeFirstLetter } from '../util/capitalize';

const Index = () => {

  const urlMain = process.env.REACT_APP_URL_MAIN
  const urlTextIntro = `${urlMain}/api/text_intros`
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

      const fetchedData = await fetchData(urlTextIntro);

      setInfos(fetchedData);

      const tmpImageStorage = []

      fetchedData["hydra:member"].forEach(element => {

          const filesName = fetchData( urlMain+ element.image);

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

    <div className='content-container'>

      <Banner />

      {

    infos?.['hydra:member']?.map(({id, title, text} , index )=> {

         const styleByIndex = index % 2 === 0 ?  "m-4 d-flex flex-wrap justify-content-around" : "m-4 d-flex flex-wrap justify-content-around flex-row-reverse"

        const bubble = index % 2 === 0 ? <div className='bubble1'></div> : <div className='bubble2'></div>


        return (

            <div className="index-item" key={id} >


            <div className={styleByIndex}>

              {
                bubble
              }

              <div className="intro">
                <h2 className='pattaya text-black' style={{fontSize: "24px"}}>{capitalizeFirstLetter(title)}</h2>
                  <p className="">{text}</p>
              </div>



                <div className='text-center image-intro' >
                  <div>
                    {sortedImages[index] !== undefined && <img src={imagePath + sortedImages[index]?.name} alt={sortedImages[index]?.name} className="image-index m-2 rounded " />}
                  </div>
                </div>

        </div>

        </div>

           )
          })
      }

      <div className="index-item2">
         <Brand />
      </div>



    </div>
  )
}

export default Index
