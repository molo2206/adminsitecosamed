import { Card, Col, Row } from 'react-bootstrap'
import { Column } from 'react-table'
import { Link } from 'react-router-dom'
import { Employee } from '../ui/tables/types'
import { useAuthContext } from '@/common'
import { useTranslation } from 'react-i18next'
import useAsync from '@/hooks/useAsync'
import ChangeStatus from '@/components/form/ChangeStatus'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import MembersServices from '@/services/MembersServices'
import { PageBreadcrumb } from '@/components'

function ListMembers() {
	const { t } = useTranslation()
	const {
		handleUpdateNavigate,
		handleDelete,
	} = useAuthContext()
	const { data, loading } = useAsync(() => MembersServices.getMembers())
	console.log(data)
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
				<img className="avatar avatar-sm" src={cell?.row?.original?.image} />
			),
		},
		{
			Header: 'Name',
			accessor: 'name',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Prename',
			accessor: 'prename',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Sexe',
			accessor: 'sexe',
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
			Header: 'Phone',
			accessor: 'phone',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Type',
			accessor: 'typemembre',
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
			Cell: ({ cell }: any) => (
				<span>{cell?.row?.original?.country?.name}</span>
			),
		},
		{
			Header: 'City',
			accessor: 'ville',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'Profession',
			accessor: 'profession',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
		},
		{
			Header: 'CNOM',
			accessor: 'num_ordre',
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
							onClick={() =>
								handleUpdateNavigate(
									cell?.row?.original,
									'/members/edit/' + cell?.row?.original?.id
								)
							}
							style={{
								marginRight: 20,
							}}
							className={'btn btn-primary'}>
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
	return (
		<>
			<PageBreadcrumb title="List members" subName="Members" />
			<Row></Row>
			<Row className="mt-10">
				<Col>
					<Card>
						{loading && (
							<div className="card-disabled">
								<div className="card-portlets-loader"></div>
							</div>
						)}

						<Card.Header className="d-flex justify-content-between align-items-center">
							<h4 className="header-title">{t('Blogs')}</h4>
							<Link
								to={'/members/create'}
								style={{
									marginRight: 20,
								}}
								className={'btn btn-outline-primary'}>
								Create member
							</Link>
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
