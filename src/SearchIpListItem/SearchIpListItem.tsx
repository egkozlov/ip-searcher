import { useState } from "react";
import { GeolocationData, useSearchIpGeolocationData } from "./useSearchIpGeolocationData";
import { isIpValid } from "./ip.validation.util";
import { Clock } from "./components/Clock";
import { TextInput } from "../TextInput/TextInput";
import styles from './SearchIpListItem.module.css';
import { Spinner } from "../Spinner/Spinner";

export const SearchIpListItem = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [geolocationData, setGeolocationData] = useState<GeolocationData | null>(null);
  const { isLoading, searchIpGeolocation } = useSearchIpGeolocationData();

  const handleOnChange = (event: any) => {
    setValue(event.target.value);
  }

  const handleOnBlur = async () => {
    setError('');
    setGeolocationData(null);

    if (!value) {
      setError('Value is required');
      return;
    }

    if (!isIpValid(value)) {
      setError('Ip is invalid');
      return;
    }

    try {
      const result = await searchIpGeolocation(value);
      setGeolocationData(result);
    } catch (err) {
      setError('Sorry, something went wrong. Try again later');
    }
  }

  return <li className={styles.listItem}>
    <div className={styles.container}>
      <TextInput
        value={value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        disabled={isLoading}
        errorMessage={error}
      />
      <div className={styles.statusContainer}>
        {isLoading ? <Spinner /> : <div className={styles.geolocationDataContainer}>{geolocationData ? <>
          <img className={styles.flag} src={geolocationData.countryFlag} alt="counry flag" />
          <Clock timeZone={geolocationData.timeZone} />
        </> : null}</div>}
      </div>
    </div>
  </li>;
}