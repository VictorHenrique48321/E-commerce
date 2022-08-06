import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Cart from './pages/cart/cart';
import Store from './pages/store/store';

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Store/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </>
  );
}

export default App;