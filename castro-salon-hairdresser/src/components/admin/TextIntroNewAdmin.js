import React, {Fragment, useState}  from 'react'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Butterfly from '../../images/butterfly.png'
import { fetchDataWithMethod } from '../../Api/FetchDataWithMethod'
import { uploadImageBlob, transformFileName} from '../../../src/S3/S3'
import Compressor from 'compressorjs';

const TextIntroNewAdmin = () => {

  const urlMain = process.env.REACT_APP_URL_MAIN

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const urlTextIntros = `${urlMain}api/text_intros`;
  const urlCoverImage = `${urlMain}/api/cover_images`;


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
  const image = e.target.files[0];



    const quality = image.size > 9000 ? 0.1 : 0.8;

    new Compressor(image, {
      quality: quality, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        setSelectedFiles(compressedResult)
      },
    });

}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length > 1) {
        setError('1 image maximum')
        return
    }

    if(title !== '' && text !== '') {
      uploadImageBlob(selectedFiles);
      const fetchedData = await fetchDataWithMethod(urlCoverImage, 'POST', { name: transformFileName(selectedFiles)})

      const options = {title: title, text: text, image: fetchedData['@id']};
      const postTextIntro = await fetchDataWithMethod(urlTextIntros, 'POST', options);

      console.log(postTextIntro)

      localStorage.clear();
      navigate('/');
    }
  }


  return (

     <Fragment>

        <div className='m-3'>
          <h1>Text Intro New</h1>
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
            <Form.Label>Texte</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={handleText} />
          </Form.Group>

          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={(e) => handleCompressedUpload(e)} />
        </Form.Group>``

          <Button style={{backgroundColor: 'hotpink', border: '1px solid hotpink'}} type="submit">
            Submit
          </Button>

        </Form>
      </Container>

    </Fragment>
  )
}

export default TextIntroNewAdmin
