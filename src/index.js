import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { renderToStaticMarkup } from 'react-dom/server';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

let init = null;
export const Client = () =>{
  return {
    config: (config) => {
      init = config
    },
    render: () => {
      let root = document.getElementById(init.selector)
      if (typeof (root) !== 'undefined') {
        return (
          renderToStaticMarkup(
            ReactDOM.createRoot(document.getElementById(init.selector)).render(<App init={init} />)
          )
        )
      }
    }
  }
}
