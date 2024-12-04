import { useCallback, useState } from "react";
import { searchGeolocationData } from "../../../../ip.service";

export type GeolocationData = {
  countryFlag: string;
  timeZone: string;
};

export const useSearchIpGeolocationData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const searchIpGeolocation = useCallback(async (ip: string): Promise<GeolocationData> => {
    setIsLoading(true);

    try {
      const result = await searchGeolocationData(ip);
      return {
        countryFlag: result.country_flag,
        timeZone: result.time_zone.name,
      };
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, searchIpGeolocation };
};