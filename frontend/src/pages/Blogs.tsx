import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks/blog";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  console.log(blogs);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Appbar />
      <div className='flex flex-col justify-center items-center w-full'>
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            key={blog.id}
            authorName={blog.author.name || "Anonyms"}
            title={blog.title}
            content={blog.content}
            publishedDate='23rd Feb 2024'
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
