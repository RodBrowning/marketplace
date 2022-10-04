import './index.scss';

import { useEffect } from 'react';
import Header from './components/header';
import { useAppDispatch } from './app/hooks';
import { fetchProducts } from './features/products/productsSlice';
import {Routes, Route} from 'react-router-dom';
import Cart from './pages/cart';
import Product from './pages/product';
import Products from './pages/products';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <main>
      <Header />
      <div className="outlet">
        <Routes>
          <Route path='/' element={<Products />}/>
          <Route path='/Product/:id' element={<Product />}/>
          <Route path='/cart' element={<Cart />}/>
        </Routes>
      </div>
    </main>
  );
}

export default App;
