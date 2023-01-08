import { FC } from "react";
import { connect } from "react-redux";
import { ShowsQueryChangeAction } from "../actions/show";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { Show } from "../models/Show";
import { showsQuerySelector, showsSelector } from "../selectors/Shows";
import { State } from "../store";

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
    <div className="mt-2">
      <SearchBar
        value={query}
        onChange={(event) => {
          showsQueryChange(event.target.value);
        }}
      />
      <div className="flex flex-wrap justify-center">
        {shows.length < 1 && (
          <div className="sm:text-5xl text-2xl text-red-600 font-bold">
            Search your Favourite TV Shows
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
