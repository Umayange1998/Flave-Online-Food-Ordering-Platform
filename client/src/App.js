import './App.css';
import Navbar from './components/Navbar/Navbar';
import{ Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import { Toolbar } from '@mui/material';
import { useState } from 'react';
import SigninForm from './SigninForm/SigninForm.jsx';
import ScrollToTop from "./ScrollToTop.jsx";
import Veryfy from './pages/Verify/Veryfy.jsx';
import MyOrders from './pages/MyOrders/MyOrders.jsx';


function App() {

  const [showSignin, setShowSignin] = useState(false);
  return (
    <>
     <SigninForm showSignin={showSignin} setShowSignin={setShowSignin} />
    <div className="App">
     <Navbar setShowSignin={setShowSignin} />
     <Toolbar />
     <ScrollToTop />
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/placeorder' element={<PlaceOrder/>}/>
      <Route path='/verify-payment' element={<Veryfy/>}/>
      <Route path='/my-orders' element={<MyOrders/>}/>
     </Routes>
    </div>
    <Footer/>
    </>

  );
}

export default App;
