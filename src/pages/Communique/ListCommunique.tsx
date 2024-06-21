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
import CommunicatedServices from '@/services/CommunicatedServices'
import { PageBreadcrumb } from '@/components'

function ListCommunique() {
	const { t } = useTranslation()
	const {
		handleUpdateNavigate,
		handleDelete,
		isEdit,
		selected,
		lang,
		setImageUrl,
	} = useAuthContext()
	const { data, loading } = useAsync(() =>
		CommunicatedServices.getCommuniques()
	)
	console.log(data)
	const columns: ReadonlyArray<Column> = [
		{
			Header: 'Image',
			accessor: 'file',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }: any) => (
				<img className="avatar avatar-sm" src={cell?.row?.original?.file} />
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
		// {
		// 	Header: 'Description',
		// 	accessor: 'description',
		// 	maxWidth: 400,
		// 	minWidth: 400,
		// 	width: 400,
		// 	Cell: ({ cell }: any) => (
		// 		<span>
		// 			{
		// 				showingTranslateValue(cell?.row?.original?.translations, lang)
		// 					?.description
		// 			}
		// 		</span>
		// 	),
		//},
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
			Header: 'Created',
			accessor: 'created',
			maxWidth: 400,
			minWidth: 400,
			width: 400,
			Cell: ({ cell }: any) => (
				<span>{cell?.row?.original?.created}</span>
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
							onClick={() =>
								handleUpdateNavigate(
									cell?.row?.original,
									'/communicated/edit/' + cell?.row?.original?.id
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
			setImageUrl(selected?.file)
		}
	}, [isEdit])
	return (
		<>
			<PageBreadcrumb title="List communicated" subName="Communicated" />
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
							<h4 className="header-title">{t('Communicated')}</h4>
							<Link
								to={'/communicated/create'}
								style={{
									marginRight: 20,
								}}
								className={'btn btn-outline-primary'}>
								Create Communicated
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

export default ListCommunique
