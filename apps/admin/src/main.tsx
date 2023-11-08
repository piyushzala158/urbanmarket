import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from '@reatfirebase/shared-ui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
    <Toaster/>
    <Provider store={store} >
      <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>
);
