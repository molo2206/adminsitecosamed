import { Card, Col, Row } from 'react-bootstrap'
import { Form } from 'reactstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import { useEffect } from 'react'
import CustomInput from '@/components/form/CustomInput'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import { FormInput } from '@/components'
import CategoryServices from '@/services/CategoryServices'
import useMedia from '@/hooks/useMedia'
import { showingTranslateValue } from '@/utils/heleprs'
import MediaServices from '@/services/MediaServices'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/form/CustomButton'
import useAsync from '@/hooks/useAsync'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import useValidation from '@/hooks/useValidation'

const ListPhoto = () => {
	const { data: categories } = useAsync(() =>
		CategoryServices.getCategoryType('Media')
	)
	const { createMedia, loading: loadingForm } = useMedia()
	const { t } = useTranslation()
	const {
		isEdit,
		isOpen,
		toggleModal,
		closeModal,
		countries,
		selected,
		imageUrl,
		setImageUrl,
		handleUpdate,
		lang,
	} = useAuthContext()
	const { data, loading } = useAsync(() => MediaServices.getMedia('photo'))

	const { inputs, errors, setInputs, handleOnChange, hanldeError } =
		useValidation({
			country_id: '',
			city_id: '',
			category_id: '',
			image: [],
			type: 'photo',
		})

	const validation = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!inputs.country_id) {
			hanldeError('Country us is required', 'country_id')
			valide = false
		}
		if (!inputs.category_id) {
			hanldeError('Category is required', 'category_id')
			valide = false
		}
		if (!isEdit) {
			if (inputs.image?.length === 0) {
				hanldeError('Image is required', 'image')
				valide = false
			} else if (inputs.image.length > 5) {
				hanldeError('Image length 5', 'image')
				valide = false
			}
		}

		if (valide) {
			createMedia(inputs)
		}
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
			Header: 'Image',
			accessor: 'cover',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }: any) => (
				<img className="avatar avatar-sm" src={cell?.row?.original?.cover} />
			),
		},
		{
			Header: 'Type',
			accessor: 'type',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
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

						<Button variant={'outline-danger'}>Delete</Button>
					</Col>
				</Row>
			),
		},
	]

	useEffect(() => {
		if (isEdit) {
			setInputs({
				country_id: selected?.country_id,
				city_id: selected?.city_id,
				category_id: selected?.category_id,
				image: [],
				type: 'photo',
			})
			setImageUrl(selected?.cover)
		}
	}, [isEdit])

	return (
		<>
			<PageBreadcrumb title="Photos" subName="Photos" />
			<MainModal
				size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? t('Update') : t('Create')} ${t('Photo')}`}>
				<Form className="form-horizontal" onSubmit={validation}>
					<FormInput
						invalid={undefined}
						name="select"
						style={{
							height: 50,
						}}
						label="Select Country"
						type="select"
						containerClass="mb-3"
						className="form-select"
						value={inputs.country_id}
						onChange={(e: any) => {
							e.preventDefault()
							hanldeError(null, 'country_id')
							handleOnChange(e.target.value, 'country_id')
						}}
						key="select"
						errors={errors.country_id}>
						<option defaultValue="selected">...</option>
						{countries?.map((item: any) => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
					</FormInput>
					<FormInput
						invalid={undefined}
						name="select"
						style={{
							height: 50,
						}}
						label="Select City"
						type="select"
						containerClass="mb-3"
						className="form-select"
						value={inputs.city_id}
						onChange={(e: any) => {
							e.preventDefault()
							handleOnChange(e.target.value, 'city_id')
						}}
						key="select"
						errors={'Samuel'}>
						<option defaultValue="selected">...</option>
						{countries
							?.find((item: any) => item?.id === inputs?.country_id)
							?.city?.map((item: any) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
					</FormInput>
					<FormInput
						invalid={undefined}
						name="select"
						style={{
							height: 50,
						}}
						label="Select Category"
						type="select"
						containerClass="mb-3"
						className="form-select"
						value={inputs.category_id}
						onChange={(e: any) => {
							hanldeError(null, 'category_id')
							handleOnChange(e.target.value, 'category_id')
						}}
						key="select"
						errors={errors.country_id}>
						<option defaultValue="selected">...</option>
						{categories?.map((item: any) => (
							<option key={item.id} value={item.id}>
								{showingTranslateValue(item?.translations, lang)?.name}
							</option>
						))}
					</FormInput>

					<CustomInput
						invalid={undefined}
						accept={undefined}
						name="image"
						label={t('Cover')}
						placeholder=""
						type="file"
						multiple={true}
						className="form-control"
						errors={errors.image}
						onFocus={() => {
							hanldeError(null, 'image')
						}}
						onChangeCapture={(e: any) => {
							hanldeError(null, 'image')
							handleOnChange(e.target.files, 'image')
						}}
					/>
					<div className="mb-2">
						{isEdit && <img src={imageUrl} className="avatar avatar-sm" />}
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
							<h4 className="header-title">{t('Photos')}</h4>
							<Button
								onClick={toggleModal}
								style={{
									marginRight: 20,
								}}
								variant={'outline-primary'}>
								Add Photo
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

export default ListPhoto
