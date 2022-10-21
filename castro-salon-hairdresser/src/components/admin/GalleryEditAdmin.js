import React, {useState, useEffect, Fragment} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchData } from '../../Api/FecthData';
import { checkDataAgeToCleanLocaleStorage } from '../../cleanStorage/CleanStorage'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Butterfly from '../../images/butterfly.png'
import { fetchDataWithMethod } from '../../Api/FetchDataWithMethod'
import { uploadImageFile, deleteImageFromS3, transformFileName  } from '../../../src/S3/S3'
import Compressor from 'compressorjs';
import {capitalizeFirstLetter} from '../../util/capitalize'

const GalleryEditAdmin = () => {
  const params = useParams()
  const navigate = useNavigate()

  const imagePath = process.env.REACT_APP_AWS_S3_URL;

  const [infos ,setInfos] = useState([]);
  const [nameImages, setNameImages] = useState([]);
  const [titleEdit, setTitleEdit] = useState('');
  const [textEdit, setTextEdit] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [success, setSuccess] = useState('');
  const [load, setLoad] = useState(true);
  const [error, setError] = useState('');

  const urlMain = process.env.REACT_APP_URL_MAIN;
  const urlBlogPosts = `${urlMain}/api/blog_posts/${params.id}`;

  useEffect(() => {

    if (localStorage.getItem('storageDateIndex')) {
      const date = localStorage.getItem('storageDateIndex');
      checkDataAgeToCleanLocaleStorage (date);
     }

     const isInLocaleStorage = localStorage.hasOwnProperty(`infoStorageGalleryAdmin${params.id}`)
     const getInfos = async () => {

       if (isInLocaleStorage) {

         console.log(`storage gallery admin ${params.id}`)

         const infoStorage = JSON.parse(localStorage.getItem(`infoStorageGalleryAdmin${params.id}`));
         const imageStorage = JSON.parse(localStorage.getItem(`imageStorageGalleryAdmin${params.id}`));

         setInfos(infoStorage);
         setNameImages(imageStorage);

       } else {

         const fetchedData = await fetchData(urlBlogPosts);
         setInfos(fetchedData);

         const tmpImageStorage = [];

         fetchedData?.productImages?.forEach(element => {

             const filesName = fetchData( urlMain + element);

             filesName.then(data => {
                tmpImageStorage.push(data);
                setNameImages([...tmpImageStorage])

               localStorage.setItem(`imageStorageGalleryAdmin${params.id}`, JSON.stringify(tmpImageStorage))
             })
           })

         localStorage.setItem(`infoStorageGalleryAdmin${params.id}`, JSON.stringify(fetchedData));

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


  }, [load, infos, params.id, urlBlogPosts, urlMain ]);

  const {title, text} = infos;

  const handleTitle = (e) => {
    setTitleEdit(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleText = (e) => {
    setTextEdit(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleCompressedUpload = (e) => {
    setError('');
    setSuccess('');
    const images = e.target.files;

    for (let i=0; i<images.length; i++) {

      const quality = images[i].size > 9000 ? 0.1 : 0.8;

      new Compressor(images[i], {
        quality: quality, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          setSelectedFiles(prevState => [...prevState, compressedResult])
        },
      });
    }
  }

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (selectedFiles.length > 3) {
      setError('5 images maximum')
      return
  }

  if(titleEdit !== '' && textEdit !== '') {


    if (selectedFiles.length < infos.productImages.length) {
      setError('not enough images')
    }

    if (selectedFiles.length > infos.productImages.length) {
      setError('too many images')
    }


      const options = {title: titleEdit, text: textEdit};
      await fetchDataWithMethod(urlBlogPosts, 'PUT', options);

      for(let i = 0; i < nameImages.length; i++) {
        deleteImageFromS3(nameImages[i].name)
      }

      for(let i = 0; i < infos.productImages.length; i++) {
        const options = {post: infos['@id'], name:  transformFileName(selectedFiles[i])};
        uploadImageFile(selectedFiles[i]);
        await fetchDataWithMethod( urlMain + infos.productImages[i], 'PUT', options )
      }


    // if same number of images to upload


    // if more images to upload else if less images to upload
    // if (selectedFiles.length > infos.productImages.length) {

    //   for(let j = infos.productImages.length; j < (selectedFiles.length - infos.productImages.length); j++) {
    //     const options = {post: infos['@id'], name: uid + selectedFiles[j].name}
    //     uploadImage(selectedFiles[j]);
    //     const fetchedData = await fetchDataWithMethod(urlProductImage, 'POST', options )
    //     console.log(fetchedData)
    //   }
    // }


    localStorage.clear();
    navigate('/admin_gallery_index');
  }
}


  return (

    <div className='index-item'>


      <h1 className='pattaya text-center text-decoration-underline m-3' style={{fontSize: '48px'}}>Gallery Edition</h1>
      <div className='text-center'>
          {
            nameImages.map(({id, name}) => {
              return (

                <img key={id} src={imagePath + name} alt={name} className="avatar-large m-2"  />
              )
            })
          }
      </div>

        <div className='m-3'>
          <h2 className='pattaya text-center text-secondary'>{capitalizeFirstLetter(title ?? '')}</h2>

          <div className="d-flex justify-content-center mt-4">
              <p style={{maxWidth: "440px"}} className="text-start">{text}</p>
          </div>
        </div>


        <br/>

        <Fragment>

          <div className='text-danger text-right'>
            <p>{ error }</p>
          </div>

          { success   && <div className='text-success text-right'>
            <p>{ success }<img src={Butterfly} alt="butterfly" className="avatar-small"/></p>
          </div>
          }
          <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titre</Form.Label>
              <Form.Control type="text" placeholder="titre" id="" value={titleEdit} onChange={handleTitle} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={textEdit} onChange={handleText} />
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Multiple images</Form.Label>
              <Form.Control type="file" multiple onChange={(e) => handleCompressedUpload(e)} />
            </Form.Group>

            <Form.Group className='text-center'>
            <Button style={{backgroundColor: 'hotpink', border: '1px solid hotpink'}} type="submit">
              Submit
            </Button>
            </Form.Group>

          </Form>
          </Container>

          </Fragment>



    </div>
  )
}

export default GalleryEditAdmin
