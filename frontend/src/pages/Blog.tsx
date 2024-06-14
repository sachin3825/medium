import { useBlog } from "../hooks/blog";
import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) {
    return <div>Loading...</div>;
  }

  return <FullBlog blog={blog} />;
};

export default Blog;
