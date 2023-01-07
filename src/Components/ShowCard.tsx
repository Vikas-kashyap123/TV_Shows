import { FC } from "react";
import { Link } from "react-router-dom";
import { Show } from "../models/Show";

type showCardPros = {
  show: Show;
};

const ShowCard: FC<showCardPros> = ({ show }) => {
  const defaultImage =
    "https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg";

  return (
    <div className="max-w-xs rounded-md shadow-md p-2 m-1">
      <img
        src={show.image?.medium || show.image?.original || defaultImage}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{show.name}</h2>
          <p>{show.summary}</p>
        </div>
        <Link
          to={"/show/" + show.id}
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ShowCard;
