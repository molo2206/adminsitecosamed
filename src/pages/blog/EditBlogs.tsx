import { Card, Col, Row, Form } from 'react-bootstrap'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import { FormInput } from '@/components'
import useBlogs from '@/hooks/useBlogs'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/form/CustomButton'
import CategoryServices from '@/services/CategoryServices'
import { useTranslation } from 'react-i18next'
import CustomEditor from '@/components/form/CustomEditor'
import useSettings from '@/hooks/useSettings'
import BlogServices from '@/services/BlogsServices'
import { showingTranslateValue } from '@/utils/heleprs'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
import { useNavigate, useParams } from 'react-router-dom'
import useAsync from '@/hooks/useAsync'
import TeamServices from '@/services/TeamServices'
import Error404 from '../error/Error404'
import { useEffect } from 'react'

function EditBlogs() {
	const { id } = useParams()
	const navigation = useNavigate()
	const { languages, changePageLang, pageLang, lang, imageUrl, setImageUrl } =
		useAuthContext()
	const { loading } = useSettings()

	const { data: blog, error: errorBlog } = useAsync(() =>
		BlogServices.oneBlog(id)
	)
	const { data: teams, loading: loadingTeams } = useAsync(() =>
		TeamServices.getTeam()
	)

	const { data: categories, loading: loadingCat } = useAsync(() =>
		CategoryServices.getCategoryType('Blog')
	)

	if (errorBlog || !blog) {
		navigation('/', { replace: true })
	}
	const { t } = useTranslation()
	const { createBlogs, loading: loadingForm } = useBlogs()
	const { inputs, errors, handleOnChange, hanldeError, setInputs } =
		useValidation({
			title: '',
			description: '',
			documentation: '',
			image: null,
			category: '',
			author: '',
		})
	useEffect(() => {
		setInputs({
			title: showingTranslateValue(blog?.translations, pageLang)?.title || '',
			description:
				showingTranslateValue(blog?.translations, pageLang)?.description || '',
			publication_date: blog?.publication_date || '',
			image: null,
			category: blog?.category_id || '',
			documentation:
				showingTranslateValue(blog?.translations, pageLang)?.documentation ||
				'',
			author: blog?.author || '',
		})
	}, [blog, pageLang])

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
		if (!inputs.publication_date) {
			hanldeError('Publication date is required', 'publication_date')
			valide = false
		}

		if (!inputs.author) {
			hanldeError('Author is required', 'Author')
			valide = false
		}

		if (!inputs.documentation) {
			hanldeError('documentation is required', 'documentation')
			valide = false
		}

		if (!inputs.category) {
			hanldeError('Category is required', 'category')
			valide = false
		}

		// if (!inputs.image) {
		// 	hanldeError('Cover is required', 'image')
		// 	valide = false
		// } else {
		// 	const MAX_FILE_SIZE = 5120 // 5MB
		// 	const fileSizeKiloBytes = inputs?.image?.size / 1024
		// 	if (fileSizeKiloBytes > MAX_FILE_SIZE) {
		// 		hanldeError('Cover image is too big (max 5 mb) ', 'image')
		// 		valide = false
		// 	}
		// }

		if (valide) {
			createBlogs(inputs)
		}
	}
	return errorBlog ? (
		// navigation('/', { replace: true })
		<Error404 />
	) : (
		<>
			<PageBreadcrumb title="blog" subName={t('Edit blog')} />
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
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name=""
													label={t('Date create')}
													placeholder=""
													type="date"
													className="form-control"
													errors={errors.publication_date}
													value={inputs.publication_date}
													onFocus={() => {
														hanldeError(null, 'publication_date')
													}}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'publication_date')
													}
												/>
											</Col>
											<Col lg={6}>
												<FormInput
													invalid={undefined}
													name="select"
													style={{
														height: 50,
													}}
													label="Select Author"
													type="select"
													containerClass="mb-3"
													className="form-select"
													value={inputs.author}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'author')
													}
													// register={register}
													key="select"
													errors={'error: ' + errors}
													control={control}>
													<option defaultValue="selected">...</option>
													{teams?.map((item: any, index: any) => (
														<option key={index} value={item.id}>
															{item?.full_name}
														</option>
													))}
												</FormInput>
											</Col>
										</Row>
									</li>

									<li className="list-group-item">
										<span
											className="d-block justify-content-center text-center  align-items-center mx-auto relative"
											role="button">
											<img
												src={imageUrl ? imageUrl : blog?.image}
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
										<Col>
											<CustomEditor
												label={t("Documentation de l'image")}
												error={errors.documentation}
												value={inputs.documentation}
												onFocus={() => {
													hanldeError(null, 'documentation')
												}}
												onChange={(text: any) =>
													handleOnChange(text, 'documentation')
												}
											/>
										</Col>
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
						{loadingTeams && (
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

export default EditBlogs
