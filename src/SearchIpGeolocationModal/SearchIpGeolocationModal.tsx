import { useEffect, useState } from "react";
import styles from "./SearchIpGeolocationModal.module.css";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import { Modal, Button } from "../common";
import { SearchIpGeolocationItem } from "./components/SearchIpGeolocationItem";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SearchIpGeolocationModal = ({ isOpen, onClose }: Props) => {
  const [textboxesCount, setTextboxesCount] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setTextboxesCount(1);
    }
  }, [isOpen]);

  const handleAddNewRow = () => {
    setTextboxesCount(textboxesCount + 1);
  };

  const handleOnClose = () => {
    setTextboxesCount(0);
    onClose();
  }

  return <Modal
    isOpen={isOpen}
    onClose={handleOnClose}
    title='IP Lookup'>
    <div className={styles.content}>
      <p className={styles.description}>Enter one or more IP addresses and get their country</p>
      <Button onClick={handleAddNewRow}>
        <PlusIcon className={styles.plusIcon} /> Add
      </Button>
      <div className={styles.separator} />
      <ol className={styles.list}>
        {Array.from(Array(textboxesCount).keys())
          .map((value) => <SearchIpGeolocationItem key={value} />)
        }
      </ol>
    </div>
  </Modal>
};