import React, {Fragment, useState}  from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Butterfly from '../../images/butterfly.png'
import { fetchDataWithMethod } from '../../Api/FetchDataWithMethod'
import { s3, bucketName, uid} from '../../../src/S3/S3'

const GalleryNewAdmin = () => {

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const urlBlogPosts = 'http://127.0.0.1:8000/api/blog_posts';
  const urlProductImage = 'http://127.0.0.1:8000/api/product_images';


  const handleTitle = (e) => {
    setTitle(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleText = (e) => {
    setText(e.target.value);
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

    if(title !== '' && text !== '') {
      const options = {title: title, text: text};
      const fetchedData = await fetchDataWithMethod(urlBlogPosts, 'POST', options);

      for(let i = 0; i < selectedFiles.length; i++) {

        uploadImage(selectedFiles[i]);
        fetchDataWithMethod(urlProductImage, 'POST', {post: fetchedData['@id'], name: uid + selectedFiles[i].name})
      };
      setSuccess('Successfully uploaded ')
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

        <div className='m-3'>
          <h1>Galleries Edition</h1>
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
            <Form.Control type="text" placeholder="titre" id="" onChange={handleTitle} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={handleText} />
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
  )
}

export default GalleryNewAdmin
