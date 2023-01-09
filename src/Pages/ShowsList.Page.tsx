import { FC } from "react";
import { connect } from "react-redux";
import { ShowsQueryChangeAction } from "../actions/show";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { Show } from "../models/Show";
import { showsQuerySelector, showsSelector } from "../selectors/Shows";
import { State } from "../store";
import Shows from "../assets/Shows.png";

type ShowListPageProps = {
  shows: Show[];
  query: string;
  showsQueryChange: (query: string) => void;
};

const ShowListPage: FC<ShowListPageProps> = ({
  query,
  shows,
  showsQueryChange,
}) => {
  return (
    <div className="mt-2 mx-4">
      <SearchBar
        value={query}
        onChange={(event) => {
          showsQueryChange(event.target.value);
        }}
      />
      <div className="flex flex-wrap justify-center">
        {shows.length < 1 && (
          <div className="sm:text-5xl text-2xl text-red-600 font-bold">
            <img
              className="mt-1 object-cover object-center w-full h-screen"
              src={Shows}
              alt=""
            />
          </div>
        )}
        {shows.length > 0 &&
          shows.map((element) => <ShowCard key={element.id} show={element} />)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return { query: showsQuerySelector(state), shows: showsSelector(state) };
};

const mapDispatchToProps = {
  showsQueryChange: ShowsQueryChangeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowListPage);
