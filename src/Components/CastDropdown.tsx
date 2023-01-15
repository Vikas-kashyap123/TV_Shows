import { Avatar, Divider } from "@mui/material";
import { FC } from "react";
import { Person } from "../models/Cast";
type CastDropDownProps = {
  className?: string;
  persons?: Person[];
};

const CastDropDown: FC<CastDropDownProps> = ({ className, persons }) => {
  return (
    <div
      className={
        "md:w-52 w-32 rounded-md space-x-1 bg-black z-50  p-1" + className
      }
    >
      {persons?.map((p) => {
        return (
          <div
            key={p.id}
            className="flex items-center justify-between md:px-4 md:py-1 border-b-2 border-gray-500  text-white"
          >
            <Avatar
              alt="Remy Sharp"
              src={p.image?.medium}
              sx={{ width: 24, height: 24 }}
            />
            <p className="text-base font-semibold"> {p.name} </p>
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default CastDropDown;
