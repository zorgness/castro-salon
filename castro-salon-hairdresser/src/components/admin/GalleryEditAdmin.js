import React, {useState, useEffect, Fragment} from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../../Api/FecthData';
import { checkDataAgeToCleanLocaleStorage } from '../../cleanStorage/CleanStorage'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Butterfly from '../../images/butterfly.png'
import { fetchDataWithMethod } from '../../Api/FetchDataWithMethod'
import { s3, bucketName, uid} from '../../../src/S3/S3'

const GalleryEditAdmin = () => {
  const params = useParams()

  const imagePath = process.env.REACT_APP_AWS_S3_URL;

  const [infos ,setInfos] = useState([]);
  const [nameImages, setNameImages] = useState([]);
  const [titleEdit, setTitleEdit] = useState('');
  const [textEdit, setTextEdit] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const urlBlogPosts = `http://127.0.0.1:8000/api/blog_posts/${params.id}`;
  const urlProductImage = 'http://127.0.0.1:8000/api/product_images/';


  useEffect(() => {

    if (localStorage.getItem('storageDateIndex')) {
      const date = localStorage.getItem('storageDateIndex');
      checkDataAgeToCleanLocaleStorage (date);
     }

    return () => {
      getInfos();
    }

  }, []);

  const {title, text} = infos;
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

  const handleFileInput = (e) => {
    setSelectedFiles(e.target.files);
    setError('');
    setSuccess('');
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (selectedFiles.length > 5) {
      setError('5 images maximum')
      return
  }

  if(titleEdit !== '' && textEdit !== '') {
    const options = {title: titleEdit, text: textEdit};
    const fetchedData = await fetchDataWithMethod(urlBlogPosts, 'PUT', options);
    console.log(fetchedData)

    for(let i = 0; i < selectedFiles.length; i++) {

      console.log(infos.productImages[i]);

      // uploadImage(selectedFiles[i]);
      // fetchDataWithMethod(urlProductImage + infos.productImages[i], 'PUT', {post: infos['@id'], name: uid + selectedFiles[i].name})
    };
    // setSuccess('Successfully uploaded ')
    localStorage.clear()
  }
}

 const uploadImage = async (file) => {

  try {
    const params = ({
      Body: file,
      Bucket: bucketName,
      Key: uid + file.name,
      Expires: 60
    })

    return await s3.upload(params).promise()

  } catch (e) {

    setError(e.message);
  }
};

  return (
    <Fragment>
      <div>Gallery Edit</div>

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


        <br/>

        <Fragment>

          <div className='m-3'>
            <h1>Gallery Edit</h1>
          </div>

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
              <Form.Control type="file" multiple onChange={handleFileInput} />
            </Form.Group>``

            <Button style={{backgroundColor: 'hotpink', border: '1px solid hotpink'}} type="submit">
              Submit
            </Button>

          </Form>
          </Container>

          </Fragment>



    </Fragment>
  )
}

export default GalleryEditAdmin
