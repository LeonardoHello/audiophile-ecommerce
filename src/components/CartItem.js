import { useContext } from "react";
import { db, doc, updateDoc, deleteDoc } from "../firebase";
import UserContext from "../Context";

const CartItem = ({ product, image, price, ammount, cart }) => {
	const {user} = useContext(UserContext)
	const singleProductPrice = price/ammount;
	const productName = product.split(' ');
	productName.pop()

	const add = async () => {
		await updateDoc(doc(db, 'users', user.uid, 'cart', product), {
			ammount: ammount+1,
			price: price+singleProductPrice
		});
	}

	const remove = async () => {
		if (ammount > 1) {
			await updateDoc(doc(db, 'users', user.uid, 'cart', product), {
				ammount: ammount-1,
				price: price-singleProductPrice
			});
		} else {
			await deleteDoc(doc(db, 'users', user.uid, 'cart', product));
		}
	}
	return (
		<div id="cart_item">
			<img src={image} alt={`${image} image`}/>
			<ul>
				<li>{productName.join(' ')}</li>
				<li>{`$ ${singleProductPrice.toLocaleString()}`}</li>
			</ul>
			{!cart ? 
				<menu>
					<li onClick={remove}>-</li>
					<li>{ammount}</li>
					<li onClick={add}>+</li>
				</menu> : 
				<p id="ammount">{`x${ammount}`}</p>}
		</div>
	)
}

export default CartItem