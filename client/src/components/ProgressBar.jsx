import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded overflow-hidden">
      <div
        className="bg-teal-500 h-5 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

/*ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};*/

export default ProgressBar;