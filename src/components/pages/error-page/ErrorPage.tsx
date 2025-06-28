const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-red-50'>
      <h1 className='text-4xl font-bold text-red-600 mb-4'>Error</h1>
      <p className='text-lg text-red-800'>Something went wrong.</p>
    </div>
  );
};

export default ErrorPage;
