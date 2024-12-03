import { useCallback, useState } from "react";
import { searchCountry } from "../search.service";

export const useSearchIpLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [locationCurrentTime, setLocationCurrentTime] = useState<Date | null>(null);

  const searchIpLocation = useCallback(async (ip: string) => {
    setIsLoading(true);

    try {
      const result: any = await searchCountry(ip);
      if (result) {
        setCountry(result.country);
        setLocationCurrentTime(new Date());
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { country, isLoading, locationCurrentTime, searchIpLocation };
};