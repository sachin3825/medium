const Quote = () => {
  return (
    <div className=' h-screen flex justify-center items-center flex-col text-left'>
      <div className=' p-4 max-w-md'>
        <h2 className='text-2xl font-bold'>
          "The customer service I received was exceptional. The support team
          went above and beyond to address my concerns."
        </h2>
        <div className='mt-2'>
          <p className='font-semibold'>Jules Winnfield</p>
          <p className='text-slate-500 font-sm'>CEO | Acme Inc</p>
        </div>
      </div>
    </div>
  );
};

export default Quote;
