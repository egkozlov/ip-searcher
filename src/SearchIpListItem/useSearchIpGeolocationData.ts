import { useCallback, useState } from "react";
import { searchGeolocationData } from "../ip.service";

type GeolocationData = {
  countryFlag: string;
  timeZone: string;
};

export const useSearchIpGeolocationData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [geolocationData, setGeolocationData] = useState<GeolocationData | null>(null);

  const searchIpGeolocation = useCallback(async (ip: string) => {
    setIsLoading(true);

    try {
      const result = await searchGeolocationData(ip);
      setGeolocationData({
        countryFlag: result.country_flag,
        timeZone: result.time_zone.name,
      });
    } catch (err) {
      setGeolocationData(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { geolocationData, isLoading, searchIpGeolocation };
};