import axios from "axios";
import { Show } from "./models/Show";

const BASE_URL = "https://api.tvmaze.com";

export const searchShows2 = async (keyword: string) => {
  const respose = await axios.get<{ show: Show }[]>(
    BASE_URL + "/search/shows?q=" + keyword
  );
  return respose.data.map((item) => item.show);
};

export const searchShows = (keyword: string) => {
  return axios
    .get<{ show: Show }[]>(BASE_URL + "/search/shows?q=" + keyword)
    .then((response) => {
      const shows = response.data.map((item) => item.show);
      const castPromises = [];
      for (let i = 0; i < shows.length; i++) {
        const castAndShowPromise = axios
          .get(BASE_URL + "/shows/" + shows[i].id + "/cast")
          .then((response) => {
            const cast = response.data.map((item: any) => item.person);

            return { show: shows[i], cast };
          });
        castPromises.push(castAndShowPromise);
      }
      console.log("inside search shows loop complete");
      return Promise.all(castPromises);
    });
};

export const searchShows3 = async (keyword: string) => {
  const response = await axios.get<{ show: Show }[]>(
    BASE_URL + "/search/shows?q=" + keyword
  );
  const shows = response.data.map((item) => item.show);
  const castPromises = [];
  for (let i = 0; i < shows.length; i++) {
    const newData = await getCasts(shows[i].id);
    const newArr = newData.data.map((item: any) => item.person);
    castPromises.push(newArr);
  }
  return Promise.all(castPromises);
};

export const showDetails = async (id: number) => {
  const response = await axios.get(BASE_URL + "/shows/" + id);
  return response.data;
};

export const getCasts = async (id: number) => {
  const response = axios.get(BASE_URL + "/shows/" + id + "/cast");
  return (await response).data.map((item: any) => item.person);
};
