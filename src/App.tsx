import { useState } from "react";
import styles from "./App.module.css";
import { SearchIpGeolocationModal } from "./SearchIpGeolocationModal";
import { Button } from "./Button/Button";

export const App = () => {
  const [isIpGeolocationModalOpened, setIsIpGeolocationModalOpened] = useState(false);

  const handleOpenModal = () => {
    setIsIpGeolocationModalOpened(true);
  }

  const handleOnCloseModal = () => {
    setIsIpGeolocationModalOpened(false);
  }

  return <div className={styles.mainContainer}>
    <Button onClick={handleOpenModal}>Open modal</Button>
    <SearchIpGeolocationModal
      isOpen={isIpGeolocationModalOpened}
      onClose={handleOnCloseModal}
    />
  </div>;
};
