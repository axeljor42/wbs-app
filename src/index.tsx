// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css'; // Your global styles

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
