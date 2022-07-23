import { useContext } from "react";
import { Outlet } from "react-router-dom";
import man from "../images/shared/mobile/image-best-gear.jpg";
import manDesk from "../images/shared/desktop/image-best-gear.jpg";
import Category from './Category';
import text from "../text"
import UserContext from '../Context';

const AboutUs = () => {
	const {width} = useContext(UserContext)
	return (
		<>
			<Outlet/>
			<section id="categories">
				{Object.keys(text).map((elem, index) => <Category key={index} category={elem} image={text[elem].icon}/>)}
			</section>
			<section className="about_us">
				<img src={width < 800 ? man : manDesk} alt="man listening to music" />
				<div>
					<h1>BRINGING YOU THE <span>BEST</span> AUDIO GEAR</h1>
					<p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
				</div>
			</section>
		</>
	)
}

export default AboutUs