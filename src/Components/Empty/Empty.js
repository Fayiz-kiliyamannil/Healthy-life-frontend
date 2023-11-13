import React from 'react';

const EmptyPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 rounded-lg shadow-sm shadow-gray-700">
        <h1 className="text-4xl font-bold text-gray-100 mb-4">Oops, Nothing Here!</h1>
        <p className="text-lg text-gray-400">Seems like this page is empty for now.</p>
      
      </div>
    </div>
  );
};

export default EmptyPage;