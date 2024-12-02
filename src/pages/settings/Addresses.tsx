import { Card, Col, Row } from 'react-bootstrap'
import { Form } from 'reactstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import Adress from '@/hooks/Adress'
import { useState } from 'react'
import { FormInput } from '@/components'
import CustomInput from '@/components/form/CustomInput'
import ChangeStatus from '@/components/form/ChangeStatus'
import { useForm } from 'react-hook-form'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import CustomButton from '@/components/form/CustomButton'
import useAsync from '@/hooks/useAsync'
import AddressServices from '@/services/AddressServices'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const Addresses = () => {
	const { createAdress, loading: loadingForm } = Adress()
	const {
		handleUpdate,
		isEdit,
		selected,
		countries,
		isOpen,
		toggleModal,
		closeModal,
	} = useAuthContext()
	const [selectedEmails, setSelectedEmail] = useState([])
	const [selectedPhones, setSelectedPhones] = useState([])
	const { data, loading } = useAsync(() => AddressServices.getAddresses())

	const validationContry = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			country_id: isEdit ? selected?.country_id : '',
		},
		validationSchema: Yup.object({
			country_id: Yup.string().required('Country is required'),
		}),
		onSubmit: (values) => {
			createAdress(values)
		},
	})
	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			city: isEdit ? selected?.city : '',
			adresse: isEdit ? selected?.adresse : '',
		},
		validationSchema: Yup.object({
			city: Yup.string().required('City is required'),
			adresse: Yup.string().required('Address is required'),
		}),
		onSubmit: (values) => {
			createAdress(values)
		},
	})

	const validationEmail = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: {
			email: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().required('Email is required'),
		}),
		onSubmit: (values: any) => {
			const find = selectedEmails.find((item: any) => item === values.email)
			if (find) {
				const arr = selectedEmails.filter((item) => item !== values.email)
				setSelectedEmail(arr)
			} else {
				setSelectedEmail(selectedEmails.concat(values.email))
			}
		},
	})

	const validationPhone = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			phone: '',
		},
		validationSchema: Yup.object({
			phone: Yup.string().required('Phone is required'),
		}),
		onSubmit: (values: any) => {
			const find = selectedPhones.find((item: any) => item === values.phone)
			if (find) {
				const arr = selectedPhones.filter((item) => item !== values.phone)
				setSelectedPhones(arr)
			} else {
				setSelectedPhones(selectedPhones.concat(values.phone))
			}
		},
	})

	const removeItem = (index: any) => {
		const arr = [...selectedEmails]
		arr.splice(index, 1)
		setSelectedEmail(arr)
	}
	const removePhone = (index: any) => {
		const arr = [...selectedPhones]
		arr.splice(index, 1)
		setSelectedPhones(arr)
	}

	const columns: ReadonlyArray<Column> = [
		{
			Header: 'ID',
			accessor: 'id',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Country',
			accessor: 'name',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }: any) => (
				<span>{cell?.row?.original?.country?.name}</span>
			),
		},
		{
			Header: 'City',
			accessor: 'city',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Address',
			accessor: 'adresse',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Status',
			accessor: 'status',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }: any) => (
				<ChangeStatus
					status={cell?.row?.original?.status}
					id={cell?.row?.original?.id}
				/>
			),
		},

		{
			Header: 'Actions',
			accessor: 'actions',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }) => (
				<Row>
					<Col>
						<Button
							onClick={() => handleUpdate(cell?.row?.original)}
							style={{
								marginRight: 20,
							}}
							variant={'outline-primary'}>
							Edit
						</Button>

						<Button variant={'outline-danger'}>Delete</Button>
					</Col>
				</Row>
			),
		},
	]
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
		<>
			<PageBreadcrumb title="Our Addresses" subName="Our Addresses" />
			<MainModal
				size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? 'Update' : 'Create'} Address`}>
				<Form
					className="form-horizontal"
					onSubmit={(e) => {
						e.preventDefault()
						validation.handleSubmit()
						return false
					}}>
					<FormInput
						invalid={undefined}
						name="country_id"
						label="Country"
						type="select"
						containerClass="mb-3"
						className="form-select"
						register={register}
						key="select"
						onChange={validationContry.handleChange}
						onBlur={validationContry.handleBlur}
						//onChange={(e) => changePageLang(e.target.value)}
						errors={errors}
						style={{ height: 50 }}
						//value={pageLang}
						control={control}>
						<option defaultValue="selected">...</option>
						{countries?.map((item: any, index: any) => (
							<option key={index} value={item.id}>
								{item.name}
							</option>
						))}
					</FormInput>
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						onFocus={undefined}
						name="city"
						label={'City'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.city || ''}
						invalid={
							validation.touched.city && validation.errors.city ? true : false
						}
						errors={validation.errors.city}
					/>
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						onFocus={undefined}
						name="adresse"
						label={'Address'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.adresse || ''}
						invalid={
							validation.touched.adresse && validation.errors.adresse
								? true
								: false
						}
						errors={validation.errors.adresse}
					/>
					<div className="p-2 mb-2 border border-primary">
						<form
							onSubmit={(e) => {
								e.preventDefault()
								return false
							}}>
							<CustomInput
								multiple={undefined}
								accept={undefined}
								onChangeCapture={undefined}
								onFocus={undefined}
								name="email"
								label={'Email'}
								placeholder=""
								type="text"
								className="form-control"
								onChange={validationEmail.handleChange}
								onBlur={validationEmail.handleBlur}
								value={validationEmail.values.email || ''}
								invalid={
									validationEmail.touched.email && validationEmail.errors.email
										? true
										: false
								}
								errors={validationEmail.errors.email}
							/>
							<button
								onClick={(e) => {
									e.preventDefault()
									validationEmail.handleSubmit()
									return false
								}}
								type="button"
								className="btn btn-primary w-40 h-40">
								Add
							</button>

							<div className="mt-2 d-flex flex-wrap">
								{selectedEmails?.map((item: any, index: any) => (
									<div
										key={index}
										className="btn btn-primary mb-1 d-flex"
										style={{ marginRight: 5 }}>
										<span>{item}</span>
										<span
											role="button"
											className=""
											style={{
												width: 20,
												height: 20,
												borderRadius: 20,
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor: 'red',
												marginLeft: 10,
												display: 'flex',
											}}>
											<span
												onClick={() => removeItem(index)}
												style={{
													color: '#fff',
													fontSize: 10,
												}}>
												X
											</span>
										</span>
									</div>
								))}
							</div>
						</form>
					</div>
					<div className="p-2 mb-2 border border-primary">
						<form
							onSubmit={(e) => {
								e.preventDefault()
								return false
							}}>
							<CustomInput
								multiple={undefined}
								accept={undefined}
								onChangeCapture={undefined}
								onFocus={undefined}
								name="phone"
								label={'Phone'}
								placeholder=""
								type="text"
								className="form-control"
								onChange={validationPhone.handleChange}
								onBlur={validationPhone.handleBlur}
								value={validationPhone.values.phone || ''}
								invalid={
									validationPhone.touched.phone && validationPhone.errors.phone
										? true
										: false
								}
								errors={validationPhone.errors.phone}
							/>
							<button
								onClick={(e) => {
									e.preventDefault()
									validationPhone.handleSubmit()
									return false
								}}
								type="button"
								className="btn btn-primary w-40 h-40">
								Add
							</button>

							<div className="mt-2 d-flex flex-wrap">
								{selectedPhones?.map((item: any, index: any) => (
									<div
										key={index}
										className="btn btn-primary mb-1 d-flex"
										style={{ marginRight: 5 }}>
										<span>{item}</span>
										<span
											role="button"
											className=""
											style={{
												width: 20,
												height: 20,
												borderRadius: 20,
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor: 'red',
												marginLeft: 10,
												display: 'flex',
											}}>
											<span
												onClick={() => removePhone(index)}
												style={{
													color: '#fff',
													fontSize: 10,
												}}>
												X
											</span>
										</span>
									</div>
								))}
							</div>
						</form>
					</div>

					{/** button  */}
					<CustomButton
						loading={loadingForm}
						label={isEdit ? 'Update' : 'Save'}
					/>
				</Form>
			</MainModal>
			<Row className="mt-10">
				<Col>
					<Card>
						{loading && (
							<div className="card-disabled">
								<div className="card-portlets-loader"></div>
							</div>
						)}
						<Card.Header className="d-flex justify-content-between align-items-center">
							<h4 className="header-title">Addresses</h4>
							<Button
								onClick={toggleModal}
								style={{
									marginRight: 20,
								}}
								variant={'outline-primary'}>
								Add Address
							</Button>
						</Card.Header>
						<Card.Body>
							<Table<Employee>
								columns={columns}
								data={data}
								pageSize={5}
								pagination={true}
								isSearchable={true}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Addresses
