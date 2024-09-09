import { Card, Col, Row } from 'react-bootstrap'
import { Column } from 'react-table'
import { Link } from 'react-router-dom'
import { Employee } from '../ui/tables/types'
import { useEffect } from 'react'
import { useAuthContext } from '@/common'
import { useTranslation } from 'react-i18next'
import useAsync from '@/hooks/useAsync'
import { showingTranslateValue } from '@/utils/heleprs'
import ChangeStatus from '@/components/form/ChangeStatus'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import { Button } from 'react-bootstrap'
import { Table } from '@/components'
import RepportsServices from '@/services/RepportsServices'
import { PageBreadcrumb } from '@/components'

function ListRapport() {
	const { t } = useTranslation()
	const {
		handleUpdateNavigate,
		handleDelete,
		isEdit,
		selected,
		lang,
		setImageUrl,
	} = useAuthContext()
	const { data, loading } = useAsync(() => RepportsServices.getRepport())
	
	const columns: ReadonlyArray<Column> = [
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
			Header: 'Title',
			accessor: 'title',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }: any) => (
				<span>
					{
						showingTranslateValue(cell?.row?.original?.translations, lang)
							?.title
					}
				</span>
			),
		},
		{
			Header: 'Author',
			accessor: 'author',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }: any) => (
				<span>{cell?.row?.original?.author?.full_name}</span>
			),
		},
		
		{
			Header: 'Publication date',
			accessor: 'created',
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
									'/rapport/edit/' + cell?.row?.original?.id
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
	useEffect(() => {
		if (isEdit) {
			// setSelectedType(
			// 	JSON.parse(selected?.liens_sociaux)?.map((item: any) => ({
			// 		label: item,
			// 		value: item,
			// 	}))
			// )
			setImageUrl(selected?.image)
		}
	}, [isEdit])
	return (
		<>
			<PageBreadcrumb title="List blog" subName="Blogs" />
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
							<h4 className="header-title">{t('Reports')}</h4>
							<Link
								to={'/rapport/create'}
								style={{
									marginRight: 20,
								}}
								className={'btn btn-outline-primary'}>
								Create Report
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

export default ListRapport
