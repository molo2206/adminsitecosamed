import { Card, Col, Row } from 'react-bootstrap'
import { Form } from 'reactstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import { useEffect, useRef } from 'react'
import CustomInput from '@/components/form/CustomInput'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import ChangeStatus from '@/components/form/ChangeStatus'
import OffresServices from '@/services/OffresServices'
import useValidation from '@/hooks/useValidation'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/form/CustomButton'
import useOffres from '@/hooks/useOffres'
import useAsync from '@/hooks/useAsync'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import CustomEditor from '@/components/form/CustomEditor'

const Offres = () => {
	const { SaveOffre, loading: loadingForm } = useOffres()
	const { t } = useTranslation()
	const {
		handleUpdate,
		handleDelete,
		isEdit,
		selected,
		isOpen,
		toggleModal,
		closeModal,
		setImageUrl,
	} = useAuthContext()
	const { data, loading } = useAsync(() => OffresServices.getOffres())
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
			Header: 'Title',
			accessor: 'title',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Place',
			accessor: 'place',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},

		{
			Header: 'Start Date',
			accessor: 'startdate',
			maxWidth: 200,
			minWidth: 200,
			width: 200,
		},
		{
			Header: 'End Date',
			accessor: 'enddate',
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
			file: null,
			price: '',
			image: null,
			place: '',
			startdate: '',
			enddate: '',
			author: '',
			type: '',
			poste: '',
		})

	useEffect(() => {
		if (isEdit) {
			setInputs({
				title: selected?.title,
				description: selected?.description,
				file: '',
				price: selected?.price,
				image: '',
				place: selected?.place,
				startdate: selected?.startdate,
				enddate: selected?.enddate,
				author: selected?.author,
				poste: selected?.poste,
				type: selected?.type,
			})
			setImageUrl(selected?.image)
		}
	}, [isEdit])
	const inputRef = useRef(null)
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
		if (!inputs.type) {
			hanldeError('Type is required', 'type')
			valide = false
		}
		if (!inputs.poste) {
			hanldeError('Poste is required', 'poste')
			valide = false
		}

		if (!inputs.startdate) {
			hanldeError('Start date is required', 'startdate')
			valide = false
		}
		if (!inputs.enddate) {
			hanldeError('End date is required', 'enddate')
			valide = false
		}
		if (!inputs.place) {
			hanldeError('Place is required', 'place')
			valide = false
		}

		if (!isEdit) {
			if (!inputs.file) {
				hanldeError('File is required', 'file')
				valide = false
			} else {
				const MAX_FILE_SIZE = 5120 // 5MB
				const fileSizeKiloBytes = inputs?.file?.size / 1024
				if (fileSizeKiloBytes > MAX_FILE_SIZE) {
					hanldeError('File is too big (max 5 mb) ', 'file')
					valide = false
				}
			}
			if (!inputs.file) {
				hanldeError('File is required', 'file')
				valide = false
			}
			if (!inputs.image)
			{
				hanldeError('Price is required', 'image')
                valide = false
			}
		}

		if (valide) {
			SaveOffre(inputs), inputRef
		}
	}
	return (
		<>
			<PageBreadcrumb title="Offres d'emploi" subName="Offres" />
			<MainModal
				size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? t('Update') : t('Create')} ${t('Offres')}`}>
				<Form className="form-horizontal" onSubmit={validation}>
					<div className="mt-2 mb-4 d-flex justify-content-center align-items-center">
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
						name="poste"
						label="Poste"
						placeholder=""
						type="text"
						className="form-control"
						errors={errors.poste}
						value={inputs.poste}
						onFocus={() => {
							hanldeError(null, 'poste')
						}}
						onChange={(e: any) => handleOnChange(e.target.value, 'poste')}
					/>
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="type"
						label="Type"
						placeholder=""
						type="text"
						className="form-control"
						errors={errors.type}
						value={inputs.type}
						onFocus={() => {
							hanldeError(null, 'type')
						}}
						onChange={(e: any) => handleOnChange(e.target.value, 'type')}
					/>

					<CustomEditor
						label={t('Description')}
						error={errors.description}
						value={inputs.description}
						onFocus={() => {
							hanldeError(null, 'description')
						}}
						onChange={(text: any) => handleOnChange(text, 'description')}
					/>
					<br />
					<br />
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="place"
						label={t('Place')}
						placeholder=""
						type="text"
						className="form-control"
						errors={errors.place}
						value={inputs.place}
						onFocus={() => {
							hanldeError(null, 'place')
						}}
						onChange={(e: any) => handleOnChange(e.target.value, 'place')}
					/>
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="startdate"
						label={`${t('StartDate')}`}
						placeholder=""
						type="date"
						className="form-control"
						errors={errors.startdate}
						value={inputs.startdate}
						onFocus={() => {
							hanldeError(null, 'startdate')
						}}
						onChange={(e: any) => handleOnChange(e.target.value, 'startdate')}
					/>
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="enddate"
						label={`${t('EndDate')}`}
						placeholder=""
						type="date"
						className="form-control"
						errors={errors.enddate}
						value={inputs.enddate}
						onFocus={() => {
							hanldeError(null, 'enddate')
						}}
						onChange={(e: any) => handleOnChange(e.target.value, 'enddate')}
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
					<CustomInput
						multiple={undefined}
						invalid={undefined}
						accept={undefined}
						name="image"
						label={t('Image')}
						placeholder=""
						type="file"
						className="form-control"
						errors={errors.image}
						onFocus={() => {
							hanldeError(null, 'image')
						}}
						onChangeCapture={(e: any) =>
							handleOnChange(e.target.files[0], 'image')
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
							<h4 className="header-title">{t('Offres')}</h4>
							<Button
								onClick={toggleModal}
								style={{
									marginRight: 30,
								}}
								variant={'outline-primary'}>
								Add Offre
							</Button>
						</Card.Header>
						<Card.Body>
							<Table<Employee>
								columns={columns}
								data={data}
								pageSize={7}
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

export default Offres
