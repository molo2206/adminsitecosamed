import { Card, Col, Row } from 'react-bootstrap'
import { Form } from 'reactstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import { useEffect, useRef } from 'react'
import CustomInput from '@/components/form/CustomInput'
import { FormInput } from '@/components'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import ChangeStatus from '@/components/form/ChangeStatus'
import TeamServices from '@/services/TeamServices'
import { useForm } from 'react-hook-form'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/form/CustomButton'
import useTestimonials from '@/hooks/useTestimonials'
import useAsync from '@/hooks/useAsync'
import { showingTranslateValue } from '@/utils/heleprs'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const ListTestimonials = () => {
	const { saveData, loading: loadingForm } = useTestimonials()
	const { t } = useTranslation()
	const {
		handleUpdate,
		handleDelete,
		isEdit,
		selected,
		isOpen,
		lang,
		toggleModal,
		closeModal,
		languages,
		pageLang,
		changePageLang,
		setImage,
		imageUrl,
		setImageUrl,
	} = useAuthContext()
	const { data, loading } = useAsync(() => TeamServices.getTestimonials())
	const imageRef = useRef<any>()

	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			name: isEdit ? selected?.name : '',
			fonction: isEdit ? showingTranslateValue(selected?.translations, pageLang)?.fonction : '',
			message: isEdit ? showingTranslateValue(selected?.translations, pageLang)?.message : '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Name is required'),
			message: Yup.string().required('Message is required')
		}),
		onSubmit: (values) => {
			saveData(values)
		},
	})

	const columns: ReadonlyArray<Column> = [
		{
			Header: 'ID',
			accessor: 'id',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Image',
			accessor: 'image',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }:any) => (
				<img className="avatar avatar-sm" src={cell?.row?.original?.image} />
			),
		},
		{
			Header: 'Name',
			accessor: 'name',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Message',
			accessor: 'email',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }:any) => (
				<span>
					{
						showingTranslateValue(cell?.row?.original?.translations, lang)
							?.message
					}
				</span>
			),
		},
		{
			Header: 'Fonction',
			accessor: 'fonction',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }:any) => (
				<span>
					{
						showingTranslateValue(cell?.row?.original?.translations, lang)
							?.fonction
					}
				</span>
			),
		},
		{
			Header: 'Status',
			accessor: 'status',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }:any) => (
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
			Cell: ({ cell }:any) => (
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

						<Button onClick={() => handleDelete(cell?.row?.original)} variant={'outline-danger'}>Delete</Button>
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

	useEffect(() => {
		if (isEdit) {
			// setSelectedType(
			// 	JSON.parse(selected?.liens_sociaux)?.map((item: any) => ({
			// 		label: item,
			// 		value: item,
			// 	}))
			// )
			setImageUrl(selected?.image)
		}
	}, [isEdit])

	const pickImage = () => {
		imageRef.current.click()
	}

	const onChangeImage = (e: any) => {
		setImage(e.target.files[0])
		setImageUrl(URL.createObjectURL(e.target.files[0]))
	}
	return (
		<>
			<PageBreadcrumb title="Testimonials" subName="Testimonials" />
			<MainModal size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? t('Update') : t('Create')} ${t('Testimonial')}`}>
				<Form
					className="form-horizontal"
					onSubmit={(e) => {
						e.preventDefault()
						validation.handleSubmit()
						return false
					}}>
					<div className="mt-2 mb-4 d-flex justify-content-center align-items-center">
						<span
							className="d-block relative"
							onClick={pickImage}
							role="button">
							<img
								src={
									imageUrl
										? imageUrl
										: 'https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg'
								}
								className="avatar avatar-lg"
							/>
						</span>

						<input
							type="file"
							accept="image/*"
							onChange={onChangeImage}
							ref={imageRef}
							className="d-none"
						/>
					</div>
					<FormInput
					invalid={undefined}
						name="select"
						label="Select Role"
						type="select"
						containerClass="mb-3"
						className="form-select"
						register={register}
						key="select"
						onChange={(e) => changePageLang(e.target.value)}
						errors={errors}
						value={pageLang}
						control={control}>
						<option defaultValue="selected">...</option>
						{languages?.map((item:any, index:any) => (
							<option key={index} value={item.iso}>
								{item.name}
							</option>
						))}
					</FormInput>
					<CustomInput multiple={undefined}
						onFocus={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="name"
						label={'name'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.name || ''}
						invalid={
							validation.touched.name && validation.errors.name
								? true
								: false
						}
						errors={validation.errors.name}
					/>

					<CustomInput multiple={undefined}
						onFocus={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="fonction"
						label={'Fonction'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.fonction || ''}
						invalid={
							validation.touched.fonction && validation.errors.fonction ? true : false
						}
						errors={validation.errors.fonction}
					/>
					<CustomInput multiple={undefined}
						onFocus={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="message"
						label={'Message'}
						placeholder=""
						type="textarea"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.message || ''}
						invalid={
							validation.touched.message && validation.errors.message
								? true
								: false
						}
						errors={validation.errors.message}
					/>
			
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
							<h4 className="header-title">{t('Testimonials')}</h4>
							<Button
								onClick={toggleModal}
								style={{
									marginRight: 20,
								}}
								variant={'outline-primary'}>
								Add Testimonial
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

export default ListTestimonials
