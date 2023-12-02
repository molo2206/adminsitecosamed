import { Card, Col, Row } from 'react-bootstrap'
import { Form } from 'reactstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import useCountry from '@/hooks/useCountry'
import CustomInput from '@/components/form/CustomInput'
import ChangeStatus from '@/components/form/ChangeStatus'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import CustomButton from '@/components/form/CustomButton'
import useAsync from '@/hooks/useAsync'
import CountryServices from '@/services/CountryServices'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const ListCountries = () => {
	const { createCountry, loading: loadingForm } = useCountry()
	const { handleUpdate, handleDelete, isEdit, selected, isOpen, toggleModal, closeModal } =
		useAuthContext()
	const { data, loading } = useAsync(() => CountryServices.getCountry())
	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			name: isEdit ? selected?.name : '',
			code: isEdit ? selected?.code : '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Name is required'),
			code: Yup.string().required('Country code is required'),
		}),
		onSubmit: (values) => {
			createCountry(values)
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

	return (
		<>
			<PageBreadcrumb title="Countries" subName="Countries" />
			<MainModal size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? 'Update' : 'Create'} Country`}>
				<Form
					className="form-horizontal"
					onSubmit={(e) => {
						e.preventDefault()
						validation.handleSubmit()
						return false
					}}>
					<CustomInput multiple={undefined}
					accept={undefined}
					onChangeCapture={undefined}
					onFocus={undefined}
						name="name"
						label={'Country Name'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.name || ''}
						invalid={
							validation.touched.name && validation.errors.name ? true : false
						}
						errors={validation.errors.name}
					/>
					<CustomInput multiple={undefined}
								accept={undefined}
								onChangeCapture={undefined}
								onFocus={undefined}
						name="code"
						label={'Country Code'}
						placeholder=""
						type="text"
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.code || ''}
						invalid={
							validation.touched.code && validation.errors.code ? true : false
						}
						errors={validation.errors.code}
					/>

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
							<h4 className="header-title">Countries</h4>
							<Button
								onClick={toggleModal}
								style={{
									marginRight: 20,
								}}
								variant={'outline-primary'}>
								Add Country
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

export default ListCountries
