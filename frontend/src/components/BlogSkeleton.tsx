const BlogSkeleton = () => {
  return (
    <div role="status" className=" w-full animate-pulse mt-10">
      <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full "></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default BlogSkeleton;
