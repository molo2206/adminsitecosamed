import { Card, Col, Row } from 'react-bootstrap'
import { Form } from 'reactstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import { useEffect, useRef } from 'react'
import CustomInput from '@/components/form/CustomInput'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import ChangeStatus from '@/components/form/ChangeStatus'
import FinanceServices from '@/services/FinanceServices'
import useValidation from '@/hooks/useValidation'
import MainModal from '@/components/Modals/MainModal'
import { useAuthContext } from '@/common'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/form/CustomButton'
import Finances from '@/hooks/Finance'
import useAsync from '@/hooks/useAsync'
import { Button } from 'react-bootstrap'
import { FormInput, Table } from '@/components'
import { PageBreadcrumb } from '@/components'
import { useForm } from 'react-hook-form'

const Finance = () => {
	const { SaveFinance, loading: loadingForm } = Finances()
	const { t } = useTranslation()
	const {
		handleUpdate,
		handleDelete,
		isEdit,
		selected,
		isOpen,
		toggleModal,
		closeModal,
	} = useAuthContext()
	const { data, loading } = useAsync(() => FinanceServices.getFinance())
	const Year = [
		{
			value: '2023',
			label: '2023',
		},
		{
			value: '2024',
			label: '2024',
		},
		{
			value: '2025',
			label: '2025',
		},
		{
			value: '2026',
			label: '2026',
		},
		{
			value: '2027',
			label: '2027',
		},
		{
			value: '2028',
			label: '2029',
		},
	]

	const columns: ReadonlyArray<Column> = [
		{
			Header: 'ID',
			accessor: 'id',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Année',
			accessor: 'year',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Bailleur de fond',
			accessor: 'bailleur',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},

		{
			Header: 'Financement',
			accessor: 'financement',
			maxWidth: 200,
			minWidth: 200,
			width: 200,
		},
		{
			Header: 'Projet',
			accessor: 'projet',
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
			year: '',
			bailleur: '',
			financement: '',
			projet: '',
		})
	const methods = useForm({
		defaultValues: {
			password: 'password',
			statictext: 'email@example.com',
			color: '#727cf5',
		},
	})
	const { control } = methods
	useEffect(() => {
		if (isEdit) {
			setInputs({
				year: selected?.year,
				bailleur: selected?.bailleur,
				financement: selected?.financement,
				projet: selected?.projet,
			})
		}
	}, [isEdit])
	const inputRef = useRef(null)
	const validation = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!inputs.year) {
			hanldeError('Year is required', 'title')
			valide = false
		}
		if (!inputs.bailleur) {
			hanldeError('Bailleur is required', 'description')
			valide = false
		}
		if (!inputs.financement) {
			hanldeError('Financement is required', 'type')
			valide = false
		}
		if (!inputs.projet) {
			hanldeError('Projet is required', 'poste')
			valide = false
		}
		if (valide) {
			SaveFinance(inputs), inputRef
		}
	}
	return (
		<>
			<PageBreadcrumb title="Rapport financier" subName="Finance" />
			<MainModal
				size={undefined}
				close={closeModal}
				show={isOpen}
				title={`${isEdit ? t('Update') : t('Create')} ${t(
					'Rapport financier'
				)}`}>
				<Form className="form-horizontal" onSubmit={validation}>
					<FormInput
						invalid={undefined}
						name="year"
						style={{
							height: 50,
						}}
						label="Année"
						type="select"
						containerClass="mb-3"
						className="form-select"
						value={inputs.year}
						onChange={(e: any) => handleOnChange(e.target.value, 'year')}
						key="select"
						errors={'Molo'}
						control={control}>
						<option defaultValue="selected">...</option>
						{Year?.map((item: any, index: any) => (
							<option key={index} value={item.value}>
								{item?.label}
							</option>
						))}
					</FormInput>
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="bailleur"
						label={t('Funder')}
						placeholder=""
						type="text"
						className="form-control"
						errors={errors.bailleur}
						value={inputs.bailleur}
						onFocus={() => {
							hanldeError(null, 'bailleur')
						}}
						onChange={(e: any) => handleOnChange(e.target.value, 'bailleur')}
					/>
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="financement"
						label="Financement"
						placeholder=""
						type="text"
						className="form-control"
						errors={errors.financement}
						value={inputs.financement}
						onFocus={() => {
							hanldeError(null, 'financement')
						}}
						onChange={(e: any) => handleOnChange(e.target.value, 'financement')}
					/>
					<CustomInput
						multiple={undefined}
						accept={undefined}
						onChangeCapture={undefined}
						name="projet"
						label="Projet"
						placeholder=""
						type="text"
						className="form-control"
						errors={errors.projet}
						value={inputs.projet}
						onFocus={() => {
							hanldeError(null, 'projet')
						}}
						onChange={(e: any) => handleOnChange(e.target.value, 'projet')}
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
							<h4 className="header-title">{t('Rapport financier')}</h4>
							<Button
								onClick={toggleModal}
								style={{
									marginRight: 30,
								}}
								variant={'outline-primary'}>
								Add Rapport financier
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

export default Finance
