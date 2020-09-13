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
      bg: {
        lightest: '#fff',
        lighter: '#eee',
        light: '#ddd',
        middlest: '#ccc',
        middler: '#aaa',
      },
    },
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32],
  fontWeights: [100, 300, 500, 700, 900],
  shadows: {
    box: [
      "0px 1px 2px 0px rgba(90, 90, 90, 0.4)",
      "0px 1px 2px 1px rgba(70,70,70,0.2)",
    ],
  },
};

const System: React.FC<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default System;
