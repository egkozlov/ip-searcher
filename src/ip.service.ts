const GEOLOCATION_API_KEY = process.env.REACT_APP_IP_GEOLOCATION_API_KEY;

type GeolocationAPIData = {
  country_flag: string;
  time_zone: {
    name: string;
  }
};

export const searchGeolocationData = async (ip: string): Promise<GeolocationAPIData> => {
  const searchParams = new URLSearchParams({
    apiKey: GEOLOCATION_API_KEY || '',
    ip,
    fields: ['country_flag', 'time_zone'].join(',')
  });

  return fetch(`https://api.ipgeolocation.io/ipgeo?${searchParams.toString()}`)
    .then(res => res.json());
};