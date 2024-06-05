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
import useValidation from '@/hooks/useValidation'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/form/CustomButton'
import useTestimonials from '@/hooks/useTestimonials'
import useAsync from '@/hooks/useAsync'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'

const ListBooks = () => {
	const { saveBook, loading: loadingForm } = useTestimonials()
	const { t } = useTranslation()
	const {
		handleUpdate,
		handleDelete,
		isEdit,
		selected,
		isOpen,
		toggleModal,
		closeModal,
		imageUrl,
		setImageUrl,
	} = useAuthContext()
	const { data, loading } = useAsync(() => TeamServices.getAdminBooks())
	const imageRef = useRef<any>()

	const columns: ReadonlyArray<Column> = [
		{
			Header: 'ID',
			accessor: 'id',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Cover',
			accessor: 'image',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }: any) => (
				<img className="avatar avatar-sm" src={cell?.row?.original?.image} />
			),
		},
		{
			Header: 'Title',
			accessor: 'title',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Price',
			accessor: 'price',
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

	const { inputs, errors, setInputs, handleOnChange, hanldeError } =
		useValidation({
			title: '',
			description: '',
			file: '',
			price: '',
			image: '',
		})

	useEffect(() => {
		if (isEdit) {
			setInputs({
				title: selected?.title,
				description: selected?.description,
				file: '',
				price: selected?.price,
				image: '',
			})
			setImageUrl(selected?.image)
		}
	}, [isEdit])

	const pickImage = () => {
		imageRef.current.click()
	}

	const onChangeImage = (e: any) => {
		handleOnChange(e.target.files[0], 'image')
		setImageUrl(URL.createObjectURL(e.target.files[0]))
	}

	const validation = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!inputs.title) {
			hanldeError('Title is required', 'title')
			valide = false
		}
		if (!inputs.description) {
			hanldeError('Description is required', 'description')
			valide = false
		}

		if (!isEdit) {
			if (!inputs.image) {
				hanldeError('Cover is required', 'image')
				valide = false
			} else {
				const MAX_FILE_SIZE = 5120 // 5MB
				const fileSizeKiloBytes = inputs?.image?.size / 1024
				if (fileSizeKiloBytes > MAX_FILE_SIZE) {
					hanldeError('Cover image is too big (max 5 mb) ', 'image')
					valide = false
				}
			}
			if (!inputs.file) {
				hanldeError('File is required', 'file')
				valide = false
			}
		}

		if (valide) {
			saveBook(inputs)
		}
	}
	return (
		<>
			<PageBreadcrumb title="Raports" subName="Raports" />
			<MainModal
				size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? t('Update') : t('Create')} ${t('Book')}`}>
				<Form className="form-horizontal" onSubmit={validation}>
					<div className="mt-2 mb-4 d-flex justify-content-center align-items-center">
						<span
							className="d-block text-center relative justify-content-center align-items-center"
							onClick={pickImage}
							role="button">
							<img
								src={
									imageUrl
										? imageUrl
										: 'https://cdn-icons-png.flaticon.com/256/9441/9441493.png'
								}
								className="avatar avatar-lg"
							/>
							<br />
							<span className="text-center">Cover</span><br/>
							{errors?.image && <small className='text-danger'>{errors?.image}</small>}
						</span>

						<input
							type="file"
							accept="image/*"
							onChange={onChangeImage}
							ref={imageRef}
							className="d-none"
						/>
					</div>

					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="title"
						label={t('Title')}
						placeholder=""
						type="text"
						className="form-control"
						errors={errors.title}
						value={inputs.title}
						onFocus={() => {
							hanldeError(null, 'title')
						}}
						onChange={(e: any) => handleOnChange(e.target.value, 'title')}
					/>
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="title"
						label={t('Description')}
						placeholder=""
						type="textarea"
						className="form-control"
						errors={errors.description}
						value={inputs.description}
						onFocus={() => {
							hanldeError(null, 'description')
						}}
						onChange={(e: any) => handleOnChange(e.target.value, 'description')}
					/>
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="title"
						label={`${t('Price')} Dollar US`}
						placeholder=""
						type="number"
						className="form-control"
						errors={errors.price}
						value={inputs.price}
						onFocus={() => {
							hanldeError(null, 'price')
						}}
						onChange={(e: any) => handleOnChange(e.target.value, 'price')}
					/>
					<CustomInput
						multiple={undefined}
						invalid={undefined}
						accept={undefined}
						name="file"
						label={t('Pdf File')}
						placeholder=""
						type="file"
						className="form-control"
						errors={errors.file}
						onFocus={() => {
							hanldeError(null, 'file')
						}}
						onChangeCapture={(e: any) =>
							handleOnChange(e.target.files[0], 'file')
						}
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
							<h4 className="header-title">{t('Raport')}</h4>
							<Button
								onClick={toggleModal}
								style={{
									marginRight: 20,
								}}
								variant={'outline-primary'}>
								Add Raport
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

export default ListBooks
