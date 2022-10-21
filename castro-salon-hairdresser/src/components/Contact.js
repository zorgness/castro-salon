import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


const Contact = () => {
  return (
    <div >

    <h1 className='pattaya text-center m-3' style={{fontSize: "48px", textDecoration: " black  underline"}}>Contactez-moi</h1>

    <Container className='mb-5'>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Object</Form.Label>
        <Form.Control type="email" placeholder="object" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Texte</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className='text-center'>
        <Button style={{backgroundColor: 'hotpink', border: '1px solid hotpink'}} className="my-5" type="submit">
              Envoyer
        </Button>
      </Form.Group>
    </Form>
    </Container>

    </div>
  )
}

export default Contact
