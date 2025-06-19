import { Card, Col, Row, Form } from 'react-bootstrap'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import { FormInput } from '@/components'
import useBulletins from '@/hooks/useBulletins'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/form/CustomButton'
import { useTranslation } from 'react-i18next'
import CustomEditor from '@/components/form/CustomEditor'
import useSettings from '@/hooks/useSettings'
import BulletinsService from '@/services/BulletinsService'
import {
	formatBytes,
	getEditors,
	months,
	showingTranslateValue,
	years,
} from '@/utils/heleprs'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
import useAsync from '@/hooks/useAsync'
import { useEffect, useState } from 'react'
import TeamServices from '@/services/TeamServices'
import { useNavigate, useParams } from 'react-router-dom'
import { compressImage } from '@/utils/compressImage'

function EditBulletin() {
	const [fileSize, setFileSize] = useState<number | null>(null)

	const handleFileChange = (file: File, field: string) => {
		if (field === 'file' && file) {
			const size = file.size
			setFileSize(size)
			handleOnChange(file, field)
			handleOnChange(size, 'size')
		}
	}
	const { id } = useParams()
	const navigation = useNavigate()
	const { languages, changePageLang, pageLang, imageUrl, setImageUrl } =
		useAuthContext()
	const { loading } = useSettings()

	const { data: bulletin, error: errorBulletin } = useAsync(() =>
		BulletinsService.oneBulletin(id)
	)
	const { data: teams, loading: loadingTeams } = useAsync(() =>
		TeamServices.getTeam()
	)

	if (errorBulletin || !bulletin) {
		navigation('/', { replace: true })
	}
	const { t } = useTranslation()
	const { createBulletins, loading: loadingForm } = useBulletins()
	const { inputs, errors, handleOnChange, hanldeError, setInputs } =
		useValidation({
			title: '',
			description: '',
			year: '',
			created: '',
			author: '',
			image: null,
			month: '',
			file: null,
			page_number: '',
			editor: '',
			size: '',
		})
	useEffect(() => {
		setInputs({
			title:
				showingTranslateValue(bulletin?.translations, pageLang)?.title || '',
			description:
				showingTranslateValue(bulletin?.translations, pageLang)?.description ||
				'',
			created:
				showingTranslateValue(bulletin?.translations, pageLang)?.created || '',
			image: bulletin?.image || null,
			year: showingTranslateValue(bulletin?.translations, pageLang)?.year || '',
			month:
				showingTranslateValue(bulletin?.translations, pageLang)?.month || '',
			file: null,
			category: bulletin?.category_id || '',
			documentation:
				showingTranslateValue(bulletin?.translations, pageLang)
					?.documentation || '',
			author: bulletin?.author || '',
			editor: bulletin?.editor || '',
			page_number: bulletin?.page_number || '',
			size: bulletin?.size || '',
		})
		if (bulletin.image) {
			setImageUrl(bulletin.image)
		}
	}, [bulletin, pageLang])

	const methods = useForm({
		defaultValues: {
			password: 'password',
			statictext: 'email@example.com',
			color: '#727cf5',
		},
	})
	const {
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
		if (!inputs.created) {
			hanldeError('Date create is required', 'created')
			valide = false
		}

		if (!inputs.author) {
			hanldeError('Author is required', 'author')
			valide = false
		}

		if (!inputs.year) {
			hanldeError('year is required', 'year')
			valide = false
		}

		if (!inputs.month) {
			hanldeError('month is required', 'month')
			valide = false
		}

		if (!inputs.page_number) {
			hanldeError('page_number is required', 'page_number')
			valide = false
		}

		if (!inputs.editor) {
			hanldeError('editor is required', 'editor')
			valide = false
		}

		if (!inputs.size) {
			hanldeError('size is required', 'size')
			valide = false
		}

		if (valide) {
			createBulletins(inputs)
		}
	}
	return (
		<>
			<PageBreadcrumb title="Edit Bulletin" subName={t('Bulletins')} />
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
											<Col lg={2}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name=""
													label={t('Date create')}
													placeholder=""
													type="date"
													className="form-control"
													errors={errors.created}
													value={inputs.created}
													onFocus={() => {
														hanldeError(null, 'created')
													}}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'created')
													}
												/>
											</Col>
											<Col lg={2}>
												<FormInput
													invalid={undefined}
													name="select"
													style={{
														height: 50,
													}}
													label="Select Year"
													type="select"
													containerClass="mb-3"
													className="form-select"
													key="select"
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'year')
													}
													errors={errors.year}
													value={inputs.year}>
													{years?.map((item: any, index: any) => (
														<option key={index} value={item.value}>
															{item.label}
														</option>
													))}
												</FormInput>
											</Col>
											<Col lg={2}>
												<FormInput
													invalid={undefined}
													name="select"
													style={{
														height: 50,
													}}
													label="Select Month"
													type="select"
													containerClass="mb-3"
													className="form-select"
													key="select"
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'month')
													}
													errors={errors.month}
													value={inputs.month}>
													{months?.map((item: any, index: any) => (
														<option key={index} value={item.value}>
															{item.label}
														</option>
													))}
												</FormInput>
											</Col>
											<Col lg={2}>
												<FormInput
													invalid={undefined}
													name="select"
													style={{
														height: 50,
													}}
													label="Select Editor"
													type="select"
													containerClass="mb-3"
													className="form-select"
													key="select"
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'editor')
													}
													errors={errors.editor}
													value={inputs.editor}>
													<option defaultValue="selected">...</option>
													{getEditors?.map((item: any, index: any) => (
														<option key={index} value={item.value}>
															{item.label}
														</option>
													))}
												</FormInput>
											</Col>
											<Col lg={2}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="page_number"
													label="Nombre de pages"
													placeholder=""
													type="number"
													className="form-control"
													errors={errors.page_number}
													value={inputs.page_number}
													onFocus={() => {
														hanldeError(null, 'page_number')
													}}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'page_number')
													}
												/>
											</Col>
											<Col lg={2}>
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
													{teams?.map((item: any, index: any) => (
														<option key={index} value={item.id}>
															{item.full_name}
														</option>
													))}
												</FormInput>
											</Col>
										</Row>
									</li>
									<li className="list-group-item">
										<Row className="align-items-start">
											{/* Upload fichier PDF */}
											<Col lg={4} className="mb-3">
												<CustomInput
													name="file"
													label={t('Pdf File')}
													placeholder=""
													type="file"
													className="form-control"
													errors={errors.file}
													onFocus={() => hanldeError(null, 'file')}
													accept=".pdf"
													onChangeCapture={(
														e: React.ChangeEvent<HTMLInputElement>
													) => {
														const file = e.target.files?.[0]
														if (file) handleFileChange(file, 'file')
													}}
												/>
												{!inputs.file && inputs.size && (
													<CustomInput
														name="size"
														label={t('Taille du fichier')}
														placeholder=""
														type="text"
														className="form-control"
														errors={errors.size}
														value={inputs.size}
														onFocus={() => hanldeError(null, 'size')}
														onChange={(e: any) =>
															handleOnChange(e.target.value, 'size')
														}
														disabled={true} // Désactive la saisie, car c’est une info affichée
													/>
												)}
											</Col>

											{/* Upload image couverture */}
											<Col lg={4} className="mb-3">
												<CustomInput
													multiple={undefined}
													invalid={undefined}
													accept={undefined}
													name="image"
													label={t('Cover')}
													placeholder=""
													type="file"
													className="form-control"
													errors={errors.image}
													onFocus={() => {
														hanldeError(null, 'image')
													}}
													onChangeCapture={async (
														e: React.ChangeEvent<HTMLInputElement>
													) => {
														const file = e.target.files?.[0]
														if (!file) return

														const compressed = await compressImage(file, 500)
														setImageUrl(URL.createObjectURL(compressed))
														handleOnChange(compressed, 'image')
													}}
												/>
											</Col>

											{/* Aperçu image */}
											<Col lg={4} className="mb-3">
												<div className="text-center">
													<img
														src={imageUrl || '/default.jpg'}
														className="img-fluid rounded shadow-sm border"
														alt="Cover Preview"
														style={{ maxHeight: '200px', maxWidth: '100%' }}
													/>
												</div>
											</Col>
										</Row>
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

export default EditBulletin
