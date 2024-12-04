import { useCallback, useState } from "react";

export type GeolocationData = {
  countryFlag: string;
  timeZone: string;
};

type GeolocationAPIResponse = {
  country_flag: string;
  time_zone: {
    name: string;
  }
};

const GEOLOCATION_API_KEY = process.env.REACT_APP_IP_GEOLOCATION_API_KEY;

export const useSearchIpGeolocationData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const searchIpGeolocation = useCallback(async (ip: string): Promise<GeolocationData> => {
    setIsLoading(true);

    try {
      const searchParams = new URLSearchParams({
        apiKey: GEOLOCATION_API_KEY || '',
        ip,
        fields: ['country_flag', 'time_zone'].join(',')
      });
      const response = await fetch(`https://api.ipgeolocation.io/ipgeo?${searchParams.toString()}`);
      const result: GeolocationAPIResponse = await response.json();

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