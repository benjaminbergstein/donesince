import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    accent: {
      white: '#FFF',
      text: '#001514',
      success: '#AEF6C7',
      warning: '#FFA987',
    },
    grays: {
      text: {
        light: '#829298',
        medium: '#6E6362',
      },
    },
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32],
  fontWeights: [100, 300, 500, 700, 900]
};

const System: React.FC<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default System;
