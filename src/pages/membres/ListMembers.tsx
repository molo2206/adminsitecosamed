import { Card, Col, Row } from 'react-bootstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import ChangeStatus from '@/components/form/ChangeStatus'
import { useAuthContext } from '@/common'
import { useTranslation } from 'react-i18next'
import UserServices from '@/services/UserServices'
import useAsync from '@/hooks/useAsync'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'

const ListMembers = () => {
	const { t } = useTranslation()
	const {
	} = useAuthContext()
	const { data, loading } = useAsync(() => UserServices.getMembers())

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
			Header: 'Type',
			accessor: 'type',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Country',
			accessor: 'country',
			maxWidth: 400,
			minWidth: 400,
			width: 400,

		},
		{
			Header: 'City',
			accessor: 'town',
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

		// {
		// 	Header: 'Actions',
		// 	accessor: 'actions',
		// 	maxWidth: 400,
		// 	minWidth: 400,
		// 	width: 400,
		// 	Cell: ({ cell }) => (
		// 		<Row>
		// 			<Col>
		// 				<Button
		// 					onClick={() => handleUpdate(cell?.row?.original)}
		// 					style={{
		// 						marginRight: 20,
		// 					}}
		// 					variant={'outline-primary'}>
		// 					Edit
		// 				</Button>

		// 				<Button variant={'outline-danger'}>Delete</Button>
		// 			</Col>
		// 		</Row>
		// 	),
		// },
	]





	return (
		<>
			<PageBreadcrumb title="Members" subName="Members" />

			<Row className="mt-10">
				<Col>
					<Card>
						{loading && (
							<div className="card-disabled">
								<div className="card-portlets-loader"></div>
							</div>
						)}

						<Card.Header className="d-flex justify-content-between align-items-center">
							<h4 className="header-title">{t('Members')}</h4>
							{/* <Button
								onClick={toggleModal}
								style={{
									marginRight: 20,
								}}
								variant={'outline-primary'}>
								Add Person
							</Button> */}
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

export default ListMembers
