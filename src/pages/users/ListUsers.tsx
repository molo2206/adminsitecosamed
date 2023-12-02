import { Card, Col, Row } from 'react-bootstrap'
import { Form } from 'reactstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import { useEffect } from 'react'
import useUsers from '@/hooks/useUsers'
import CustomInput from '@/components/form/CustomInput'
import ChangeStatus from '@/components/form/ChangeStatus'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import CustomButton from '@/components/form/CustomButton'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import useAsync from '@/hooks/useAsync'
import UserServices from '@/services/UserServices'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import RoleServices from '@/services/RoleServices'

const ListUsers = () => {
	const { createUser, loading: loadingForm } = useUsers()
	const {
		handleUpdate,
		isEdit,
		selected,
		selectedRole,
		setSelectedRole,
		isOpen,
		toggleModal,
		closeModal,
	} = useAuthContext()
	const { data, loading } = useAsync(() => UserServices.getUsers())
	const { data: roles } = useAsync(() =>
		RoleServices.getRole()
	)
	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			name: isEdit ? selected?.full_name : '',
			email: isEdit ? selected?.email : '',
			password: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('name is required'),
			email: Yup.string().required('email is required'),
		}),
		onSubmit: (values) => {
			createUser(values)
		},
	})
	useEffect(() => {
		if (isEdit) {
			setSelectedRole([
				{ value: selected?.role?.id, label: selected?.role?.name },
			])
		} else {
			setSelectedRole(null)
		}
	}, [isEdit, selected])

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

						{/* <Button variant={'outline-danger'}>Delete</Button> */}
					</Col>
				</Row>
			),
		},
	]

	const onChangeSingleSelection = (selected: any) => {
		setSelectedRole(selected)
	}

	return (
		<>
			<PageBreadcrumb title="Users" subName="Users" />
			<MainModal size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? 'Update' : 'Create'} User`}>
				<Form
					className="form-horizontal"
					onSubmit={(e) => {
						e.preventDefault()
						validation.handleSubmit()
						return false
					}}>
					<CustomInput multiple={undefined}
						onChangeCapture={undefined}
						accept={undefined}
						onFocus={undefined}
						name="name"
						label={'Full Name'}
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
							onChangeCapture={undefined}
							accept={undefined}
							onFocus={undefined}
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
					<div className="mb-1">
						<label className="form-label">Role</label>
						<Typeahead
							id="the-basics"
							labelKey={'label'}
							style={{ height: 50 }}
							multiple={false}
							onChange={onChangeSingleSelection}
							options={roles?.map((item: any) => ({
								value: item.id,
								label: item.name,
							}))}
							selected={selectedRole}
						/>
					</div>
					{isEdit && (
						<CustomInput multiple={undefined}
						onChangeCapture={undefined}
						accept={undefined}
						onFocus={undefined}
							name="password"
							label={'Password'}
							placeholder=""
							type="password"
							className="form-control"
							onChange={validation.handleChange}
							onBlur={validation.handleBlur}
							value={validation.values.password || ''}
							invalid={
								validation.touched.password && validation.errors.password
									? true
									: false
							}
							errors={validation.errors.password}
						/>
					)}

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
							<h4 className="header-title">Users</h4>
							<Button
								onClick={toggleModal}
								style={{
									marginRight: 20,
								}}
								variant={'outline-primary'}>
								Add user
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

export default ListUsers
