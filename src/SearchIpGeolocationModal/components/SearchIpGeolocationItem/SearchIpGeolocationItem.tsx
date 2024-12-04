import { useState } from "react";
import { GeolocationData, useSearchIpGeolocationData } from "./hooks/useSearchIpGeolocationData";
import { validateIp } from "./utils/ip.validation.util";
import { Clock } from "../Clock";
import { TextInput, Spinner } from "../../../common";
import styles from './SearchIpGeolocationItem.module.css';

export const SearchIpGeolocationItem = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [geolocationData, setGeolocationData] = useState<GeolocationData | null>(null);
  const [previouslySearchedValue, setPreviouslySearchedValue] = useState<string | null>(null);
  const { isLoading, searchIpGeolocation } = useSearchIpGeolocationData();

  const handleOnChange = (event: any) => {
    setValue(event.target.value);
  }

  const handleOnBlur = async () => {
    if (previouslySearchedValue === value) {
      return;
    }

    setPreviouslySearchedValue(value);
    setError('');
    setGeolocationData(null);

    const validationResult = validateIp(value);
    if (!validationResult.isValid) {
      setError(validationResult.errorMessage || '');
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