import { useState } from "react";
import { searchCountry } from "./search.service";

export const SearchItem = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('');

  const handleOnChange = (event: any) => {
    setValue(event.target.value);
  }

  const handleOnBlur = async () => {
    setIsLoading(true);
    const result: any = await searchCountry(value);
    if (result) {
      setCountry(result.country);
    }
    setIsLoading(false);
  }

  return <li>
    <input
      value={value}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      disabled={isLoading}
    />
    {isLoading ? 'loading' : country}
  </li>;
}