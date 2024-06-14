import Quote from "../components/Quote";
import Auth from "../components/Auth";

const Signin = () => {
  return (
    <div className='min-h-screen grid md:grid-cols-2'>
      <div>
        <Auth type='signin' />
      </div>
      <div className='invisible md:visible bg-slate-300'>
        <Quote />
      </div>
    </div>
  );
};

export default Signin;
