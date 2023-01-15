import { FC, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { BiArrowBack } from "react-icons/bi";
import { State } from "../store";
import { connect, ConnectedProps } from "react-redux/es/exports";
import { LoadingDetailsAction } from "../actions/Details";
import { LoadCastAction } from "../actions/Cast";
import { castSelector } from "../selectors/Cast";
import { showLoadingSelector, showsMapSelector } from "../selectors/Shows";
import { defaultImage } from "../Components/ShowCard";
import LoadingSpinner from "../Components/LoadingSpinner";

type ownProps = {} & WithRouterProps;

type ShowDetailPageProps = ownProps & ReduxProps;

const ShowDetailPage: FC<ShowDetailPageProps> = ({
  show,
  cast,
  id,
  loadDetails,
  loading,
  loadCast,
}) => {
  useEffect(() => {
    loadDetails(id);
    loadCast(id);
  }, [id]);

  if (loading) {
    return (
      <LoadingSpinner className="text-3xl text-red-400 mx-auto flex items-center text-center justify-center sm:text-8xl" />
    );
  }

  const Summary = show?.summary;
  const newStr = Summary?.replace(/(<([^>]+)>)/gi, "");

  return (
    <div className="mt-2 px-2">
      <h2 className="text-4xl font-semibold tracking-wide">{show?.name}</h2>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {show?.genres?.map((p) => (
          <GenrePill key={p} name={p} />
        ))}
      </div>
      <Link
        className="text-white w-14 bg-slate-600 rounded-md px-2 py-1 flex text-center items-center justify-center"
        to="/"
      >
        Back
        <BiArrowBack />
      </Link>
      <div className="mt-2 sm:flex ">
        <img
          src={show?.image?.medium || defaultImage}
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          <p>{newStr || Summary}</p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating:
            <span className="text-gray-700">
              <>{show?.rating.average || 5} </>
            </span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap">
          {cast.length > 0 ? (
            cast.map((p) => {
              return (
                <CastCard
                  key={p.id}
                  avatarLink={p.image?.medium || defaultImage}
                  name={p.name}
                />
              );
            })
          ) : (
            <div className="text-xl font-bold">No Cast available</div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: ownProps) => {
  const showId = +ownProps.params.show_id;

  return {
    id: showId,
    show: showsMapSelector(state)[showId],
    cast: castSelector(state),
    loading: showLoadingSelector(state),
  };
};
const mapDispatchToProps = {
  loadDetails: LoadingDetailsAction,
  loadCast: LoadCastAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage as any));
