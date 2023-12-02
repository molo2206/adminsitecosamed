import { Form } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import ReactQuill from 'react-quill'
interface Props {
	value: any
	onFocus: any
	onChange: any
	error: any
	label: string
}
const CustomEditor = ({ value, onFocus, onChange, error, label }: Props) => {
	const modules = {
		toolbar: [
			[{ font: [] }, { size: [] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ color: [] }, { background: [] }],
			[{ script: 'super' }, { script: 'sub' }],
			[{ header: [false, 1, 2, 3, 4, 5, 6] }, 'blockquote', 'code-block'],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' },
			],
			['direction', { align: [] }],
			['link'],
			['clean'],
		],
	}
	return (
		<div className="mb-2">
			<Form.Label>{label}</Form.Label>
			<ReactQuill
				modules={modules}
				theme="snow"
				style={{ height: 340 }}
				className="pb-4"
				value={value}
				onFocus={onFocus}
				onChange={onChange}
			/>
			{error ? (
				<Form.Control.Feedback type="invalid" className="d-block">
					{error}
				</Form.Control.Feedback>
			) : null}
		</div>
	)
}

export default CustomEditor
