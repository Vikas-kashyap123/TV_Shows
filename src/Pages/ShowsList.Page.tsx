import { useEffect, useState } from "react";
import { searchShows } from "../api";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { Show } from "../models/Show";

function ShowListPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    searchShows(query).then((shows) => setShows(shows));
  }, [query]);

  return (
    <div className="mt-2">
      <SearchBar
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <div className="flex flex-wrap justify-center">
        {shows.map((element) => (
          <ShowCard key={element.id} show={element} />
        ))}
      </div>
    </div>
  );
}

export default ShowListPage;
