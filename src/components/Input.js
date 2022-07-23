const Input = ({ label, type, placeholder, error, value, updating }) => {
	return (
		<div className="input">
			<div style={{display: label === undefined ? 'none' : 'flex'}}>
				<label htmlFor={label !== undefined ? label.toLowerCase().split(' ').join('_') : null}>{label}</label>
				<p className={`error ${!error ? 'display_none' : ''}`}>Field cannot be empty</p>
			</div>
			<input id={label !== undefined ? label.toLowerCase().split(' ').join('_') : null} type={type || 'text'} placeholder={placeholder} value={value || ""} onInput={e => updating(e.currentTarget.value)} />
		</div>
	)
}

export default Input