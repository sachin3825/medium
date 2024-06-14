import { Avatar } from "./BlogCard";

const Appbar = () => {
  return (
    <div className='border-b flex justify-center items-center shadow-sm'>
      <div className='border-b flex justify-between item-center px-4 max-w-5xl py-1  w-full'>
        <div className='font-bold text-lg'>Medium</div>
        <Avatar name='Sachin kumawat' />
      </div>
    </div>
  );
};

export default Appbar;
