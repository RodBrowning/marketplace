import './index.scss';

import { useEffect } from 'react';
import Header from './components/header';
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchProducts } from './features/products/productsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <main>
      <Header />
      <div className="outlet">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
