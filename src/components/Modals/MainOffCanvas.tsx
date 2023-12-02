import { Offcanvas as BootstrapOffcanvas } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '@/common'
import { FormInput } from '..'
interface props {
	show?: boolean
	close?: boolean
	title: string
	children: any
}
const MainOffCanvas = ({ show, close, children, title }: props) => {
	const { languages, pageLang, changePageLang } = useAuthContext()
	const methods = useForm({
		defaultValues: {
			password: 'password',
			statictext: 'email@example.com',
			color: '#727cf5',
		},
	})
	const {
		register,
		control,
		formState: { errors },
	} = methods
	return (
		<BootstrapOffcanvas
			style={{
				width: '100%',
			}}
			className="modal-large-off"
			show={show}
			onHide={close}
			placement="end">
			<BootstrapOffcanvas.Header
				className="justify-content-between d-flex w-100"
				closeButton>
				<BootstrapOffcanvas.Title as="h6">{title}</BootstrapOffcanvas.Title>
				<FormInput
					invalid={undefined}
					name="select"
					type="select"
					className="form-select"
					register={register}
					key="select"
					onChange={(e) => changePageLang(e.target.value)}
					errors={errors}
					value={pageLang}
					control={control}>
					<option defaultValue="selected">...</option>
					{languages?.map((item: any, index: any) => (
						<option key={index} value={item.iso}>
							{item.name}
						</option>
					))}
				</FormInput>
			</BootstrapOffcanvas.Header>
			<BootstrapOffcanvas.Body>{children}</BootstrapOffcanvas.Body>
		</BootstrapOffcanvas>
	)
}

export default MainOffCanvas
