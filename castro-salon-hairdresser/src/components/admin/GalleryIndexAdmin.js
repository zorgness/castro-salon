import React, {useState, useEffect, Fragment} from 'react'
import { Link } from "react-router-dom";
import { checkDataAgeToCleanLocaleStorage } from '../../cleanStorage/CleanStorage';
import { fetchData } from '../../Api/FecthData';
import Button from 'react-bootstrap/Button';
import Popup from './PopUp';
import { galleryDestroy } from './galleryDestroy';

const GalleryIndexAdmin = () => {

  const imagePath = process.env.REACT_APP_AWS_S3_URL;
  const [infos ,setInfos] = useState([]);
  const [nameImages, setNameImages] = useState([]);
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(true);
  const [idBlogPost, setIdBlogPost] = useState(null);



    useEffect(() => {

    if (localStorage.getItem('storageDateIndex')) {
      const date = localStorage.getItem('storageDateIndex');
      checkDataAgeToCleanLocaleStorage (date);
     }

  const getInfos = async () => {

    const isInLocaleStorage = localStorage.hasOwnProperty('infoStorageGallery')

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
      getInfos()
      setLoad(false)
    }
  }
  }, [load, infos]);

  // to sort images by post id
  const sortedImages = nameImages?.sort((a,b)=> parseInt(a?.post.replace(/[^0-9]/g, "")) - parseInt(b?.post.replace(/[^0-9]/g, "")));

  const handleClose = () => setShow(false);

  const handleShow = (id) =>{
    setShow(true);
    setIdBlogPost(id)
  }

  const handleDelete = (id) => {
    galleryDestroy(id);
    handleClose();
    setInfos(Object.entries(infos).filter(member => member.id !== id))
    localStorage.clear()
  }




  return (
    <Fragment>

        <div>GalleryIndex</div>


         {
           show &&
             <Popup
              show={show}
              idBlogPost={idBlogPost}
              handleClose={handleClose}
              handleDelete={handleDelete}
              setShow={setShow}
             />
        }


        {


        infos?.['hydra:member']?.map(({id, title} , index )=> {

           return (

              <Fragment key={id} >


                <div className='m-3'>
                  <h2 className='border border-success rounded w-25'>{title}</h2>
                  {sortedImages[index] !== undefined && <img src={imagePath + sortedImages[index]?.name} alt={sortedImages[index]?.name} className="avatar-large" />}
                </div>

                <div className="d-flex justify-content-around">
                  <Link to={`/admin_gallery_edit/${id}`} key={id}><Button variant="info">Modifier</Button></Link>
                  <Button variant="danger" onClick={() => handleShow(id)}>Supprimer</Button>
                </div>


              </Fragment>

            )
          })
        }



    </Fragment>

  )
}

export default GalleryIndexAdmin
