import { useContext } from "react";
import UserContext from "../Context";

const Product = ({ images, name, about, children, display, newProduct, styling }) => {
	const {width} = useContext(UserContext);

	return (
		<section className="product">
			<p className="go_back" style={{display: `${display === true ? 'unset' : 'none'}`}} onClick={() => window.history.back()}>Go Back</p>
			<div>
				<img src={images[0]} alt={name}/>
				<div style={{alignItems: styling || width > 799 ? 'flex-start' : 'center', textAlign: styling || width > 799 ? 'left' : 'center'}}>
					<h2 style={{display: newProduct === true ? 'unset' : 'none'}}>NEW PRODUCT</h2>
					<h1>{name.toUpperCase()}</h1>
					<p>{about}</p>
					{children}
				</div>
			</div>
		</section>
	)
}

export default Product