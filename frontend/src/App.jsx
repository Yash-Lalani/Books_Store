import './App.css'
import Navbar from './components/Navbar/Navbar'
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import Home from './pages/Home'
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from './components/Footer/Footer'
import {Routes,Route} from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Profile from './pages/Profile/Profile';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import { useEffect } from 'react';
import Favourites from './pages/Profile/Favourites';
import UserOrderHistory from './pages/Profile/UserOrderHistory';
import Settings from './pages/Profile/Settings';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook';
import VoiceSearch from './components/VoiceSearch/VoiceSearch';
import Chatbot from './components/Chat/Chatbot';
import About from './pages/About';

function App() {
  const dispatch = useDispatch();
  const role=useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  },[])

  return (
    <>
     
     <Navbar></Navbar>  
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-Books" element={<AllBooks />} />
          <Route path="/about" element={<About/>} /> 
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/search" element={<VoiceSearch/>} /> 
          <Route path="/chat" element={<Chatbot/>} /> 
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Profile" element={<Profile />} >
          {role==="user" ?<Route index element={<Favourites/>} /> :<Route index element={<AllOrders/>} /> }
          {role==="admin" &&  <Route path="/Profile/add-book" element={<AddBook/>} />  }
          <Route path="/Profile/order-history" element={<UserOrderHistory/>} /> 
          <Route path="/Profile/settings" element={<Settings/>} /> 
          
          </Route>
          <Route path="/view-book-details/:id" element={<ViewBookDetails />} />

        </Routes>
        
        <Footer></Footer>
      
      
   
     
    </>
  )
}

export default App
