import { useState, useEffect, useContext } from "react";
import FormSection from "./FormSection";
import Input from "./Input";
import CartItem from "./CartItem";
import cash from "../images/checkout/icon-cash-on-delivery.svg";
import UserContext from "../Context";
import { db, doc, collection, onSnapshot, deleteDoc } from "../firebase";

const Checkout = () => {
	const {user} = useContext(UserContext);
	const {cartItems} = useContext(UserContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState(user.email || undefined);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [address, setAddress] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('e-Money');
	const [eMoneyNumber, setEmoneyNumber] = useState('');
	const [eMoneyPIN, setEMoneyPIN] = useState('');
	const [totalPrice, setTotalPrice] = useState(0);

	const buying = async () => {
		if (name.length > 0 && email.length > 0 && address.length > 0 && zipCode.length === 5 && city.length > 0 && country.length > 0 && ((paymentMethod === 'e-Money' && eMoneyNumber.length === 10 && eMoneyPIN.length === 4) || (paymentMethod !== 'e-Money'))) {
			const unsubscribe = onSnapshot(collection(db, 'users', user.uid, 'cart'), (collection) => {
				collection.docs.map(async elem => await deleteDoc(doc(db, "users", user.uid, 'cart', elem.id)));
			});
			alert('Thanks for buying!')

			return unsubscribe;
		} else {
			alert('Payment did not went through')
		}
	}

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'users', user.uid, 'cart'), (collection) => {
			const total = collection.docs.reduce((pV, cV) => pV + cV.data().price, 0);
			setTotalPrice(total);
		});
		return unsubscribe;
	}, [])

	useEffect(() => {
		window.scroll('top', 'top');
		if (document.querySelector('main').classList.contains('ProductInformation_main_styling')) {
			document.querySelector('main').classList.replace('ProductInformation_main_styling', 'Checkout_main_styling');
		} else if (document.querySelector('main').classList.contains('ProductCategory_main_styling')) {
			document.querySelector('main').classList.replace('ProductCategory_main_styling', 'Checkout_main_styling');
		} else if (document.querySelector('main').classList.contains('Home_main_styling')) {
			document.querySelector('main').classList.replace('Home_main_styling', 'Checkout_main_styling');
		} else {
			document.querySelector('main').classList.add('Checkout_main_styling');
		}
	}, [])
	return (
		<>
			<div><p className="go_back" onClick={() => window.history.back()}>Go Back</p></div>
			<section id="form">
				<h1>CHECKOUT</h1>
				<FormSection heading={'BILLING DETAILS'}>
					<Input label={'Name'} placeholder={'Alexei Ward'} value={name} updating={setName} error={name === '' ? true : false}/>
					<Input label={'Email Address'} type='email' placeholder={'alexei@mail.com'} value={email} updating={setEmail} error={email === '' ? true : false} />
					<Input label={'Phone Number'} type={'number'} placeholder={'+1 202-555-0136'} value={phoneNumber} updating={setPhoneNumber}/>
				</FormSection>
				<FormSection heading={'SHIPPING INFORMATION'}>
					<Input label={'Your Address'} placeholder={'1137 Williams Avenue'} value={address} updating={setAddress} error={address === '' ? true : false}/>
					<Input label={'City'} placeholder={'New York'} value={city} updating={setCity} error={city === '' ? true : false}/>
					<Input label={'ZIP Code'} type={'number'} placeholder={'10001'} value={zipCode} updating={setZipCode} error={zipCode === '' ? true : false}/>
					<Input label={'Country'} placeholder={'United States'} value={country} updating={setCountry} error={country === '' ? true : false}/>
				</FormSection>
				<FormSection heading={'PAYMENT DETAILS'}>
					<div id="payment_method">
						<label htmlFor="">Payment Method</label>
						<div className="select" onClick={() => setPaymentMethod('e-Money')}>
							<div className="dot">
								{paymentMethod === 'e-Money' ? <span/> : null}
							</div>
							<h2>e-Money</h2>
						</div>
						<div className="select" onClick={() => setPaymentMethod('Cash on Delivery')}>
							<div className="dot">
								{paymentMethod === 'Cash on Delivery' ? <span/> : null}
							</div>
							<h2>Cash on Delivery</h2>
						</div>
					</div>
					{paymentMethod === 'e-Money' ?
				 	<>
				 		<Input label={'e-Money Number'} type={'number'} placeholder={238521993} value={eMoneyNumber} updating={setEmoneyNumber} error={eMoneyNumber === '' ? true : false}/>
						<Input label={'e-Money PIN'} type={'number'} placeholder={6891} value={eMoneyPIN} updating={setEMoneyPIN} error={eMoneyPIN === '' ? true : false}/>
				 	</> : 
					<div id="cash">
						<img src={cash} alt="cash on delivery icon" />
						<p>The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
					</div>}
				</FormSection>
			</section>
			<section id="summary">
				<h2>SUMMARY</h2>
				{cartItems.map((elem, index) => (
					<CartItem key={index} product={elem.product} image={elem.image} price={elem.price} ammount={elem.ammount} cart={true} />
				))}
				<div id="total">
					<ul>
						<li>TOTAL</li>
						<li>SHIPPING</li>
						<li>VAT (INCLUDED)</li>
						<li>GRAND TOTAL</li>
					</ul>
					<ul>
						<li>$ {totalPrice.toLocaleString()}</li>
						<li>$ 50</li>
						<li>$ {(totalPrice/5).toLocaleString()}</li>
						<li>$ {(totalPrice + 50 + (totalPrice/5)).toLocaleString()}</li>
					</ul>
				</div>
				<button onClick={buying}>CONTINUE & PAY</button>
			</section>
		</>
	)
}

export default Checkout