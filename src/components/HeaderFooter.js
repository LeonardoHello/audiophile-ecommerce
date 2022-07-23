import { useState, useEffect, useContext } from 'react';
import { Outlet, Link } from "react-router-dom";
import { db, auth, doc, collection, onSnapshot, getDocs, deleteDoc, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser } from "../firebase"
import menuIcon from '../images/shared/tablet/icon-hamburger.svg';
import menuExitIcon from '../images/shared/tablet/icon-close-menu.svg';
import logo from '../images/shared/desktop/logo.svg';
import cartIcon from '../images/shared/desktop/icon-cart.svg';
import Category from './Category';
import Input from './Input';
import CartItem from './CartItem';
import text from '../text';
import UserContext from '../Context';

const HeaderFooter = () => {
	const {user} = useContext(UserContext);
	const {width} = useContext(UserContext);
	const {cart, setCart} = useContext(UserContext);
	const {cartItems, setCartItems} = useContext(UserContext)
	const {cartItemsAmmount, setCartItemsAmmount} = useContext(UserContext);
	const [totalPrice, setTotalPrice] = useState(0)
	const [menu, setMenu] = useState(menuIcon);
	const [account, setAccount] = useState('sign up');
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loginEmail, setLoginEmail] = useState();
	const [loginPassword, setLoginPassword] = useState();

	useEffect(() => {
		if (width > 799) {
			setMenu(menuIcon);
		}
	}, [width])

	useEffect(() => {
		if (!user) return setCartItemsAmmount(0);
		const unsubscribe = onSnapshot(collection(db, 'users', user.uid, 'cart'), (collection) => {
			const ammount = collection.docs.reduce((pV, cV) => pV + cV.data()['ammount'], 0);
			const total = collection.docs.reduce((pV, cV) => pV + cV.data()['price'], 0);
			setCartItemsAmmount(ammount);
			setTotalPrice(total);
			setCartItems([...collection.docs.map(elem => ({product: elem.id, ammount: elem.data().ammount, price: elem.data().price, image: elem.data().image}))]);
		});
		return unsubscribe;
	}, [user]);

	useEffect(() => {
		if (menu === menuExitIcon) {
			[...document.querySelectorAll('main > *')].map(elem => elem.classList.add('unclickable_popup'));
		} else {
			[...document.querySelectorAll('main > *')].map(elem => elem.classList.remove('unclickable_popup'));
		}
	}, [menu]);

	useEffect(() => {
		if (cart) {
			[...document.querySelectorAll('#root > *:not(#cart_popup) > *')].map(elem => elem.classList.add('unclickable_cart'));
		} else {
			[...document.querySelectorAll('#root > *:not(#cart_popup) > *')].map(elem => elem.classList.remove('unclickable_cart'));
		}
	}, [cart]);

	const signUp = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (error) {
			alert(error.code);
		}
	}

	const signIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
		} catch (error) {
			alert(error.code);
		}
	}

	const menuIconChange = () => {
		menu === menuIcon ? setMenu(menuExitIcon) : setMenu(menuIcon);
	};
	
	const closingMenuPopup = () => {
		setMenu(menuIcon);
	};

	const openingCartPopup = () => {
		setCart(true);
	};

	const closingCartPopup = () => {
		setEmail();
		setPassword();
		setLoginEmail();
		setLoginPassword();
		if (cart) setCart(false);
		if (!user) setCartItemsAmmount(0);
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			alert(error.code);
		}
		closingMenuPopup();
	}

	const deleteAccount = async () => {
		try {
			await deleteUser(auth.currentUser)
		} catch (error) {
			alert('Something went wrong')
		}
		closingMenuPopup();
	}

	const removeAll = async () => {
		const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'cart'));
		querySnapshot.forEach(async document => {
			await deleteDoc(doc(db, 'users', user.uid, 'cart', document.id));
		});
	}

	return (
		<>
			<div id='cart_popup' className={cart ? 'display_flex' : 'display_none'}>
				{cartItemsAmmount === 0 ? 
				<>
					<p id='empty_cart_text'>Your cart is empty</p>
					<img src={cartIcon} alt="cart icon" />
				</> : cartItemsAmmount !== 0 && !user && account === 'login' ?
				<>
					<h2>SIGN IN</h2>
					<Input label={'E-mail'} type='email' placeholder='alexei@mail.com' error={email === '' ? true : false} value={loginEmail} updating={setLoginEmail}/>
					<Input label={'Password'} placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" type='password' error={password === '' ? true : false} value={loginPassword} updating={setLoginPassword}/>
					<button onClick={signIn}>SIGN IN</button>
					<div id='login_signup'>
						<p>Don't Have an Account?</p>
						<p onClick={() => {setAccount('sign up'); setLoginEmail(); setLoginPassword()}}>SIGN UP</p>
					</div>
				</> : cartItemsAmmount !== 0 && !user && account === 'sign up' ?
				<>
					<h2>SIGN UP</h2>
					<Input label={'E-mail'} type='email' placeholder='alexei@mail.com' error={email === '' ? true : false} value={email} updating={setEmail}/>

					<Input label={'Password'} placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" type='password' error={password === '' ? true : false} value={password} updating={setPassword}/>
					<button onClick={signUp}>SIGN UP</button>
					<div id='login_signup'>
						<p>Already Have an Account?</p>
						<p onClick={() => {setAccount('login'); setEmail(); setPassword()}}>LOG IN</p>
					</div>
				</> : 
				<>
					<div id='remove_all'>
						<h1>{`CART (${cartItemsAmmount})`}</h1>
						<p onClick={removeAll}>Remove All</p>
					</div>
					{cartItems.map((elem, index) => <CartItem key={index} product={elem.product} image={elem.image} price={elem.price} ammount={elem.ammount} />)}
					<ul>
						<li>TOTAL</li>
						<li>{`$ ${totalPrice.toLocaleString()}`}</li>
					</ul>
					<Link to={'/checkout'} onClick={() => setCart(false)}><button>CHECKOUT</button></Link>
				</>}
			</div>
			{width < 800 ? 			
				<header onClick={closingCartPopup}>
					<figure id='menu' onClick={menuIconChange}>
						<img src={menu} alt="menu button"/>
					</figure>
					<Link to={'/'}><img src={logo} alt="logo" onClick={closingMenuPopup}/></Link>
					<figure id='cart' className={`${cartItemsAmmount < 1 ? 'after_display_none' : 'after_display_grid'}`} item-count={cartItemsAmmount} onClick={openingCartPopup}>
						<img src={cartIcon} alt="cart"/>
					</figure>
					{menu === menuExitIcon ? 
						<nav id='popup'>
							{Object.keys(text).map((elem, index) => <Category key={index} category={elem} image={text[elem].icon} clicked={closingMenuPopup}/>)}
							<div id='logout'>
								<button onClick={logout}>LOG OUT</button>
								<button onClick={deleteAccount}>DELETE ACCOUNT</button>
							</div>
						</nav> : 
						null}
				</header> :
				<header onClick={closingCartPopup}>
				<Link to={'/'}><img src={logo} alt="logo" onClick={closingMenuPopup}/></Link>
				<nav>
					<li onClick={() => {closingMenuPopup(); window.scroll('top', 'top')}}><Link to={'/'}>HOME</Link></li>
					<li onClick={() => {closingMenuPopup(); window.scroll('top', 'top')}}><Link to={'/headphones'}>HEADPHONES</Link></li>
					<li onClick={() => {closingMenuPopup(); window.scroll('top', 'top')}}><Link to={'/speakers'}>SPEAKERS</Link></li>
					<li onClick={() => {closingMenuPopup(); window.scroll('top', 'top')}}><Link to={'/earphones'}>EARPHONES</Link></li>
				</nav>
				<figure id='cart' className={`${cartItemsAmmount < 1 ? 'after_display_none' : 'after_display_grid'}`} item-count={cartItemsAmmount} onClick={openingCartPopup}>
					<img src={cartIcon} alt="cart"/>
				</figure>
				{menu === menuExitIcon ? 
					<nav id='popup'>
						{Object.keys(text).map((elem, index) => <Category key={index} category={elem} image={text[elem].icon} clicked={closingMenuPopup}/>)}
						<div id='logout'>
							<button onClick={logout}>LOG OUT</button>
							<button onClick={deleteAccount}>DELETE ACCOUNT</button>
						</div>
					</nav> : 
					null}
			</header>}
			<main onClick={() => {cart ? closingCartPopup() : closingMenuPopup()}}>
				<Outlet/>
			</main>
			<footer onClick={closingCartPopup}>
				<div/>
				<Link to={'/'}><img src={logo} alt="logo" onClick={() => {closingMenuPopup(); window.scroll('top', 'top')}}/></Link>
				<nav>
					<li onClick={() => {closingMenuPopup(); window.scroll('top', 'top')}}><Link to={'/'}>HOME</Link></li>
					<li onClick={() => {closingMenuPopup(); window.scroll('top', 'top')}}><Link to={'/headphones'}>HEADPHONES</Link></li>
					<li onClick={() => {closingMenuPopup(); window.scroll('top', 'top')}}><Link to={'/speakers'}>SPEAKERS</Link></li>
					<li onClick={() => {closingMenuPopup(); window.scroll('top', 'top')}}><Link to={'/earphones'}>EARPHONES</Link></li>
				</nav>
				<p>Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
				<p><small>Copyright 2021. All Rights Reserved</small></p>
				<address>
					<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" fillRule="nonzero"/></svg>
					<svg width="24" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M24 2.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337.608a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616.248c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 1.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 2.557z" fillRule="nonzero"/></svg>
					<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fillRule="nonzero"/></svg>
				</address>
			</footer>
		</>
	)
}

export default HeaderFooter