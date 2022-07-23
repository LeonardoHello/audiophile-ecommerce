import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ZX9 from "../images/home/mobile/image-speaker-zx9.png";
import ZX9Desktop from "../images/home/desktop/image-speaker-zx9.png";
import ear from "../images/home/mobile/image-earphones-yx1.jpg";
import headset from "../images/home/mobile/image-hero.jpg";
import UserContext from "../Context";

const Home = () => {
	const {width} = useContext(UserContext);

	useEffect(() => {
		window.scroll('top', 'top');
		const intersectionObserver = new IntersectionObserver(entries => {
			entries.forEach(elem => {
				if (elem.isIntersecting === true) {
					elem.target.classList.remove('hide');
				}
			});
		}, {
			threshold: .33
		});

		[document.querySelector('.about_us > img'), ...document.querySelectorAll('.about_us > div > *'), ...document.querySelectorAll('#products > *:not(#products > div:last-of-type)'), ...document.querySelectorAll('#products > div:last-of-type > *')].forEach(elem => elem.classList.add('hide'));
		[document.querySelector('.about_us > img'), ...document.querySelectorAll('.about_us > div > *'), ...document.querySelectorAll('#products > *:not(#products > div:last-of-type)'), ...document.querySelectorAll('#products > div:last-of-type > *')].forEach(elem => intersectionObserver.observe(elem));

		if (document.querySelector('main').classList.contains('ProductInformation_main_styling')) {
			document.querySelector('main').classList.replace('ProductInformation_main_styling', 'Home_main_styling');
		} else if (document.querySelector('main').classList.contains('ProductCategory_main_styling')) {
			document.querySelector('main').classList.replace('ProductCategory_main_styling', 'Home_main_styling');
		} else if (document.querySelector('main').classList.contains('Checkout_main_styling')) {
			document.querySelector('main').classList.replace('Checkout_main_styling', 'Home_main_styling');
		} else {
			document.querySelector('main').classList.add('Home_main_styling');
		};
	}, [])

	return (
		<>
			<section id="new_product">
				{width < 800 ?
				<>
					<img id="headset" src={headset} alt="headset" />
					<h2>NEW PRODUCT</h2>
					<h1>XX99 MARK II HEADPHONES</h1>
					<p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
					<Link to={'/headphones/xx99-mark-ii'}><button>SEE PRODUCT</button></Link>
				</> : 
				<div>
					<img id="headset" src={headset} alt="headset" />
					<h2>NEW PRODUCT</h2>
					<h1>XX99 MARK II HEADPHONES</h1>
					<p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
					<Link to={'/headphones/xx99-mark-ii'}><button>SEE PRODUCT</button></Link>
				</div>}
			</section>
			<section id="products">
				<div>
					<img src={width < 800 ? ZX9 : ZX9Desktop} alt="speaker" />
					<div>
						<h1>ZX9 SPEAKER</h1>
						<p>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
						<Link to={'/speakers/zx9'}><button>SEE PRODUCT</button></Link>
					</div>
				</div>
				<div>
					<h1>ZX7 SPEAKER</h1>
					<Link to={'/speakers/zx7'}><button>SEE PRODUCT</button></Link>
				</div>
				<div>
					<img src={ear} alt="" />
					<div>
						<h1>YX1 EARPHONES</h1>
						<Link to={'/earphones/yx1-wireless'}><button>SEE PRODUCT</button></Link>
					</div>
				</div>
			</section>
		</>
	)
}

export default Home