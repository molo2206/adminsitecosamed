import { Card, Col, Row } from 'react-bootstrap'
import { Form } from 'reactstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import {useEffect} from 'react'
import useCategory from '@/hooks/useCategory'
import CustomInput from '@/components/form/CustomInput'
import { FormInput } from '@/components'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import ChangeStatus from '@/components/form/ChangeStatus'
import CategoryServices from '@/services/CategoryServices'
import { useForm } from 'react-hook-form'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import { useTranslation } from "react-i18next";
import CustomButton from '@/components/form/CustomButton'
import useAsync from '@/hooks/useAsync'
import { Typeahead } from 'react-bootstrap-typeahead'
import { showingTranslateValue } from '@/utils/heleprs'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const ListCategory = () => {
	const { createCategory, loading: loadingForm } = useCategory()
	const {t} = useTranslation()
	const {
		handleUpdate,
		handleDelete,
		isEdit,
		selected,
		isOpen,
		lang,
		setSelectedType,
		selectedType,
		toggleModal,
		closeModal,
		languages,
		pageLang,
		changePageLang,
	} = useAuthContext()
	const { data, loading } = useAsync(() => CategoryServices.getCategories())
	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			name: isEdit ? showingTranslateValue(selected?.translations, pageLang)?.name : '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('name is required'),
		}),
		onSubmit: (values) => {
			createCategory(values)
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
			Header: 'Name',
			accessor: 'name',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }:any) => (
				<span>
					{showingTranslateValue(cell?.row?.original?.translations, lang)?.name}
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

						<Button onClick={() => handleDelete(cell?.row?.original)} variant={'outline-danger'}>Delete</Button>
					</Col>
				</Row>
			),
		},
	]

	const onChangeSingleSelection = (selected: any) => {
		setSelectedType(selected)
	}

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
		if(isEdit){
			setSelectedType(JSON.parse(selected?.types)?.map((item:any) => ({
				label:item,
				value:item
			})))
		}
	}, [isEdit])
	return (
		<>
			<PageBreadcrumb title="Categories" subName="Categories" />
			<MainModal size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? t('Update') : t('Create')} ${t('Category')}`}>
				<Form
					className="form-horizontal"
					onSubmit={(e) => {
						e.preventDefault()
						validation.handleSubmit()
						return false
					}}>
					<FormInput
						name="select"
						label="Select database Language"
						type="select"
						containerClass="mb-3"
						className="form-select"
						register={register}
						key="select"
						invalid={undefined}
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
						name="name"
						accept={undefined}
						onChangeCapture={undefined}
						label={'Category Name'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.name || ''}
						invalid={undefined}
						errors={validation.errors.name}
					/>
					<div className="mb-1">
						<label className="form-label">Type</label>
						<Typeahead
							id="the-basics"
							labelKey={'label'}
						
							multiple
							onChange={onChangeSingleSelection}
							options={[
								{
									value: 'Media',
									label: 'Media',
								},
								{
									value: 'Event',
									label: 'Event',
								},
								{
									value: 'Blog',
									label: 'Blog',
								},
							]}
							selected={selectedType}
						/>
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
							<h4 className="header-title">{t('Categories')}</h4>
							<Button
								onClick={toggleModal}
								style={{
									marginRight: 20,
								}}
								variant={'outline-primary'}>
								Add Category
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

export default ListCategory
