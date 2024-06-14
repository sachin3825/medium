import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className='border-b-2 p-4 max-w-2xl w-full'>
      <div className='flex items-center gap-2'>
        <Avatar name={authorName} />
        <div className=''>{authorName}</div>{" "}
        <div className='flex items-center justify-center'>.</div>{" "}
        <div className='text-gray-400 text-xs'>{publishedDate}</div>
      </div>
      <div className='mt-3'>
        <h2 className='font-bold text-2xl'>{title}</h2>
        <p>
          {content.length > 100 ? content.substring(0, 200) + "..." : content}
        </p>
      </div>

      <p className='text-xs text-slate-400 mt-3'>{`${Math.ceil(
        content.length / 100
      )} minutes(s) read`}</p>
    </Link>
  );
};

export default BlogCard;

export function Avatar({ name }: { name: string }) {
  const getInitial = (name: string) => {
    const nameParts = name.split(" ");
    const initials =
      nameParts[0][0] +
      (nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : "");
    return initials.toUpperCase();
  };
  return (
    <div className='relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full light:bg-gray-600'>
      <span className='font-sm text-gray-600 light:text-gray-300 '>
        {getInitial(name)}
      </span>
    </div>
  );
}
