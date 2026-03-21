import Modal from "../BaseModel/baseModal";
import "./CvModel.css"

function CvModal({ open, onClose, originRect }) {
  return (
    <Modal open={open} onClose={onClose} originRect={originRect}>
      <div className="cv-modal__container">
        <img src="/CV.png" alt="CV" className="cv-modal__image" />

        <div className="cv-modal__actions">
          <a href="/CV.png" download className="modal__link modal__link--live">
            Download PDF
          </a>
        </div>
      </div>
    </Modal>
  );
}

export default CvModal;
