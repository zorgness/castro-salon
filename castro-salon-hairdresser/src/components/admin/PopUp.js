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
              <Modal.Body>Are you sure that you want to delete Post {idBlogPost}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} >
                  Close
                </Button>
                <Button variant="primary" onClick={() => handleDelete(idBlogPost)}>
                  Delete
                </Button>
              </Modal.Footer>
          </Modal>
          </div>

  );
}

export default Popup;
