// Convention: The file name should follow 'somethingServices
import type { AxiosResponse } from 'axios';
import axios from 'axios';
// OR import axios from '@libs/axios';

type WeatherData = {
    coord: {
      lon: number;
      lat: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level?: number;  // Optional since some APIs may not return it
      grnd_level?: number; // Optional for the same reason
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
      gust?: number; // Optional as gust might not always be present
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }

export async function getOpenWeatherData(/*lat: number, lon: number, appid: string*/): Promise<AxiosResponse<WeatherData>> {
    const servicePath = 'https://api.openweathermap.org/data/2.5/weather';

    //! This key is only for free plan if upgrade need assign new key through env
    const apiKey = '46f2a250d973903d403c8f49d22eb40f';

    return axios({
      method: 'GET',
      url: servicePath,
      params: {
        lat: 44.34,  // dynamic latitude
        lon: 10.99,  // dynamic longitude
        appid: apiKey, // dynamic API key
      },
    });
  }