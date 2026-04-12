import { useSearch } from "../../context/searchContext";

function ModalBackdrop() {
    const { isOpen, closeModal } = useSearch();

    return (
        isOpen && (<div className='modal-backdrop' onClick={closeModal}></div>) 
    );
};

export default ModalBackdrop;