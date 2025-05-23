import { Card, Col, Row, Form } from 'react-bootstrap'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import { FormInput, PageBreadcrumb } from '@/components'
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
import { useParams } from 'react-router-dom'
import useAsync from '@/hooks/useAsync'
import TeamServices from '@/services/TeamServices'
import Error404 from '../error/Error404'
import { useEffect, useState } from 'react'
import { compressImage } from '@/utils/compressImage'
import useDeleteImage from '@/hooks/DeleteImage'

function EditBlogs() {
	const { id } = useParams()
	const {
		languages,
		changePageLang,
		pageLang,
		lang,
		imageUrl,
		setImageUrl,
	} = useAuthContext()
	const { loading } = useSettings()
	const [existingImages, setExistingImages] = useState<string[]>([])
	const [imageUrls, setImageUrls] = useState<string[]>([])

	const [progressList, setProgressList] = useState<number[]>([])
	const [extraImageError, setExtraImageError] = useState<string | null>(null)

	const { data: blog, error: errorBlog } = useAsync(() =>
		BlogServices.oneBlog(id)
	)
	const { data: teams, loading: loadingTeams } = useAsync(() =>
		TeamServices.getTeam()
	)
	const { data: categories, loading: loadingCat } = useAsync(() =>
		CategoryServices.getCategoryType('Blog')
	)
	const { deleteImageById } = useDeleteImage()

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
			images: null,
		})

	useEffect(() => {
		if (blog) {
			setInputs({
				title: showingTranslateValue(blog?.translations, pageLang)?.title || '',
				description:
					showingTranslateValue(blog?.translations, pageLang)?.description ||
					'',
				publication_date: blog?.publication_date || '',
				image: null,
				category: blog?.category_id || '',
				documentation:
					showingTranslateValue(blog?.translations, pageLang)?.documentation ||
					'',
				author: blog?.author?.id || '', // ✅ Utilise l'ID ici
			})
			setExistingImages(blog?.allimages || [])
		}
	}, [blog, pageLang])

	const methods = useForm()
	const {
		control,
		formState: { errors: err },
	} = methods

	const validation = (e: any) => {
		e.preventDefault()

		let valid = true
		if (!inputs.title) {
			hanldeError('Title is required', 'title')
			valid = false
		}
		if (!inputs.description) {
			hanldeError('Description is required', 'description')
			valid = false
		}
		if (!inputs.publication_date) {
			hanldeError('Publication date is required', 'publication_date')
			valid = false
		}
		if (!inputs.author) {
			hanldeError('Author is required', 'author')
			valid = false
		}
		if (!inputs.documentation) {
			hanldeError('Documentation is required', 'documentation')
			valid = false
		}
		if (!inputs.category) {
			hanldeError('Category is required', 'category')
			valid = false
		}

		if (valid) {
			createBlogs({ ...inputs, existingImages })
		}
	}

	if (errorBlog || !blog) return <Error404 />

	return (
		<>
			<PageBreadcrumb title="blog" subName={t('Edit blog')} />
			<Row>
				<Col xs={12}>
					<Card>
						<Card.Header />
						<Card.Body>
							<Form className="form-horizontal" onSubmit={validation}>
								<ul className="list-group list-group-flush">
									{/* Langue */}
									<li className="list-group-item">
										<Row>
											<Col lg={12}>
												<FormInput
													invalid={undefined}
													style={{
														height: 50,
													}}
													name="select"
													label="Select database Language"
													type="select"
													containerClass="mb-3"
													className="form-select"
													onChange={(e) => changePageLang(e.target.value)}
													value={pageLang}
													errors={err}>
													<option value="">...</option>
													{languages?.map((item: any, index: number) => (
														<option key={index} value={item.iso}>
															{item.name}
														</option>
													))}
												</FormInput>
											</Col>
										</Row>
									</li>

									{/* Catégorie */}
									<li className="list-group-item">
										<FormInput
											invalid={undefined}
											style={{
												height: 50,
											}}
											name="select"
											label="Select Category"
											type="select"
											containerClass="mb-3"
											className="form-select"
											value={inputs.category}
											onChange={(e: any) =>
												handleOnChange(e.target.value, 'category')
											}
											control={control}
											errors={errors.category}>
											<option value="">...</option>
											{categories?.map((item: any, index: number) => (
												<option key={index} value={item.id}>
													{
														showingTranslateValue(item?.translations, lang)
															?.name
													}
												</option>
											))}
										</FormInput>
									</li>

									{/* Titre */}
									<li className="list-group-item">
										<CustomInput
											multiple={undefined}
											accept={undefined}
											onChangeCapture={undefined}
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

									{/* Description */}
									<li className="list-group-item">
										<CustomEditor
											label={t('Description')}
											error={errors.description}
											value={inputs.description}
											onFocus={() => hanldeError(null, 'description')}
											onChange={(text: any) =>
												handleOnChange(text, 'description')
											}
										/>
									</li>

									{/* Date + Auteur */}
									<li className="list-group-item">
										<Row>
											<Col lg={6}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="publication_date"
													label={t('Publication Date')}
													type="date"
													placeholder=""
													className="form-control"
													value={inputs.publication_date}
													errors={errors.publication_date}
													onFocus={() => hanldeError(null, 'publication_date')}
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

									{/* Image principale */}
									<li className="list-group-item">
										<span className="d-block text-center">
											<img
												src={imageUrl || blog?.image}
												className="avatar avatar-lg"
											/>
											<br />
											<small>(540 X 640)</small>
										</span>
										<CustomInput
											multiple={undefined}
											accept={undefined}
											name="image"
											label={t('Cover')}
											type="file"
											className="form-control"
											placeholder=""
											errors={errors.image}
											onFocus={() => hanldeError(null, 'image')}
											onChangeCapture={async (e: any) => {
												const file = e.target.files[0]
												if (!file) return
												const compressed = await compressImage(file, 500)
												setImageUrl(URL.createObjectURL(compressed))
												handleOnChange(compressed, 'image')
											}}
										/>
									</li>
									{/* Images supplémentaires */}
									<li className="list-group-item">
										<label className="form-label d-block">
											Images existantes
										</label>
										<div className="d-flex flex-wrap gap-2 mb-3">
											{existingImages.map((img: any, index: number) => (
												<div key={index} style={{ position: 'relative' }}>
													<img
														src={img.image}
														style={{
															width: '150px',
															height: '100px',
															objectFit: 'cover',
															borderRadius: '4px',
															border: '1px solid #ccc',
														}}
													/>
													<button
														type="button"
														onClick={() => {
															deleteImageById(img.id)
															setExistingImages((prev) =>
																prev.filter((image: any) => image.id !== img.id)
															)
														}}
														style={{
															position: 'absolute',
															top: 0,
															right: 0,
															backgroundColor: 'rgba(255, 0, 0, 0.7)',
															color: 'white',
															borderRadius: '0 4px 0 4px',
															padding: '2px 6px',
														}}>
														✕
													</button>
												</div>
											))}
										</div>

										{/* Images nouvelles */}
										<div className="d-flex flex-wrap gap-2 mb-3">
											{imageUrls.map((img: any, index) => (
												<div
													key={index}
													style={{ position: 'relative', width: '150px' }}>
													<img
														src={img.image}
														style={{
															width: '150px',
															height: '100px',
															objectFit: 'cover',
															borderRadius: '4px',
															border: '1px solid #ccc',
														}}
													/>
													<div style={{ marginTop: '4px' }}>
														<div
															style={{
																width: '100%',
																height: '6px',
																backgroundColor: '#e0e0e0',
																borderRadius: '3px',
															}}>
															<div
																style={{
																	width: `${progressList[index]}%`,
																	height: '100%',
																	backgroundColor: '#007bff',
																	borderRadius: '3px',
																	transition: 'width 0.4s ease',
																}}></div>
														</div>
													</div>
													<button
														type="button"
														style={{
															position: 'absolute',
															top: 0,
															right: 0,
															backgroundColor: 'rgba(255, 0, 0, 0.7)',
															color: 'white',
															borderRadius: '0 4px 0 4px',
															padding: '2px 6px',
														}}>
														✕
													</button>
												</div>
											))}
										</div>

										<CustomInput
											name="images"
											label="Autres images"
											type="file"
											placeholder=""
											className="form-control"
											multiple
											accept="image/*"
											errors={errors.images}
											onFocus={() => {
												hanldeError(null, 'images')
												setExtraImageError(null)
											}}
											onChangeCapture={async (
												e: React.ChangeEvent<HTMLInputElement>
											) => {
												const fileList = e.target.files
												if (!fileList) return

												const files = Array.from(fileList)
												const totalImages =
													existingImages.length +
													imageUrls.length +
													files.length

												if (totalImages > 5) {
													setExtraImageError(
														'Vous ne pouvez télécharger que 5 images supplémentaires au maximum.'
													)
													return
												}

												const urls: string[] = []
												const compressedFiles: File[] = []
												const progressArray: number[] = []

												for (const file of files) {
													if (file.size > 500 * 1024) {
														setExtraImageError(
															`L'image "${file.name}" dépasse la taille maximale de 500 Ko.`
														)
														continue
													}

													// Simule une progression progressive
													let progress = 0
													progressArray.push(progress)
													const currentIndex = progressArray.length - 1

													const interval = setInterval(() => {
														progress += 20
														progressArray[currentIndex] = progress
														setProgressList([...progressArray])

														if (progress >= 100) {
															clearInterval(interval)
														}
													}, 100)

													const compressed = await compressImage(file, 500)
													urls.push(URL.createObjectURL(compressed))
													compressedFiles.push(compressed)
												}

												if (compressedFiles.length > 0) {
													setImageUrls((prev) => [...prev, ...urls])
													setProgressList((prev) => [...prev, ...progressArray])
													handleOnChange(compressedFiles, 'images')
												}
											}}
										/>

										{extraImageError && (
											<div className="text-danger mt-2">{extraImageError}</div>
										)}
									</li>

									{/* Documentation */}
									<li className="list-group-item">
										<Col>
											<CustomEditor
												label={t("Documentation de l'image")}
												error={errors.documentation}
												value={inputs.documentation}
												onFocus={() => hanldeError(null, 'documentation')}
												onChange={(text: any) =>
													handleOnChange(text, 'documentation')
												}
											/>
										</Col>
									</li>

									{/* Bouton */}
									<li className="list-group-item">
										<Col lg={4}>
											<CustomButton loading={loadingForm} label="Save" />
										</Col>
									</li>
								</ul>
							</Form>
						</Card.Body>

						{(loading || loadingCat || loadingTeams) && (
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
