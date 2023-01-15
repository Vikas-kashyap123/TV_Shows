import { Avatar, AvatarGroup } from "@mui/material";
import { FC, memo, useState } from "react";
import { Link } from "react-router-dom";
import { Cast, Person } from "../models/Cast";
import { Show } from "../models/Show";
import CastDropDown from "./CastDropdown";

type ShowCardProps = { show: Show; cast: Cast };
export const defaultImage =
  "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
const ShowCard: FC<ShowCardProps> = ({ show, cast }) => {
  const [avtarShow, setAvtarShow] = useState(false);

  return (
    <div className="max-w-xs rounded-md shadow-md p-2 m-1 relative">
      <img
        src={show.image?.medium || defaultImage}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{show.name}</h2>
          <p
            dangerouslySetInnerHTML={{ __html: show?.summary || "" }}
            className="h-36 overflow-y-hidden"
          ></p>
        </div>
        <Link
          to={"/show/" + show.id}
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md text-xl bg-slate-600 hover:bg-black hover:text-white"
        >
          View Details
        </Link>
        <div className="flex flex-col items-center gap-4 ">
          <h3 className="text-2xl font-semibold">Cast</h3>
          <div className="cursor-pointer">
            <AvatarGroup
              max={4}
              total={cast.person?.length}
              onClick={() => setAvtarShow(!avtarShow)}
            >
              {cast.person?.map((p: Person) => {
                return <Avatar key={p.id} alt="" src={p.image?.medium} />;
              })}
            </AvatarGroup>
          </div>
          {avtarShow && (
            <CastDropDown
              persons={cast?.person}
              className={` ${
                avtarShow ? "bottom-20" : "bottom-[-100%]"
              } + " absolute md:left-52 left-44 bottom-20 duration-300 "`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ShowCard);
