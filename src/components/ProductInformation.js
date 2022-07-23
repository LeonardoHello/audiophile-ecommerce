import { useState, useEffect, useContext } from "react";
import Product from "./Product";
import ProductSuggestion from "./ProductSuggestion";
import UserContext from "../Context";
import text from "../text";
import { db, collection, doc, getDocs, setDoc, updateDoc } from "../firebase";

const ProductInformation = ({ images, name, about, display, newProduct, price, features, inTheBox }) => {
	const {width} = useContext(UserContext);
	const {user} = useContext(UserContext);
	const {setCart} = useContext(UserContext);
	const {setCartItemsAmmount} = useContext(UserContext);
	const [ammount, setAmmount] = useState(1);

	const emptyCart = () => {
		setCartItemsAmmount(ammount);
		setCart(true);
	}

	useEffect(() => {
		window.scroll('top', 'top');
		if (document.querySelector('main').classList.contains('ProductCategory_main_styling')) {
			document.querySelector('main').classList.replace('ProductCategory_main_styling', 'ProductInformation_main_styling');
		} else if (document.querySelector('main').classList.contains('Home_main_styling')) {
			document.querySelector('main').classList.replace('Home_main_styling', 'ProductInformation_main_styling');
		} else if (document.querySelector('main').classList.contains('Checkout_main_styling')) {
			document.querySelector('main').classList.replace('Checkout_main_styling', 'ProductInformation_main_styling');
		} else {
			document.querySelector('main').classList.add('ProductInformation_main_styling');
		};
	}, []);

	const addToCart = async () => {
		if (!user) return emptyCart();
		const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'cart'));
		if (querySnapshot.docs.some(elem => elem.id === name)) {
			querySnapshot.docs.forEach(async elem => {
				if (elem.id === name) {
					await updateDoc(doc(db, 'users', user.uid, 'cart', elem.id), {
						ammount: elem.data()['ammount'] + ammount,
						price: elem.data()['price'] + (ammount * price)
					});
				}
			});
		} else {
			await setDoc(doc(db, 'users', user.uid, 'cart', name), {
				ammount: ammount,
				image: images[5],
				price: ammount * price
			});
		}
	}
	return (
		<>
			<Product images={images} name={name} about={about} display={display} newProduct={newProduct} styling={true}>
				<h3>{`$ ${price.toLocaleString()}`}</h3>
				<div id="orders">
					<menu>
						<li onClick={() => ammount > 1 ? setAmmount(currentOrder => currentOrder-1) : null}>-</li>
						<li>{ammount}</li>
						<li onClick={() => setAmmount(currentOrder => currentOrder+1)}>+</li>
					</menu>
					<button onClick={addToCart}>ADD TO CART</button>
				</div>
			</Product>
			<div id="information">
				<section id="features" onClick={() => console.log(user)}>
					<h1>FEATURES</h1>
					<p>{features[0]}</p>
					<p>{features[1]}</p>
				</section>
				<section id="in_the_box">
					<h1>IN THE BOX</h1>
					<div>
						<ul>
							{Object.values(inTheBox).map((elem, index) => <li style={{order: index}} key={index}>{`${elem}x`}</li>)}
						</ul>
						<ul>
							{Object.keys(inTheBox).map((elem, index) => <li style={{order: index}} key={index}>{elem}</li>)}
						</ul>
					</div>
				</section>
			</div>
			<section id="images">
				<img src={width < 800 ? images[1] : images[6]} alt={`${name} #1`}/>
				<img src={width < 800 ? images[2] : images[7]} alt={`${name} #2`}/>
				<img src={width < 800 ? images[3] : images[8]} alt={`${name} #3`}/>
			</section>
			<section id="suggestions">
				<h1>YOU MAY ALSO LIKE</h1>
				<div>
					{Object.keys(text).map(elemA => Object.keys(text[elemA].products).map(elemB => !name.includes(`${elemB} `) && text[elemA].products[elemB]['new product'] === true ? <ProductSuggestion key={elemB} name={elemB} image={text[elemA].products[elemB].images[4]} path={`/${elemA}/${elemB.split(' ').join('-')}`}/> : null))}
				</div>
			</section>
		</>
	)
}

export default ProductInformation