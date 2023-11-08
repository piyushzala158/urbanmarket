import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@reatfirebase/shared-ui';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
    <Toaster/>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>
);
