import React from 'react';
import { AppProvider } from './context.api';
import Editor from './editor';

const App = () => {
  return (
    <React.StrictMode>
      <AppProvider>
        <Editor />
      </AppProvider>
    </React.StrictMode>
  );
};

export default App;
