import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import HomePage from './HomePage.jsx' /* ok*/
import Cart from './Cart.jsx' /* ok*/
import Header from './Header.jsx' /* ok*/
import Footer from './Footer.jsx' /* ok*/
import FilterSidebar from './FilterSidebar.jsx' /* ok*/
import BuildWardrobe from './BuildWardrobe.jsx' /* ok*/
import MyRentals from './MyRental.jsx' /* ok*/
import Occasion from './Occasion.jsx' /* ok*/
import ProductDetail from './ProductDetail.jsx' /* ok*/
import Profile from './Profile.jsx' /* ok*/
import WishList from './WishList.jsx' /* ok*/
import HowItWorks from './HowItWork.jsx' /* ok*/
import Brand from './Brand.jsx' /* ok*/
import Dashboard from './Dashboard.jsx' /* ok*/
import MyWardrobe from './MyWardrobe.jsx' /* ok*/
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
