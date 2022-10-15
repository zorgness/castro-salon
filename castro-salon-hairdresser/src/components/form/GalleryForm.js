import React, {Fragment, useState}  from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Butterfly from '../../images/butterfly.png'


const GalleryForm = () => {

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const urlBlogPosts = 'http://127.0.0.1:8000/api/blog_posts';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title !== '' && text !== '') {
      const options = {title: title, text: text};
      fetchData(urlBlogPosts, options);
      uploadImage()
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

      console.log('response: ',fetchedData);
      setSuccess('Successfully send');

    } catch (err) {
      setError(err.message);
    }
  };

  const uploadImage = async () => {
    // const urlBucket = generateUploadUrl()

    // console.log(urlBucket);

    // try {
    //   const response = await fetch(urlBucket);

    //   if(!response.ok) {
    //     throw new Error('Could not fetch data from aws');
    //   }

    //   const fetchedData = await response.json();

    //   console.log('response: ',fetchedData);


    // } catch (err) {
    //   setError(err.message);
    // }
  };

  return (

     <Fragment>

        <div className='m-3'>
          <h1>Galleries Edition</h1>
        </div>

        <div className='text-danger text-right'>
          <p>{ error }</p>
        </div>

       { success && <div className='text-success text-right'>
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
            <Form.Control type="file" multiple />
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
