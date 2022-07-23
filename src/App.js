import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import ProductCategory from "./components/ProductCategory";
import Checkout from "./components/Checkout";
import HeaderFooter from "./components/HeaderFooter";
import AboutUs from "./components/AboutUs";
import ProductInformation from "./components/ProductInformation";
import UserContext from "./Context";
import { auth, db, onAuthStateChanged, updateProfile, collection, doc, onSnapshot } from "./firebase";
import text from "./text";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
  const [cartItemsAmmount, setCartItemsAmmount] = useState(0);
  const [width, setWidth] = useState();

  useEffect(() => {
    const observer = new ResizeObserver(entries => setWidth(Math.trunc(entries[0].contentRect.width)));
    observer.observe(document.querySelector('body'));

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(user);
      }
    });
  }, [])

  return (
    <UserContext.Provider value={{user, cart, cartItems, cartItemsAmmount, setCart, setCartItems, setCartItemsAmmount, width}}>
      <Routes>
        <Route element={<HeaderFooter/>}>
          <Route path="/checkout" element={cartItems.length !== 0 ? <Checkout/> : <Navigate to={'/'}/>}/>
          <Route element={<AboutUs/>}>
            <Route path="/" element={<Home/>}/>

            {Object.keys(text).map((elem, index) => <Route key={index} path={`/${elem}`} element={<ProductCategory category={elem}/>}/>)}

            {Object.keys(text).map((elemA) => Object.keys(text[elemA].products).map((elemB) => <Route path={`/${elemA}/${elemB.toLowerCase().split(' ').join('-')}`} element={<ProductInformation key={elemB} images={text[elemA].products[elemB].images} name={`${elemB} ${elemA}`} about={text[elemA].products[elemB].about} inTheBox={text[elemA].products[elemB]['in the box']} display={true} newProduct={text[elemA].products[elemB]['new product']} price={text[elemA].products[elemB].price} features={text[elemA].products[elemB].features}/>}/>))}
          </Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;