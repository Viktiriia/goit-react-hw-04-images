import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({handleClose, children}) {

  useEffect(() => {
    
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        handleClose();
      }
      
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
    window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]
  )
  
  // клік за межами модалки
   const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      handleClose(); 
    }
  };
    return createPortal(
      <ModalOverlay onClick={handleBackdropClick}>
        <ModalContent>{children}</ModalContent>
      </ModalOverlay>,
      modalRoot
    );
}

