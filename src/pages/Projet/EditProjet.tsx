import { Card, Col, Row, Form } from 'react-bootstrap'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import { FormInput } from '@/components'
import UserProjet from '@/hooks/UserProjet'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/form/CustomButton'
import { useTranslation } from 'react-i18next'
import CustomEditor from '@/components/form/CustomEditor'
import useSettings from '@/hooks/useSettings'
import ProjetServices from '@/services/ProjetServices'
import { showingTranslateValue } from '@/utils/heleprs'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
import { useNavigate, useParams } from 'react-router-dom'
import useAsync from '@/hooks/useAsync'
import Error404 from '../error/Error404'
import { useEffect } from 'react'

function EditProjet() {
	const { id } = useParams()
	const navigation = useNavigate()
	const { languages, changePageLang, pageLang, imageUrl, setImageUrl } =
		useAuthContext()
	const { loading } = useSettings()

	const { data: project, error: errorProject } = useAsync(() =>
		ProjetServices.oneProject(id)
	)

	if (errorProject || !project) {
		navigation('/', { replace: true })
	}
	const { t } = useTranslation()
	const { createProjet, loading: loadingForm } = UserProjet()
	const { inputs, errors, handleOnChange, hanldeError, setInputs } =
		useValidation({
			title: '',
			description: '',
			image: null,
			datestarted: '',
			dateend: '',
		})
	useEffect(() => {
		setInputs({
			title:
				showingTranslateValue(project?.translations, pageLang)?.title || '',
			description:
				showingTranslateValue(project?.translations, pageLang)?.description ||
				'',
			datestarted: project?.datestarted || '',
			dateend: project?.dateend || '',
			image: null,
		})
	}, [project, pageLang])

	const methods = useForm({
		defaultValues: {
			password: 'password',
			statictext: 'email@example.com',
			color: '#727cf5',
		},
	})
	const {
		// control,
		formState: { errors: err },
	} = methods


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


		if (valide) {
			createProjet(inputs)
		}
	}

	return errorProject ? (
		<Error404 />
	) : (
		<>
			<PageBreadcrumb title="Project" subName={t('Edit Project')} />
			<Row>
				<Col xs={12}>
					<Card>
						<Card.Header></Card.Header>
						<Card.Body>
							<Form className="form-horizontal" onSubmit={validation}>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<Row>
											<Col lg={12}>
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
													errors={err}
													value={pageLang}>
													<option defaultValue="selected">...</option>
													{languages?.map((item: any, index: any) => (
														<option key={index} value={item.iso}>
															{item.name}
														</option>
													))}
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
										<Row>
											<Col lg={6}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="Date débutoire"
													label={t('Publication Date')}
													placeholder=""
													type="date"
													className="form-control"
													errors={errors.datestarted}
													value={inputs.datestarted}
													onFocus={() => {
														hanldeError(null, 'datestarted')
													}}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'datestarted')
													}
												/>
											</Col>
											<Col lg={6}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="Date débutoire"
													label={t('Date end')}
													placeholder=""
													type="date"
													className="form-control"
													errors={errors.dateend}
													value={inputs.dateend}
													onFocus={() => {
														hanldeError(null, 'dateend')
													}}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'dateend')
													}
												/>
											</Col>
										</Row>
									</li>

									<li className="list-group-item">
										<span
											className="d-block justify-content-center text-center  align-items-center mx-auto relative"
											role="button">
											<img
												src={imageUrl ? imageUrl : project?.image}
												className="avatar avatar-lg"
											/>
											<br />
											<small className="text-center">(540 X 640)</small>
										</span>
										<CustomInput
											multiple={undefined}
											invalid={undefined}
											accept={undefined}
											name="image"
											label={t('Cover') + ' (850 X 550)'}
											placeholder=""
											type="file"
											className="form-control"
											errors={errors.image}
											onFocus={() => {
												hanldeError(null, 'image')
											}}
											onChangeCapture={(e: any) => {
												setImageUrl(URL.createObjectURL(e.target.files[0]))
												handleOnChange(e.target.files[0], 'image')
											}}
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

export default EditProjet
