import { Input, Label } from 'reactstrap'
import { Form } from 'react-bootstrap'
import React from 'react'

interface InputProps {
	className?: string
	label?: any
	value?: any
	onBlur?: any
	onFocus: any
	onChange?: any
	invalid?: any
	errors: any
	ref?: any
	name: string
	type: any
	placeholder: string
	accept?: any
	onChangeCapture?: any
	multiple?: boolean
	disabled?: boolean // ✅ Ajouté pour supporter les inputs désactivés
}

const CustomInput: React.FC<InputProps> = ({
	className,
	label,
	value,
	onBlur,
	ref,
	onChange,
	invalid,
	errors,
	name,
	type,
	accept,
	placeholder,
	onChangeCapture,
	onFocus,
	multiple,
	disabled, // ✅ récupéré ici
	...props
}) => {
	return (
		<div className="mb-1">
			<Label className="form-label">{label}</Label>
			<Input
				name={name}
				placeholder={placeholder}
				type={type}
				className="form-control"
				id="validationCustom02"
				onChange={onChange}
				style={{ height: 50 }}
				ref={ref}
				multiple={multiple}
				accept={accept}
				onBlur={onBlur}
				value={value}
				invalid={invalid}
				onChangeCapture={onChangeCapture}
				onFocus={onFocus}
				disabled={disabled} // ✅ appliqué ici
				{...props}
			/>
			{errors ? (
				<Form.Control.Feedback type="invalid" className="d-block">
					{errors}
				</Form.Control.Feedback>
			) : null}
		</div>
	)
}

export default CustomInput
