import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (term: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) {
      setError('Please enter a username.');
      return;
    }
    setError('');
    onSearch(search);
  };

  return (
    <form
      className='w-full max-w-md flex flex-col gap-4'
      onSubmit={handleSubmit}
    >
      <input
        className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
        type='text'
        placeholder='Enter username'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (error) setError('');
        }}
      />
      {error && <span className='text-red-500 text-sm'>{error}</span>}
      <button
        className='bg-[#2d9cdb] text-white font-medium py-2 rounded cursor-pointer hover:bg-[#238ac6]'
        type='submit'
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
