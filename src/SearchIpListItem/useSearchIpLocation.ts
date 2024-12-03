import { useCallback, useState } from "react";
import { searchCountry } from "../search.service";

export const useSearchIpLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('');

  const searchIpLocation = useCallback(async (ip: string) => {
    setIsLoading(true);

    try {
      const result: any = await searchCountry(ip);
      if (result) {
        setCountry(result.country);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { country, isLoading, searchIpLocation };
};