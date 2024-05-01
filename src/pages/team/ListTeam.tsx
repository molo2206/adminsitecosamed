import { Card, Col, Row } from 'react-bootstrap'
import { Form } from 'reactstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import { useEffect, useRef } from 'react'
import CustomInput from '@/components/form/CustomInput'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import ChangeStatus from '@/components/form/ChangeStatus'
import TeamServices from '@/services/TeamServices'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/form/CustomButton'
import useTeam from '@/hooks/useTeam'
import useAsync from '@/hooks/useAsync'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const ListTeam = () => {
	const { createTeam, loading: loadingForm } = useTeam()
	const { t } = useTranslation()
	const {
		handleUpdate,
		handleDelete,
		isEdit,
		selected,
		isOpen,
		toggleModal,
		closeModal,
		setImage,
		imageUrl,
		setImageUrl,
	} = useAuthContext()
	const { data, loading } = useAsync(() => TeamServices.getTeam())
	const imageRef = useRef<any>()

	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			full_name: isEdit ? selected?.full_name : '',
			fonction: isEdit ? selected?.fonction : '',
			email: isEdit ? selected?.email : '',
			facebook: isEdit ? selected?.facebook : '',
			twitter: isEdit ? selected?.twitter : '',
			instagram: isEdit ? selected?.instagram : '',
			linkedin: isEdit ? selected?.linkedin : '',
		},

		validationSchema: Yup.object({
			full_name: Yup.string().required('Full Name is required'),
			fonction: Yup.string().required('Fonction is required'),
			email: Yup.string().required('email is required'),
			facebook: Yup.string().required('facebook is required'),
			twitter: Yup.string().required('twitter is required'),
			instagram: Yup.string().required('instagram is required'),
			linkedin: Yup.string().required('linkedin is required'),
		}),

		onSubmit: (values) => {
			createTeam(values)
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
			Cell: ({ cell }: any) => (
				<img className="avatar avatar-sm" src={cell?.row?.original?.image} />
			),
		},
		{
			Header: 'Full name',
			accessor: 'full_name',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Email',
			accessor: 'email',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Fonction',
			accessor: 'fonction',
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
			Cell: ({ cell }: any) => (
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

						<Button
							onClick={() => handleDelete(cell?.row?.original)}
							variant={'outline-danger'}>
							Delete
						</Button>
					</Col>
				</Row>
			),
		},
	]

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
			<PageBreadcrumb title="Team" subName="Team" />
			<MainModal
				size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? t('Update') : t('Create')} ${t('Person')}`}>
				<Form
					className="form-horizontal"
					onSubmit={(e) => {
						e.preventDefault()
						validation.handleSubmit()
						return false
					}}>
					<div className="mt-2 mx-auto d-flex justify-content-center align-items-center">
						<span
							className="d-block justify-content-center text-center align-items-center mx-auto relative"
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
							<br />
							<small className="text-center">(540 X 640)</small>
						</span>

						<input
							type="file"
							accept="image/*"
							onChange={onChangeImage}
							ref={imageRef}
							className="d-none"
						/>
					</div>
					<div className="mb-4 mx-auto"></div>

					<CustomInput
						multiple={undefined}
						onFocus={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="full_name"
						label={'Full Name'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.full_name || ''}
						invalid={
							validation.touched.full_name && validation.errors.full_name
								? true
								: false
						}
						errors={validation.errors.full_name}
					/>

					<CustomInput
						multiple={undefined}
						onFocus={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="email"
						label={'Email'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.email || ''}
						invalid={
							validation.touched.email && validation.errors.email ? true : false
						}
						errors={validation.errors.email}
					/>
					<CustomInput
						multiple={undefined}
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
							validation.touched.fonction && validation.errors.fonction
								? true
								: false
						}
						errors={validation.errors.fonction}
					/>
					<CustomInput
						multiple={undefined}
						onFocus={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="facebook"
						label={'Facebook'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.facebook || ''}
						invalid={
							validation.touched.facebook && validation.errors.facebook
								? true
								: false
						}
						errors={validation.errors.facebook}
					/>
					<CustomInput
						multiple={undefined}
						onFocus={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="instagram"
						label={'Instagram'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.instagram || ''}
						invalid={
							validation.touched.instagram && validation.errors.instagram
								? true
								: false
						}
						errors={validation.errors.instagram}
					/>
					<CustomInput
						multiple={undefined}
						onFocus={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="twitter"
						label={'Twitter'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.twitter || ''}
						invalid={
							validation.touched.twitter && validation.errors.twitter
								? true
								: false
						}
						errors={validation.errors.twitter}
					/>
					<CustomInput
						multiple={undefined}
						onFocus={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="linkedin"
						label={'Linkedin'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.linkedin || ''}
						invalid={
							validation.touched.linkedin && validation.errors.linkedin
								? true
								: false
						}
						errors={validation.errors.linkedin}
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
							<h4 className="header-title">{t('Team')}</h4>
							<Button
								onClick={toggleModal}
								style={{
									marginRight: 20,
								}}
								variant={'outline-primary'}>
								Add Person
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

export default ListTeam
