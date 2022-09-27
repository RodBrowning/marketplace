import './index.scss';

import Header from './components/header';
import { Outlet } from "react-router-dom";

function App() {
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
