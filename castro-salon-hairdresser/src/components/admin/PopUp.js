import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Popup = ({show, idBlogPost, handleClose, handleDelete}) => {
  return (

          <div>

          <Modal show={show} onHide={handleClose}
           size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation requested</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure that you want to <span className='text-danger'>DELETE</span></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} >
                  Close
                </Button>
                <Button variant="danger" onClick={() => handleDelete(idBlogPost)}>
                  Delete
                </Button>
              </Modal.Footer>
          </Modal>
          </div>

  );
}

export default Popup;
