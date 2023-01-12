import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ShowsQueryChangeAction } from "../actions/show";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import {
  showLoadingSelector,
  showsQuerySelector,
  showsSelector,
} from "../selectors/Shows";
import { State } from "../store";
import ShowsImage from "../assets/ShowsImage.png";
import LoadingSpinner from "../Components/LoadingSpinner";

type ShowListPageProps = {} & ReduxProps;

const ShowListPage: FC<ShowListPageProps> = ({
  query,
  shows,
  showsQueryChange,
  loading,
}) => {
  return (
    <div className="mt-2 mx-4">
      <div className="flex justify-between ">
        <SearchBar
          className="w-2/3"
          value={query}
          onChange={(event) => {
            showsQueryChange(event.target.value);
          }}
        />
        {loading && (
          <LoadingSpinner className="text-2xl text-red-500 font-bold" />
        )}
      </div>
      <div className="flex flex-wrap justify-center">
        {!shows && (
          <div className="sm:text-5xl text-2xl text-red-600 font-bold">
            <img
              className="mt-1 object-cover object-center w-screen h-screen"
              src={ShowsImage}
              alt=""
            />
          </div>
        )}
        {shows &&
          shows.map((element) => <ShowCard key={element.id} show={element} />)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    query: showsQuerySelector(state),
    shows: showsSelector(state),
    loading: showLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  showsQueryChange: ShowsQueryChangeAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);
