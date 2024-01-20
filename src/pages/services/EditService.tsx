import { useEffect } from 'react'
import { Card, Col, Row, Form } from 'react-bootstrap'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import { FormInput } from '@/components'
import useServices from '@/hooks/useServices'
import { useNavigate } from 'react-router-dom'
import CustomButton from '@/components/form/CustomButton'
import useAsync from '@/hooks/useAsync'
import { useParams } from 'react-router-dom'
import ServiceServices from '@/services/ServiceServices'
import { useTranslation } from 'react-i18next'
import CustomEditor from '@/components/form/CustomEditor'
import useSettings from '@/hooks/useSettings'
import { showingTranslateValue } from '@/utils/heleprs'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
const EditService = () => {
	const { id } = useParams()
	const navigation = useNavigate()
	const { languages, changePageLang, pageLang } = useAuthContext()
	const { loading } = useSettings()
	const { data: event, error: errorEvent } = useAsync(() =>
		ServiceServices.oneService(id)
	)

	if (errorEvent || !event) {
		navigation('/', { replace: true })
	}
	const { createService, loading: loadingForm } = useServices()
	const { t } = useTranslation()
	const { inputs, errors, handleOnChange, hanldeError, setInputs } =
		useValidation({
			title: '',
			description: '',
			image: null,
			type: '',
		})

	useEffect(() => {
		setInputs({
			title: showingTranslateValue(event?.translations, pageLang)?.title || '',
			description:
				showingTranslateValue(event?.translations, pageLang)?.description || '',
			type: event?.type,
			image: null,
		})
	}, [event, pageLang])

	const validation = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!inputs.title) {
			hanldeError('Title us is required', 'title')
			valide = false
		}
		if (!inputs.description) {
			hanldeError('Description is required', 'description')
			valide = false
		}
		if (inputs.image) {
			const MAX_FILE_SIZE = 5120 // 5MB
			const fileSizeKiloBytes = inputs?.image?.size / 1024
			if (fileSizeKiloBytes > MAX_FILE_SIZE) {
				hanldeError('Cover image is too big (max 5 mb) ', 'image')
				valide = false
			}
		}

		if (valide) {
			createService(inputs)
		}
	}

	return (
		<>
			<PageBreadcrumb title="Edit Event" subName={t('Edit Event')} />
			<Row>
				<Col xs={12}>
					<Card>
						<Card.Header></Card.Header>
						<Card.Body>
							<Form className="form-horizontal" onSubmit={validation}>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col lg={6}>
												<FormInput
													invalid={undefined}
													name="select"
													style={{
														height: 50,
													}}
													label="Select database Language"
													type="select"
													containerClass="mb-3"
													className="form-select"
													key="select"
													onChange={(e) => changePageLang(e.target.value)}
													value={pageLang}>
													<option defaultValue="selected">...</option>
													{languages?.map((item: any, index: any) => (
														<option key={index} value={item.iso}>
															{item.name}
														</option>
													))}
												</FormInput>
											</Col>
											<Col lg={6}>
												<FormInput
													invalid={undefined}
													name="select"
													style={{
														height: 50,
													}}
													label="Select Type"
													type="select"
													containerClass="mb-3"
													className="form-select"
													key="select"
													onChange={(e) =>
														handleOnChange(e.target.value, 'type')
													}
													errors={errors.type}
													value={inputs?.type}>
													<option defaultValue="selected">...</option>
													<option value={'visa'}>Visa application</option>
													<option value={'travel'}>Travel request</option>
													<option value={'others'}>Others</option>
												</FormInput>
											</Col>
										</Row>
									</li>
									<li className="list-group-item">
										<CustomInput
											multiple={undefined}
											accept={undefined}
											onChangeCapture={undefined}
											invalid={undefined}
											name="title"
											label={t('Title')}
											placeholder=""
											type="text"
											className="form-control"
											errors={errors.title}
											value={inputs.title}
											onFocus={() => {
												hanldeError(null, 'title')
											}}
											onChange={(e: any) =>
												handleOnChange(e.target.value, 'title')
											}
										/>
									</li>
									<li className="list-group-item">
										<CustomEditor
											label={t('Description')}
											error={errors.description}
											value={inputs.description}
											onFocus={() => {
												hanldeError(null, 'description')
											}}
											onChange={(text: any) =>
												handleOnChange(text, 'description')
											}
										/>
									</li>
									<li className="list-group-item">
										<CustomInput
											multiple={undefined}
											accept={undefined}
											name="image"
											label={t('Cover') + " (850 X 550)"}
											placeholder=""
											type="file"
											className="form-control"
											errors={errors.image}
											onFocus={() => {
												hanldeError(null, 'image')
											}}
											onChangeCapture={(e: any) =>
												handleOnChange(e.target.files[0], 'image')
											}
										/>
									</li>

									<li className="list-group-item">
										<Col lg={4}>
											<CustomButton loading={loadingForm} label={'Save'} />
										</Col>
									</li>
								</ul>
							</Form>
						</Card.Body>
						{loading && (
							<div className="card-disabled">
								<div className="card-portlets-loader"></div>
							</div>
						)}
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default EditService
