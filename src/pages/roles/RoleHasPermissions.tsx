import { Card, Col, Row, Form } from 'react-bootstrap'
import { Column } from 'react-table'
import { useState, useEffect } from 'react'
import { Employee } from '../ui/tables/types'
import useRole from '@/hooks/useRole'
import PermissionServices from '@/services/PermissionServices'
import useAsync from '@/hooks/useAsync'
import RoleServices from '@/services/RoleServices'
import { Button } from 'react-bootstrap'
import { useAuthContext } from '@/common'
import { Table } from '@/components'
import { PageBreadcrumb, FormInput } from '@/components'
import { useForm } from 'react-hook-form'

const RoleHasPermissions = () => {
	const { addPermissions, loading: loadingForm } = useRole()

	const { data, loading } = useAsync(() => RoleServices.getRole())
	const { data: ressources } = useAsync(() =>
		PermissionServices.get_resources()
	)
	const [permissions, setPermissions] = useState<any>([])
	const { selectedRole, setSelectedRole } = useAuthContext()
	// const [selectedPermissions, setSelectedPermissions] = useState<any>([])

	useEffect(() => {
		const res = ressources?.map((item: any) => {
			return {
				...item,
				create: selectedRole?.permissions?.find(
					({ name }: any) => name === item?.name
				)?.access?.create,
				read: selectedRole?.permissions?.find(
					({ name }: any) => name === item?.name
				)?.access?.read,
				update: selectedRole?.permissions?.find(
					({ name }: any) => name === item?.name
				)?.access?.update,
				delete: selectedRole?.permissions?.find(
					({ name }: any) => name === item?.name
				)?.access?.delete,
			}
		})
		// const sel = res?.filter(
		// 	(item: any) => item?.create || item?.update || item?.read || item?.delete
		// )

		setPermissions(res)
		//setSelectedPermissions(sel)
	}, [ressources, selectedRole])

	const handleChangeRole = (e: any) => {
		const obj = data.find(({ id }:any) => id === e.target.value)
		setSelectedRole(obj)
	}

	const handleChangeCheck = (value: any, access: any) => {
		const array = [...permissions]
		//const array2 = [...selectedPermissions]
		const find = array?.find((i) => i?.id === value.id)
		//const find2 = array2?.find((item) => item?.id === value?.id)
		if (find) {
			let objIndex = array.findIndex((obj) => obj.id === find.id)
			if (array[objIndex][access] === 1) {
				array[objIndex][access] = 0
			} else {
				array[objIndex][access] = 1
			}
		}
		setPermissions(array)
	}

	

	const columns: ReadonlyArray<Column> = [
		{
			Header: 'Ressouces',
			accessor: 'name',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'CREATE',
			accessor: 'create',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }:any) => (
				<Form.Check
					id="customCheck1"
					disabled={!selectedRole}
					onChange={() => handleChangeCheck(cell?.row?.original, 'create')}
					checked={cell?.row?.original?.create}
				/>
			),
		},
		{
			Header: 'READ',

			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }:any) => (
				<Form.Check
					id="customCheck1"
					onChange={() => handleChangeCheck(cell?.row?.original, 'read')}
					disabled={!selectedRole}
					checked={cell?.row?.original?.read}
				/>
			),
		},
		{
			Header: 'UPDATE',

			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }:any) => (
				<Form.Check
					id="customCheck1"
					onChange={() => handleChangeCheck(cell?.row?.original, 'update')}
					disabled={!selectedRole}
					checked={cell?.row?.original?.update}
				/>
			),
		},
		{
			Header: 'DELETE',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }:any) => (
				<Form.Check
					id="customCheck1"
					onChange={() => handleChangeCheck(cell?.row?.original, 'delete')}
					disabled={!selectedRole}
					checked={cell?.row?.original?.delete}
				/>
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
			<PageBreadcrumb title="Permissions" subName="Permissions" />

			<Row className="mt-10">
				<Col>
					<Card>
						{loading && (
							<div className="card-disabled">
								<div className="card-portlets-loader"></div>
							</div>
						)}
						{loadingForm && (
							<div className="card-disabled">
								<div className="card-portlets-loader"></div>
							</div>
						)}
						<Card.Header className="d-flex justify-content-between align-items-center">
							<div className="d-flex align-items-center">
								<FormInput
								invalid={undefined}
									name="select"
									label="Select Role"
									type="select"
									containerClass="mb-3"
									className="form-select"
									register={register}
									key="select"
									onChange={handleChangeRole}
									errors={errors}
									value={selectedRole?.id}
									control={control}
									>
									<option defaultValue="selected">...</option>
									{data?.map((item:any, index:any) => (
										<option key={index} value={item.id}>
											{item.name}
										</option>
									))}
								</FormInput>
							</div>
						</Card.Header>
						<Card.Body>
							<Table<Employee>
								columns={columns}
								data={permissions}
								pageSize={5}
							/>
							<Button
								disabled={!selectedRole}
								onClick={() => addPermissions(permissions)}
								variant={'outline-primary'}>
								Save Changes
							</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default RoleHasPermissions
