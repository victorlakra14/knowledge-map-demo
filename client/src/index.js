import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import "reactflow/dist/style.css"
import { ReactFlowProvider } from 'reactflow';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{width: "100vw", height: "100vh"}}>
      <ReactFlowProvider >
        <App />
      </ReactFlowProvider>
    </div>
  </React.StrictMode>
);
