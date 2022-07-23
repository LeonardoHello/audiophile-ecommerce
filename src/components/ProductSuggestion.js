import { Link } from "react-router-dom";

const AnotherProduct = ({ image, name, path }) => {
	return (
		<div>
			<img src={image} alt={name}/>
			<h2>{name.toUpperCase()}</h2>
			<Link to={path}><button>SEE PRODUCT</button></Link>
		</div>
	)
}

export default AnotherProduct