import { Card, Col, Row } from 'react-bootstrap'
import { Form } from 'reactstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import { Link } from 'react-router-dom'
import useRole from '@/hooks/useRole'
import CustomInput from '@/components/form/CustomInput'
import ChangeStatus from '@/components/form/ChangeStatus'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import CustomButton from '@/components/form/CustomButton'
import useAsync from '@/hooks/useAsync'
import RoleServices from '@/services/RoleServices'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const ListRoles = () => {
	const { createRole, loading: loadingForm } = useRole()
	const { handleUpdate, handleDelete, isEdit, selected, isOpen, toggleModal, closeModal } =
		useAuthContext()
	const { data, loading } = useAsync(() => RoleServices.getRole())
	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			name: isEdit ? selected?.name : '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('name is required'),
		}),
		onSubmit: (values) => {
			createRole(values)
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

	return (
		<>
			<PageBreadcrumb title="Roles" subName="Roles" />
			<MainModal size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? 'Update' : 'Create'} a role`}>
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
						placeholder=""
						type="text"
						label={'Role name'}
						className="form-control"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.name || ''}
						invalid={
							validation.touched.name && validation.errors.name ? true : false
						}
						errors={validation.errors.name}
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
							<h4 className="header-title">Roles</h4>
							<div className="d-flex align-items-center">
								<Link
									to="/roles/permissions"
									style={{
										marginRight: 20,
									}}
									className={'btn btn-outline-primary'}>
									Role Has Permissions
								</Link>
								<Button
									onClick={toggleModal}
							
									variant={'outline-primary'}>
									Add Role
								</Button>
							</div>
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

export default ListRoles
