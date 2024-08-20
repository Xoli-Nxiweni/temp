// import React from 'react';
import { useSelector } from 'react-redux';
import './Loader.css'; // Import the CSS file

const Loader = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  return (
    isLoading && (
      <div className="loader-overlay">
        <div className="loader"></div>
      </div>
    )
  );
};

export default Loader;
