// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Login } from '@reatfirebase/shared-ui';
import styles from './app.module.scss';

import { Route, Routes, Link } from 'react-router-dom';
import Uploadproduct from './uploadproduct/uploadproduct';
import Home from './view/pages/Home';
import Header from './header/header';
import Category from './category/category';

export function App() {
  return (
    <div>
      <Routes>
        <Route element={<Header/>}>
        <Route path='/addproduct' element={<Uploadproduct/>}  />
        <Route path='/' element={<Home/>} />
        <Route path='/category' element={<Category/>} />
        </Route>
        <Route path='/login' element={<Login admin={true} title="Admin Panel" />} />
      </Routes>
    </div>
  );
}

export default App;
