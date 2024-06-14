import { useBlog } from "../hooks/blog";
import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import Appbar from "../components/Appbar";
import BlogSkeleton from "../components/BlogSkeleton";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  console.log(blog);
  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="max-w-screen-lg mx-auto">
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  return <FullBlog blog={blog} />;
};

export default Blog;
