import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks/blog";
import BlogSkeleton from "../components/BlogSkeleton";
const Blogs = () => {
  const { loading, blogs } = useBlogs();
  console.log(blogs);
  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="max-w-lg mx-auto flex flex-col">
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="flex flex-col justify-center items-center w-full">
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            key={blog.id}
            authorName={blog.author.name || "Anonyms"}
            title={blog.title}
            content={blog.content}
            publishedDate="23rd Feb 2024"
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
