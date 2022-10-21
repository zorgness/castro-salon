import React, {useState, Fragment} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import MyVerticallyCenteredModal from './Modal';

const Login = () => {


  const urlMain = process.env.REACT_APP_URL_MAIN
  const userUrl = `${urlMain}/api/login`

  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [modalShow, setModalShow] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(userUrl, {email: email, password: password });
  };

  const handleEmail = (event) => {
    setError('');
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setError('');
    setPassword(event.target.value);
  };

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

      console.log(fetchedData);
      setUser({email: options.email});
      // localStorage.setItem('user', fetchedData);
      setModalShow(true);
      setPassword('');
      setEmail('');

    } catch (err) {

      setError(err.message);
      console.log(error);
    }
  }



  return (

    <Fragment>

      <MyVerticallyCenteredModal
              show={modalShow}
              user={user}
              onHide={() => setModalShow(false)}
            />

    <Container>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleEmail}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" autoComplete='false' onChange={handlePassword} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button style={{backgroundColor: 'hotpink', border: '1px solid hotpink'}} type="submit">
          Submit
        </Button>
      </Form>
    </Container>

    </Fragment>
  )
}

export default Login
