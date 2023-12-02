import { Card, Col, Row } from 'react-bootstrap'
import { Form } from 'reactstrap'
import { Column } from 'react-table'
import { useEffect } from 'react'
import { Employee } from '../ui/tables/types'
import useCountry from '@/hooks/useCountry'
import CustomInput from '@/components/form/CustomInput'
import { FormInput } from '@/components'
import useValidation from '@/hooks/useValidation'
import ChangeStatus from '@/components/form/ChangeStatus'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import CustomButton from '@/components/form/CustomButton'
import useAsync from '@/hooks/useAsync'
import CountryServices from '@/services/CountryServices'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'

const ListCities = () => {
	const { createCity, loading: loadingForm } = useCountry()
	const {
		handleUpdate,
		handleDelete,
		isEdit,
		selected,
		isOpen,
		countries,
		toggleModal,
		closeModal,
	} = useAuthContext()
	const { data, loading } = useAsync(() => CountryServices.getCity())

	const { inputs, errors, setInputs, handleOnChange, hanldeError } =
		useValidation({
			country_id: '',
			name: '',
		})

	const validation = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!inputs.country_id) {
			hanldeError('Country is required', 'country_id')
			valide = false
		}
		if (!inputs.name) {
			hanldeError('City name is required', 'name')
			valide = false
		}

		if (valide) {
			createCity(inputs)
		}
	}

	useEffect(() => {
		if (isEdit) {
			setInputs({
				country_id: selected?.country_id,
				name: selected?.name,
			})
		}
	}, [isEdit])

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
			Header: 'Country',
			accessor: 'country_id',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }: any) => (
				<span>{cell?.row?.original?.country?.name}</span>
			),
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

						<Button onClick={() => handleDelete(cell?.row?.original)} variant={'outline-danger'}>Delete</Button>
					</Col>
				</Row>
			),
		},
	]

	return (
		<>
			<PageBreadcrumb title="Cities" subName="Cities" />
			<MainModal
				size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? 'Update' : 'Create'} City`}>
				<Form className="form-horizontal" onSubmit={validation}>
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						onFocus={undefined}
						name="name"
						label={'City Name'}
						placeholder=""
						type="text"
						className="form-control"
						value={inputs.name}
						onChange={(e: any) => {
							e.preventDefault()
							hanldeError(null, 'name')
							handleOnChange(e.target.value, 'name')
						}}
						errors={errors.name}
					/>
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
						{countries?.map((item: any, index: any) => (
							<option key={index} value={item.id}>
								{item.name}
							</option>
						))}
					</FormInput>

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
							<h4 className="header-title">Cities</h4>
							<Button
								onClick={toggleModal}
								style={{
									marginRight: 20,
								}}
								variant={'outline-primary'}>
								Add City
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

export default ListCities
