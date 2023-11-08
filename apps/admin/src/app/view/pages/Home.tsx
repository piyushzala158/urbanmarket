import React, { useEffect } from 'react'
import Header from '../../header/header'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@reatfirebase/shared-ui';
import Productlisting from '../../productlisting/productlisting';

const Home = () => {



  return (
    <div className='pt-12'>
        <Productlisting/>
    </div>
  )
}

export default Home