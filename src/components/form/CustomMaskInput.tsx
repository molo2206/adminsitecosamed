import { Label } from 'reactstrap'
import MaskedInput from 'react-text-mask-legacy'
import { Form } from 'react-bootstrap'

interface InputProps {
	label?: any
	value?: any
	onBlur?: any
	onChange?: any
	errors: any
	name: string
	placeholder: string
	accept: any
	style:any
	mask: any
}
const CustomMaskInput = ({
	label,
	value,
	onBlur,
	onChange,
	errors,
	name,
	accept,
	placeholder,
	mask,
	style
}: InputProps) => {
	return (
		<div className="mb-1">
			<Label className="form-label">{label}</Label>
			<MaskedInput
				mask={mask}
				name={name}
				placeholder={placeholder}
				className="form-control"
				id="validationCustom02"
				onChange={onChange}
				style={style}
				accept={accept}
				onBlur={onBlur}
				value={value}
			/>
			{errors ? (
				<Form.Control.Feedback type="invalid" className="d-block">
					{errors}
				</Form.Control.Feedback>
			) : null}
		</div>
	)
}

export default CustomMaskInput
