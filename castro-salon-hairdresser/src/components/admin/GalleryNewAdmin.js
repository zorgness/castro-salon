import React, {Fragment, useState}  from 'react'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Butterfly from '../../images/butterfly.png'
import { fetchDataWithMethod } from '../../Api/FetchDataWithMethod'
import { uploadImageBlob, transformFileName } from '../../../src/S3/S3'
import Compressor from 'compressorjs';

const GalleryNewAdmin = () => {

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const urlMain = process.env.REACT_APP_URL_MAIN
  const urlBlogPosts = `${urlMain}/api/blog_posts`
  const urlProductImage = `${urlMain}/api/product_images`;


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

 const handleCompressedUpload = (e) => {
  setError('');
  setSuccess('');
  const images = e.target.files;

  for (let i = 0; i < images.length; i++) {

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

    if (selectedFiles.length < 3) {
      setError('not enough images')
      return
  }

    if(title !== '' && text !== '') {
      const options = {title: title, text: text};
      const fetchedData = await fetchDataWithMethod(urlBlogPosts, 'POST', options);

      for(let i = 0; i < selectedFiles.length; i++) {

        uploadImageBlob(selectedFiles[i]);
        fetchDataWithMethod(urlProductImage, 'POST', {post: fetchedData['@id'], name: transformFileName(selectedFiles[i])})
      };

      localStorage.clear();
      navigate('/admin_gallery_index');
    }
  }



  return (

     <div className='content-container index-item'>

        <div className='m-3'>
          <h1 className='pattaya text-center text-decoration-underline' style={{fontSize: '48px'}}>Gallery New</h1>
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
            <Form.Control type="file" multiple onChange={(e) => handleCompressedUpload(e)} />
          </Form.Group>

          <Form.Group className="text-center">
            <Button style={{backgroundColor: 'hotpink', border: '1px solid hotpink'}}  type="submit">
              Submit
            </Button>
          </Form.Group>

        </Form>
      </Container>

    </div>
  )
}

export default GalleryNewAdmin
