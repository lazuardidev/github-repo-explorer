import { Ghost } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white px-4'>
      <Ghost size={64} className='text-gray-400 mb-6' />
      <h1 className='text-6xl font-extrabold text-gray-800 mb-2'>404</h1>
      <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
        Page Not Found
      </h2>
      <p className='text-lg text-gray-500 mb-8 text-center max-w-md'>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href='/'
        className='px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors'
      >
        Go Home
      </a>
    </div>
  );
};

export default ErrorPage;
