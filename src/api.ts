import axios from "axios";
import { Show } from "./models/Show";

const BASE_URL = "https://api.tvmaze.com";

export const searchShows = async (query: string) => {
  const response = await axios.get(
    "https://api.tvmaze.com/search/shows?q=" + query
  );
  const shows: Show[] = response.data.map((i: any) => {
    return i.show;
  });
  const data = [];
  for (let i = 0; i < shows.length; i++) {
    data.push(getCastForShow(shows[i]));
  }

  return Promise.all(data);
};

// export const searchShows3 = async (keyword: string) => {
//   const response = await axios.get<{ show: Show }[]>(
//     BASE_URL + "/search/shows?q=" + keyword
//   );
//   const shows = response.data.map((item) => item.show);
//   const castPromises = [];
//   for (let i = 0; i < shows.length; i++) {
//     const newData = await getCasts(shows[i].id);
//     const newArr = newData.data.map((item: any) => item.person);
//     castPromises.push(newArr);
//   }
//   return Promise.all(castPromises);
// };

export const showDetails = async (id: number) => {
  const response = await axios.get(BASE_URL + "/shows/" + id);
  return response.data;
};

export const getCastForShow = async (show: Show) => {
  const response = await axios.get(BASE_URL + "/shows/" + show.id + "/cast");
  const cast = response.data.map((item: any) => item.person);
  return { show, cast: { id: show.id, person: cast } };
};

export const getCasts = async (id: number) => {
  const response = await axios.get(BASE_URL + "/shows/" + id + "/cast");
  return response.data.map((item: any) => item.person);
};
