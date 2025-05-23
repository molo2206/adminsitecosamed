import { Card, Col, Row, Form } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import { FormInput } from '@/components'
import useBlogs from '@/hooks/useBlogs'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/form/CustomButton'
import TeamServices from '@/services/TeamServices'
import CategoryServices from '@/services/CategoryServices'
import { useTranslation } from 'react-i18next'
import CustomEditor from '@/components/form/CustomEditor'
import useSettings from '@/hooks/useSettings'
import { showingTranslateValue } from '@/utils/heleprs'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
import useAsync from '@/hooks/useAsync'
import { useRef, useState } from 'react'
import { compressImage } from '@/utils/compressImage'

function CreateBlogs() {
	const { languages, changePageLang, pageLang, lang, imageUrl, setImageUrl } =
		useAuthContext()
	const { loading } = useSettings()
	const { data: categories, loading: loadingCat } = useAsync(() =>
		CategoryServices.getCategoryType('Blog')
	)
	const { data: teams, loading: loadingTeams } = useAsync(() =>
		TeamServices.getTeam()
	)

	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const [imageUrls, setImageUrls] = useState<string[]>([])
	const [progressList, setProgressList] = useState<number[]>([])

	const removeImageUrl = (index: number) => {
		// Supprimer l'aperçu
		setImageUrls((prev) => prev.filter((_, i) => i !== index))

		// Supprimer l'image de l'input logique
		if (Array.isArray(inputs.images)) {
			const updatedImages = inputs.images.filter(
				(_: any, i: any) => i !== index
			)
			handleOnChange(updatedImages.length ? updatedImages : null, 'images')
		}

		// Supprimer la progression
		setProgressList((prev) => prev.filter((_, i) => i !== index))

		// Réinitialiser complètement l'input (donc vider le nom de fichier)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const { createBlogs, loading: loadingForm } = useBlogs()
	const { t } = useTranslation()

	const { inputs, errors, handleOnChange, hanldeError } = useValidation({
		title: '',
		description: '',
		documentation: '',
		publication_date: '',
		author: '',
		image: null,
		category: '',
	})

	const methods = useForm()
	const { control } = methods

	const validation = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!inputs.title) {
			hanldeError('Title is required', 'title')
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
			hanldeError('Author is required', 'author')
			valide = false
		}
		if (!inputs.documentation) {
			hanldeError('Documentation is required', 'documentation')
			valide = false
		}
		if (!inputs.category) {
			hanldeError('Category is required', 'category')
			valide = false
		}
		if (!inputs.image) {
			hanldeError('Cover is required', 'image')
			valide = false
		} else {
			const sizeInKB = inputs.image.size / 1024
			if (sizeInKB > 500) {
				hanldeError('Cover image exceeds 500 KB', 'image')
				valide = false
			}
		}

		if (valide) {
			createBlogs(inputs)
		}
	}

	return (
		<>
			<PageBreadcrumb title="Create blog" subName={t('About')} />
			<Row>
				<Col xs={12}>
					<Card>
						<Card.Body>
							<Form onSubmit={validation}>
								<FormInput
									invalid={undefined}
									style={{
										height: 50,
									}}
									name="selectLang"
									label="Select database Language"
									type="select"
									className="form-select mb-3"
									placeholder=""
									value={pageLang}
									onChange={(e) => changePageLang(e.target.value)}>
									<option value="">...</option>
									{languages?.map((item: any, index: any) => (
										<option key={index} value={item.iso}>
											{item.name}
										</option>
									))}
								</FormInput>

								<FormInput
									invalid={undefined}
									style={{
										height: 50,
									}}
									name="category"
									label="Select Category"
									type="select"
									className="form-select mb-3"
									value={inputs.category}
									onChange={(e: any) =>
										handleOnChange(e.target.value, 'category')
									}
									control={control}>
									<option value="">...</option>
									{categories?.map((item: any, index: any) => (
										<option key={index} value={item.id}>
											{showingTranslateValue(item?.translations, lang)?.name}
										</option>
									))}
								</FormInput>

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
									onChange={(e: any) => handleOnChange(e.target.value, 'title')}
								/>

								<CustomEditor
									label={t('Description')}
									value={inputs.description}
									error={errors.description}
									onFocus={() => hanldeError(null, 'description')}
									onChange={(val: string) => handleOnChange(val, 'description')}
								/>

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
											value={inputs.Author}
											onChange={(e: any) =>
												handleOnChange(e.target.value, 'author')
											}
											key="select"
											errors={'error: ' + errors}
											control={control}>
											<option defaultValue="selected">...</option>
											{teams?.map((item: any, index: any) => (
												<option key={index} value={item.id}>
													{item.full_name}
												</option>
											))}
										</FormInput>
									</Col>
								</Row>

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
								<div className="mb-3">
									<img
										src={imageUrl || '/default.jpg'}
										className="img-fluid rounded"
										alt="Cover Preview"
										style={{ maxHeight: 200 }}
									/>
								</div>

								<CustomInput
									name="images"
									label="Autres images"
									type="file"
									placeholder=""
									className="form-control"
									ref={fileInputRef}
									multiple
									accept="image/*"
									errors={errors.images}
									onFocus={() => hanldeError(null, 'images')}
									onChangeCapture={async (e: any) => {
										const files = Array.from(e.target.files ?? [])
										const urls: string[] = []
										const compressedFiles: File[] = []
										const progressArray: number[] = []

										for (const file of files) {
											const compressed = await compressImage(file, 500)
											urls.push(URL.createObjectURL(compressed))
											compressedFiles.push(compressed)
											progressArray.push(100) // simulate completed
										}

										if (compressedFiles.length > 0) {
											setImageUrls((prev) => [...prev, ...urls])
											setProgressList((prev) => [...prev, ...progressArray])
											handleOnChange(compressedFiles, 'images')
										}
									}}
								/>
								<Row className="my-2">
									{imageUrls.map((url, index) => (
										<Col
											key={index}
											xs={6}
											md={3}
											className="position-relative mb-3">
											<img
												src={url}
												className="img-fluid rounded border"
												style={{
													maxHeight: 150,
													objectFit: 'cover',
													width: '100%',
												}}
											/>
											<ProgressBar
												now={progressList[index] || 0}
												className="mt-2"
											/>
											<button
												type="button"
												className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
												onClick={() => removeImageUrl(index)}>
												✕
											</button>
										</Col>
									))}
								</Row>

								<CustomEditor
									label={t("Documentation de l'image")}
									value={inputs.documentation}
									error={errors.documentation}
									onFocus={() => hanldeError(null, 'documentation')}
									onChange={(val: string) =>
										handleOnChange(val, 'documentation')
									}
								/>

								<Col lg={4}>
									<CustomButton loading={loadingForm} label={'Save'} />
								</Col>
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

export default CreateBlogs
