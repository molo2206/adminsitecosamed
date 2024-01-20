import { Card, Col, Row } from 'react-bootstrap'
import { Column } from 'react-table'
import { Employee } from '../ui/tables/types'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Link } from 'react-router-dom'
import 'rsuite/dist/rsuite-no-reset.min.css'
import { useAuthContext } from '@/common'
import SettingServices from '@/services/SettingServices'
import useAsync from '@/hooks/useAsync'
import { Table } from '@/components'
import { PageBreadcrumb } from '@/components'

const Travel = () => {
	const {} = useAuthContext()
	const { data, loading } = useAsync(() => SettingServices.getTravelrequests())

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
			Cell: ({ cell }: any) => (
				<img
					className="avatar avatar-sm"
					src={cell?.row?.original?.user?.image}
				/>
			),
		},
		{
			Header: 'Full name',
			accessor: 'user.full_name',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Email',
			accessor: 'user.email',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},

		{
			Header: 'Action',
			accessor: 'status',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }: any) => (
				<Link
					to={`/demande/${cell?.row?.original?.id}`}
					className="btn btn-outline-success">
					<span>Voir</span>
				</Link>
			),
		},
	]

	return (
		<>
			<PageBreadcrumb
				title="Demandes de voyage missionnaire"
				subName="Demandes de voyage missionnaire"
			/>

			<Row className="mt-10">
				<Col>
					<Card>
						{loading && (
							<div className="card-disabled">
								<div className="card-portlets-loader"></div>
							</div>
						)}

						<Card.Header className="d-flex justify-content-between align-items-center">
							{/* <h4 className="header-title">{t('Members')}</h4> */}
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

export default Travel
