import Quote from "../components/Quote";
import Auth from "../components/Auth";

const Signup = () => {
  return (
    <div className='min-h-screen grid md:grid-cols-2'>
      <div className='flex justify-center items-center'>
        <Auth type='signup' />
      </div>
      <div className='hidden md:flex justify-center items-center bg-slate-300'>
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
