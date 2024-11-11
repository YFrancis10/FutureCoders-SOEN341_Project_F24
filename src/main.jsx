import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; 
//const domnode =document.getElementById("root");
//console.log(domnode);
const root = createRoot(document.getElementById("root"));
console.log("hello");
//const root = createRoot(domnode);
root.render(<App />);
//ReactDOM.render(<App />, document.getElementById("root"));
1