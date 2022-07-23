const CategoryHeading = ({ heading }) => {
	return (
		<div className="category_heading">
			<h1>{heading.toUpperCase()}</h1>
		</div>
	)
}

export default CategoryHeading