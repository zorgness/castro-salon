import React, {Fragment, useState}  from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Butterfly from '../../images/butterfly.png'
import aws from 'aws-sdk';

const GalleryForm = () => {

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const region = process.env.REACT_APP_AWS_S3_REGION;
  const bucketName = process.env.REACT_APP_AWS_S3_BUCKET_NAME;
  const accessKeyId= process.env.REACT_APP_AWS_S3_PUBLIC_KEY;
  const secretAccessKey= process.env.REACT_APP_AWS_S3_PRIVATE_KEY;

  const s3 = new aws.S3({
    bucketName, region, accessKeyId, secretAccessKey, signatureVersion: 'v4'
  });

  const urlBlogPosts = 'http://127.0.0.1:8000/api/blog_posts';
  const urlProductImage = 'http://127.0.0.1:8000/api/product_images';

  const uid =  Date.now().toString(36) + Math.random().toString(36).substr(2);


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
      const fetchedData = await fetchData(urlBlogPosts, options);

      for(let i = 0; i < selectedFiles.length; i++) {

        uploadImage(selectedFiles[i]);
        fetchData(urlProductImage, {post: fetchedData['@id'], name: uid + selectedFiles[i].name})
      };
      setSuccess('Successfully uploaded ')
    }
  }


  const fetchData = async (url, options) => {
    try {

      const response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
      });

      if(!response.ok) {
        throw new Error('Could not fetch data from ' + url);
      }

      const fetchedData = await response.json();

      return fetchedData

    } catch (err) {
      setError(err.message);
    }
  };


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
            <Form.Control type="text" placeholder="titre" onChange={handleTitle} />
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

export default GalleryForm
