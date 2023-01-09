import { FC, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { BiArrowBack } from "react-icons/bi";
import { State } from "../store";
import { connect } from "react-redux/es/exports";
import { LoadingDetailsAction } from "../actions/Details";
import { LoadCastAction } from "../actions/Cast";
import { castSelector } from "../selectors/Cast";
import { showsMapSelector } from "../selectors/Shows";
import { Show } from "../models/Show";
import { Cast } from "../models/Cast";
import { defaultImage } from "../Components/ShowCard";
import LoadingSpinner from "../Components/LoadingSpinner";

type ShowDetailPageProps = {
  loading: any;
  setLoading: Function;
  show: Show;
  cast: Cast;
  loadDetails: (id: number) => void;
  loadCast: (id: number) => void;
} & WithRouterProps;

const ShowDetailPage: FC<ShowDetailPageProps> = ({
  params,
  show,
  cast,
  loadDetails,
  loadCast,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const id = +params.show_id;
  console.log("cast", cast);

  useEffect(() => {
    loadDetails(id);
    loadCast(id);
    setError(false);
    setLoading(false);
  }, [id]);

  if (error) {
    return <div>Error 404</div>;
  }

  if (loading) {
    return (
      <LoadingSpinner className="text-3xl text-red-400 mx-auto flex items-center text-center justify-center sm:text-8xl" />
    );
  }

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
          <p>{show?.summary}</p>
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
            <div className="text-xl font-bold">No Cast avilable</div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: any) => {
  const showId = +ownProps.params.show_id;

  return {
    show: showsMapSelector(state)[showId],
    cast: castSelector(state),
  };
};
const mapDispatchToProps = {
  loadDetails: LoadingDetailsAction,
  loadCast: LoadCastAction,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(memo(ShowDetailPage as any))
);
