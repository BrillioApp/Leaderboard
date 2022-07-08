import Modal from 'react-bootstrap/Modal';
import { EventActions } from 'components/eventActions/EventActions';

export const Popup = ({ showModal, toggleShowModal, tab, action, data, updateTab }) => {
  const handleClose = () => toggleShowModal();
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        {
          tab === "leaderboard"
            ? null
            : tab === "event"
              ? <EventActions action={action} data={data} toggleShowModal={toggleShowModal} updateTab={updateTab}/>
              : null
        }
      </Modal>
    </>
  );
}