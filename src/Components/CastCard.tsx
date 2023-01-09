import { memo } from "react";
import LoadingSpinner from "./LoadingSpinner";

const CastCard = ({
  avatarLink,
  name,
}: {
  avatarLink: string;
  name: string;
}) => {
  if (!avatarLink) {
    return (
      <LoadingSpinner className="text-3xl text-red-400 flex items-center sm:text-8xl" />
    );
  }
  return (
    <div className="p-1 m-1">
      <img className="w-28 rounded-sm" src={avatarLink} alt="" />
      <p className="text-gray-500 font-semibold">{name}</p>
    </div>
  );
};

export default memo(CastCard);
