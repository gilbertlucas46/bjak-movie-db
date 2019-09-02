import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 0;
  background-color: unset;
  border: 0;
`;

const ButtonContainer = ({ children }) => (
  <Button>
    {children}
  </Button>
);

export default ButtonContainer;
