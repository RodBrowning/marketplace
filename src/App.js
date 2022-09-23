import './index.scss';

import Header from './components/header';
import { Outlet } from "react-router-dom";
import pictureA from './a.jpg';
import pictureB from './b.jpg';

function cartItems() {
  return []
}

function App() {
  
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

export default App;
