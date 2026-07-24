import React from 'react';

import PropTypes from 'prop-types';

import './simple-date.css';

export const SimpleDate = ({
  ...props
}) => {
  return (
    <div className="simple-date">{props.dateString}</div>
  );
};

SimpleDate.propTypes = {
  dateString: PropTypes.string,
};
