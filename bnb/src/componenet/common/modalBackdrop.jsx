import { useSearch } from "../../context/searchContext";

// 모달창이 열렸을 시 뒤에 투명 배경 추가
// 투명 배경 클릭 시 모달 닫기
function ModalBackdrop() {
    const { isOpen, closeModal } = useSearch();

    return (
        isOpen && (<div className='modal-backdrop' onClick={closeModal}></div>) 
    );
};

export default ModalBackdrop;