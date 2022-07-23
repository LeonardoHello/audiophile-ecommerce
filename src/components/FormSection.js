const FormSection = ({ heading, children }) => {
	return (
		<div>
			<h2>{heading}</h2>
			{children}
		</div>
	)
}

export default FormSection