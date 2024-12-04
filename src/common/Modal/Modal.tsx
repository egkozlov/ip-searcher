import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import styles from "./Modal.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}: Props) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  const handleOnClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === modalRef.current) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      onClick={handleOnClick}
      className={styles.modal}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>{title}</h3>
        <button className={styles.modalCloseBtn} onClick={handleCloseModal}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </dialog>
  );
};