import axios from "axios";
import { Show } from "./models/Show";

export const searchShows = (keyword: string) => {
  return axios
    .get<{ show: Show }[]>("https://api.tvmaze.com/search/shows?q=" + keyword)
    .then((response) => response.data.map((item) => item.show));
};

export const showDetails = (id: number) => {
  return axios.get("https://api.tvmaze.com/shows/" + id).then((response) => {
    return response.data;
  });
};

export const getCasts = (id: number) => {
  return axios
    .get("https://api.tvmaze.com/shows/" + id + "/cast")
    .then((response) => {
      return response.data.map((item:any) => item.person)
    });
};
