import Appbar from "./Appbar";
import { Blog } from "../hooks/blog";
import { Avatar } from "./BlogCard";
const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="grid grid-row-2 lg:grid-cols-12 p-5 w-full max-w-screen-lg mx-auto">
        <div className="row-span-1 lg:col-span-8  p-2 ">
          <h2 className="text-3xl font-bold ">{blog.title}</h2>
          <p className="text-sm text-gray-500 mt-1">Posted on 23rd Feb 2024</p>
          <p className="text-md mt-5">{blog.content}</p>
        </div>
        <div className="row-span-1 lg:col-span-4 flex flex-col gap-2">
          <p className="text-sm text-gray-500 font-bold">Author</p>
          <div className="flex items-center gap-4 text-sm w-full">
            <Avatar name={blog.author.name || "Anonymous"} />
            <div className="w-10/12">
              <h3>{blog.author.name || "Anonymous"}</h3>
              <p>
                Random catch phrase about the author's ability to grab the
                user's attention
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
