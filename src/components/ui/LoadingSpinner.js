import React from 'react';
import styled from 'styled-components';

const Loader = styled.div`
  .fa-spinner {
    font-size: 3rem;
    position: fixed;
    left: 0;
    right: 0;
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    bottom: 0;
    top: 0;
    margin: auto;
    z-index: 99;
  }
`;

const LoadingSpinner = () => (
  <Loader>
    <i className="fa fa-spinner fa-spin" />
  </Loader>
);

export default LoadingSpinner;
