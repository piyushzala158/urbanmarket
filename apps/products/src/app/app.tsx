// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Login, Signup } from '@reatfirebase/shared-ui';
import styles from './app.module.scss';
import Products from './products/products';
import { Route, Routes } from 'react-router-dom';
import Home from './view/pages/Home';
import Header from './header/header';

export function App() {
  return (
    <div>
      <Routes>
        <Route element={<Header/>}>
        <Route path="/" element={<Home />} />
        </Route>
        <Route
          path="/login"
          element={<Login admin={false} title="Login" />}
          />
        <Route
          path="/signup"
          element={<Signup />}
          />
      </Routes>
    </div>
  );
}

export default App;
