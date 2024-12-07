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

type GeolocationAPIError = {
  message: string;
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
      if (!response.ok) {
        const error: GeolocationAPIError = await response.json();
        throw new Error(error.message);
      }

      const result: GeolocationAPIResponse = await response.json();

      return {
        countryFlag: result.country_flag,
        timeZone: result.time_zone.name,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, searchIpGeolocation };
};