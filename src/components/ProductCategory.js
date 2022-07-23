import { useEffect } from "react"
import { Link } from "react-router-dom";
import CategoryHeading from "./CategoryHeading"
import Product from "./Product";
import text from "../text";

const ProductCategory = ({ category }) => {
	useEffect(() => {
		window.scroll('top', 'top');

		if (document.querySelector('main').classList.contains('ProductInformation_main_styling')) {
			document.querySelector('main').classList.replace('ProductInformation_main_styling', 'ProductCategory_main_styling');
		} else if (document.querySelector('main').classList.contains('Home_main_styling')) {
			document.querySelector('main').classList.replace('Home_main_styling', 'ProductCategory_main_styling');
		} else if (document.querySelector('main').classList.contains('Checkout_main_styling')) {
			document.querySelector('main').classList.replace('Checkout_main_styling', 'ProductCategory_main_styling');
		} else {
			document.querySelector('main').classList.add('ProductCategory_main_styling');
		};
	}, []);
	return (
		<>
			<CategoryHeading heading={category}/>
			{Object.keys(text[category].products).map((elem, index) => <Product key={index} images={text[category].products[elem].images} name={`${elem} ${category}`} newProduct={text[category].products[elem]['new product']} about={text[category].products[elem].about}>
				<Link to={elem.toLowerCase().split(' ').join('-')}><button>SEE PRODUCT</button></Link>
			</Product>)}
		</>
	)
}

export default ProductCategory