import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MyVerticallyCenteredModal = props =>  {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome Back
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centre de commande</h4>
        <p>
          Désormais tu peux accéder à de nouveaux menus pour ajouter, modifier ou supprimer les textes et les photos
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} style={{backgroundColor: ' #670BFF', border: '1px solid  #670BFF'}}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
