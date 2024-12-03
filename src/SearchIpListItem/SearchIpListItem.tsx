import { useState } from "react";
import { useSearchIpLocation } from "./useSearchIpLocation";
import { isIpValid } from "./ip.validation.util";

export const SearchIpListItem = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const { isLoading, country, searchIpLocation } = useSearchIpLocation();

  const handleOnChange = (event: any) => {
    setValue(event.target.value);
  }

  const handleOnBlur = async () => {
    setError('');

    if (!value) {
      setError('Value is required');
      return;
    }

    if (!isIpValid(value)) {
      setError('Ip is invalid');
      return;
    }

    try {
      await searchIpLocation(value);
    } catch (err) {
      setError('Sorry, something went wrong. Try again later');
    }
  }

  return <li>
    <div>
      <input
        value={value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        disabled={isLoading}
      />
      {isLoading ? 'loading' : country}
    </div>
    {error ? <span style={{ color: 'red' }}>{error}</span> : null}
  </li>;
}