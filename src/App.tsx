import { useState } from "react";
import styles from "./App.module.css";
import { SearchIpGeolocationModal } from "./SearchIpGeolocationModal";
import { Button } from "./common";

export const App = () => {
  const [isIpGeolocationModalOpened, setIsIpGeolocationModalOpened] = useState(false);

  const handleOpenModal = () => {
    setIsIpGeolocationModalOpened(true);
  }

  const handleOnCloseModal = () => {
    setIsIpGeolocationModalOpened(false);
  }

  return <div className={styles.mainContainer}>
    <h1 className={styles.title}>IP addresses geolocation finder</h1>
    <p className={styles.description}>Quickly find the geographical location of one or multiple IP addresses, supporting both IPv4 and IPv6 formats. Click the 'Start search' button to begin entering IPs and discover their respective locations with ease.</p>
    <Button onClick={handleOpenModal}>Start search</Button>
    <SearchIpGeolocationModal
      isOpen={isIpGeolocationModalOpened}
      onClose={handleOnCloseModal}
    />
  </div>;
};
