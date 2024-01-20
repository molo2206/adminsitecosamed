import { Image, Row, Col, Card } from 'react-bootstrap'
import SettingServices from '@/services/SettingServices'
import useAsync from '@/hooks/useAsync'
import Error404 from '../error/Error404'
import { useParams } from 'react-router-dom'
import { date_format } from '@/utils/heleprs'

const DetailDemande = () => {
	const { id } = useParams()
	const { data, error, loading } = useAsync(() =>
		SettingServices._one_request(id)
	)

	if (error || !data) {
		return <Error404 />
	}

	return (
		<>
			<div>
				{loading ? (
					<div className="card-disabled">
						<div className="card-portlets-loader"></div>
					</div>
				) : (
					<>
						<Row>
							<Col sm={12}>
								<div className="profile-bg-picture">
									<span className="picture-bg-overlay" />
								</div>
								<div className="profile-user-box">
									<Row>
										<Col sm={6}>
											<div className="profile-user-img">
												<Image
													src={data?.user?.image}
													className="avatar-lg rounded-circle"
													alt="user"
												/>
											</div>
											<div>
												<h4 className="mt-4 fs-17 ellipsis">
													{data?.user?.full_name}
												</h4>
												<p className="font-13"> {data?.user?.email}</p>
												<p className="text-muted mb-0"></p>
											</div>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
						<Row>
							<Col sm={12}>
								<Card className="p-0">
									<Card.Body className="p-0">
										<div className="profile-content p-4">
											{data?.type === 'ask_travel' ? (
												<div className="mt-3">
													<h5>Demande de voyage missionnaire</h5>
													<Row>
														<Col lg={6} md={6}>
															<div className="mb-4">
																<div className="mt-2 justify-content-between d-flex align-items-center">
																	<span>Ministry :</span>{' '}
																	<h6>{data?.ministere}</h6>
																</div>
																<div className="mt-2 justify-content-between d-flex align-items-center">
																	<span>Nationality :</span>{' '}
																	<h6>{data?.nationalite}</h6>
																</div>
															</div>
															<h5>Message</h5>
															<p>{data?.motif}</p>
														</Col>
													</Row>
												</div>
											) : (
												<div>
													<h5>Demande de facilitation de visa</h5>

													<Row>
														<Col lg={6} md={6}>
															<div className="mb-4">
																<div className="mt-2 justify-content-between d-flex align-items-center">
																	<span>Ministry :</span>{' '}
																	<h6>{data?.ministere}</h6>
																</div>
																<div className="mt-2 justify-content-between d-flex align-items-center">
																	<span>Nationality :</span>{' '}
																	<h6>{data?.nationalite}</h6>
																</div>
																<div className="mt-2 justify-content-between d-flex align-items-center">
																	<span>Passport NO :</span>{' '}
																	<h6>{data?.passport}</h6>
																</div>
																<div className="mt-2 justify-content-between d-flex align-items-center">
																	<span>Passport issue date :</span>
																	<h6>{date_format(data?.valid_in)}</h6>
																</div>
																<div className="mt-2 justify-content-between d-flex align-items-center">
																	<span>Passport expiration date :</span>
																	<h6>{date_format(data?.valid_out)}</h6>
																</div>
															</div>
															<h5>Motif devoyage</h5>
															<p>{data?.motif}</p>
														</Col>
														<Col className="" lg={6} md={6}>
															<h5>Attached files</h5>
															<div className="d-flex justify-content-between align-items-center">
																<a
																	href={data?.id_service}
																	download="Example-PDF-document"
																	target="_blank"
																	rel="noreferrer"
																	className="btn btn-primary">
																	<span
																		className="mr-2"
																		style={{ marginRight: 10 }}>
																		Id Card
																	</span>
																	<i className="ml-3 ri-download-line" />
																</a>
																<a
																	href={data?.yellow_card}
																	download="Example-PDF-document"
																	target="_blank"
																	rel="noreferrer"
																	className="btn btn-primary">
																	<span
																		className="mr-2"
																		style={{ marginRight: 10 }}>
																		Yellow card
																	</span>
																	<i className="ml-3 ri-download-line" />
																</a>
																<a
																	href={data?.extrait_bank}
																	download="Example-PDF-document"
																	target="_blank"
																	rel="noreferrer"
																	className="btn btn-primary">
																	<span
																		className="mr-2"
																		style={{ marginRight: 10 }}>
																		Bank recipt
																	</span>
																	<i className="ml-3 ri-download-line" />
																</a>
															</div>
														</Col>
													</Row>
												</div>
											)}
										</div>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</>
				)}
			</div>
		</>
	)
}

export default DetailDemande
