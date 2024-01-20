import { useEffect } from 'react'
import { Card, Col, Row, Form } from 'react-bootstrap'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import { FormInput } from '@/components'
import useEvent from '@/hooks/useEvent'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/form/CustomButton'
import CustomMaskInput from '@/components/form/CustomMaskInput'
import CountryServices from '@/services/CountryServices'
import useAsync from '@/hooks/useAsync'
import { useParams } from 'react-router-dom'
import EventServices from '@/services/EventServices'
import CategoryServices from '@/services/CategoryServices'
import { useTranslation } from 'react-i18next'
import CustomEditor from '@/components/form/CustomEditor'
import useSettings from '@/hooks/useSettings'
import { showingTranslateValue } from '@/utils/heleprs'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
const EditEvent = () => {
	const { id } = useParams()
	const navigation = useNavigate()
	const { languages, changePageLang, pageLang, lang } = useAuthContext()
	const { loading } = useSettings()
	const { data, loading: loadingCountry } = useAsync(CountryServices.getCountry)
	const { data: event, error: errorEvent } = useAsync(() =>
		EventServices.oneEvent(id)
	)

	if (errorEvent || !event) {
		navigation('/', { replace: true })
	}

	const { data: categories, loading: loadingCat } = useAsync(() =>
		CategoryServices.getCategoryType('Event')
	)
	const { createEvent, loading: loadingForm } = useEvent()
	const { t } = useTranslation()
	const { inputs, errors, handleOnChange, hanldeError, setInputs } =
		useValidation({
			title: '',
			description: '',
			debut: '',
			fin: '',
			in: '',
			out: '',
			country: '',
			image: null,
			category: '',
			city: '',
		})

	useEffect(() => {
		setInputs({
			title: showingTranslateValue(event?.translations, pageLang)?.title || '',
			description:
				showingTranslateValue(event?.translations, pageLang)?.description || '',
			debut: event?.debut || '',
			fin: event?.fin || '',
			in: event?.in || '',
			out: event?.out || '',
			country: event?.country_id || '',
			city: event?.city_id || '',
			image: null,
			category: event?.category_id || '',
		})
	}, [event, pageLang])

	const methods = useForm({
		defaultValues: {
			password: 'password',
			statictext: 'email@example.com',
			color: '#727cf5',
		},
	})
	const {
		register,
		control,
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
		if (!inputs.debut) {
			hanldeError('Start date is required', 'debut')
			valide = false
		}
		if (!inputs.fin) {
			hanldeError('End date is required', 'fin')
			valide = false
		}
		if (!inputs.in) {
			hanldeError('Start time is required', 'in')
			valide = false
		}
		if (!inputs.country) {
			hanldeError('Country is required', 'country')
			valide = false
		}
		if (!inputs.category) {
			hanldeError('Category is required', 'category')
			valide = false
		}
		if (!inputs.out) {
			hanldeError('End time is required', 'out')
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
			createEvent(inputs)
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
											<Col lg={6}>
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
													value={inputs.country}
													onChange={(e: any) => {
														e.preventDefault()
														handleOnChange(e.target.value, 'country')
													}}
													key="select"
													errors={'Samuel'}>
													<option defaultValue="selected">...</option>
													{data?.map((item: any, index: any) => (
														<option key={index} value={item.id}>
															{item.name}
														</option>
													))}
												</FormInput>
											</Col>
											<Col lg={12}>
												<FormInput
													invalid={undefined}
													name="select"
													style={{
														height: 50,
													}}
													label="Select City"
													type="select"
													containerClass="mb-3"
													className="form-select"
													value={inputs.city}
													onChange={(e: any) => {
														e.preventDefault()
														handleOnChange(e.target.value, 'city')
													}}
													key="select"
													errors={'Samuel'}>
													<option defaultValue="selected">...</option>
													{data
														?.find((item: any) => item?.id === inputs?.country)
														?.city?.map((item: any, index: any) => (
															<option key={index} value={item.id}>
																{item.name}
															</option>
														))}
												</FormInput>
											</Col>
										</Row>
									</li>
									<li className="list-group-item">
										<FormInput
											invalid={undefined}
											name="select"
											style={{
												height: 50,
											}}
											label="Select Category"
											type="select"
											containerClass="mb-3"
											className="form-select"
											value={inputs.category}
											onChange={(e: any) =>
												handleOnChange(e.target.value, 'category')
											}
											register={register}
											key="select"
											errors={'Samuel'}
											control={control}>
											<option defaultValue="selected">...</option>
											{categories?.map((item: any, index: any) => (
												<option key={index} value={item.id}>
													{
														showingTranslateValue(item?.translations, lang)
															?.name
													}
												</option>
											))}
										</FormInput>
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
												<CustomMaskInput
													style={{ height: 50 }}
													mask={[
														/\d/,
														/\d/,
														'/',
														/\d/,
														/\d/,
														'/',
														/\d/,
														/\d/,
														/\d/,
														/\d/,
													]}
													label="Start Date"
													name=""
													placeholder=""
													accept={undefined}
													errors={errors.debut}
													value={inputs.debut}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'debut')
													}
												/>
											</Col>
											<Col lg={6}>
												<CustomMaskInput
													style={{ height: 50 }}
													mask={[
														/\d/,
														/\d/,
														'/',
														/\d/,
														/\d/,
														'/',
														/\d/,
														/\d/,
														/\d/,
														/\d/,
													]}
													label="End Date"
													name=""
													placeholder=""
													accept={undefined}
													errors={errors.fin}
													value={inputs.fin}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'fin')
													}
												/>
											</Col>
										</Row>
									</li>
									<li className="list-group-item">
										<Row>
											<Col lg={6}>
												<CustomMaskInput
													style={{ height: 50 }}
													mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
													label="Time In"
													name=""
													placeholder=""
													accept={undefined}
													errors={errors.in}
													value={inputs.in}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'in')
													}
												/>
											</Col>
											<Col lg={6}>
												<CustomMaskInput
													style={{ height: 50 }}
													mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
													label="Time Out"
													name=""
													placeholder=""
													accept={undefined}
													errors={errors.out}
													value={inputs.out}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'out')
													}
												/>
											</Col>
										</Row>
									</li>
									<li className="list-group-item">
										<CustomInput
											multiple={undefined}
											accept={undefined}
											name="image"
											label={t('Cover') + '(850 X 550)'}
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
						{loadingCat && (
							<div className="card-disabled">
								<div className="card-portlets-loader"></div>
							</div>
						)}
						{loadingCountry && (
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

export default EditEvent
