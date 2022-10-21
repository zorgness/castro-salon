import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../Api/FecthData';
import { checkDataAgeToCleanLocaleStorage } from '../cleanStorage/CleanStorage'
import { capitalizeFirstLetter } from '../util/capitalize'

const GalleryShow = () => {

  const params = useParams()

  const urlMain = process.env.REACT_APP_URL_MAIN
  const imagePath = process.env.REACT_APP_AWS_S3_URL;
  const urlBlogPosts = `${urlMain }/api/blog_posts/${params.id ?? ''}`;

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

          const filesName = fetchData(urlMain + element);

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

  }, [infos, load, params.id, urlBlogPosts, urlMain]);;



  const {title, text} = infos;

  console.log(nameImages.length)

  return (
    <div className='content-container index-item'>

      <div className="bubble3" style={{backgroundColor: 'lavender'}}></div>

      <h1 className="pattaya text-center m-5 text-decoration-underline" style={{fontSize: '48px', position: 'relative'}}>
        {capitalizeFirstLetter(title ?? '')}
      </h1>



      <div className='item-show-container' >

          {
            nameImages?.map(({id, name}, index) => {
              return (

                <div className={`item-show-item${index + 1} show-item`} key={id}><img src={imagePath + name} alt={name} width={240} height={'auto'} className="rounded "   /></div>
              )
            })
          }
          <div className='item-show-container'>

            <div className="bubble2"></div>

            <div className="show-item"><p style={{minWidth: '240px'}}>{text}</p></div>

            <div className="show-item"><img src={imagePath + nameImages?.[nameImages.length - 1]?.name} alt={""} width={240} height={'auto'} className="rounded"  /></div>

          </div>



      </div>





    </div>
  )
}

export default GalleryShow
