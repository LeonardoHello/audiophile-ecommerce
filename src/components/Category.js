import { Link } from "react-router-dom";
import arrow from "../images/shared/desktop/icon-arrow-right.svg";

const Category = ({ category, image, clicked }) => {
	return (
		<div className="category">
			<img src={image} alt="" />
			<h2>{category.toUpperCase()}</h2>
			<Link to={`/${category}`}>
				<div id="arrow" onClick={clicked}>
					<p>SHOP</p>
					<img src={arrow} alt="right arrow" />
				</div>
			</Link>
		</div>
	)
}

export default Category