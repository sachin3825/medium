import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
  return (
    <div className="border-b flex justify-center items-center shadow-sm">
      <div className="border-b flex justify-between item-center px-4 max-w-5xl py-1  w-full">
        <Link to={"/blogs"} className="font-bold text-lg">
          Medium
        </Link>
        <div>
          <Link
            to={"/publish"}
            type="button"
            className="  text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-1 text-center me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New blog
          </Link>

          <Avatar name="Sachin kumawat" />
        </div>
      </div>
    </div>
  );
};

export default Appbar;
