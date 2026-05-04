import { Card, Col, Row, Form } from 'react-bootstrap'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import { FormInput } from '@/components'
import useBulletins from '@/hooks/useBulletins'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/form/CustomButton'
import TeamServices from '@/services/TeamServices'
import { useTranslation } from 'react-i18next'
import CustomEditor from '@/components/form/CustomEditor'
import useSettings from '@/hooks/useSettings'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
import useAsync from '@/hooks/useAsync'
import { formatBytes, getEditors, months, years } from '@/utils/heleprs'
import { useState } from 'react'
import { compressImage } from '@/utils/compressImage'

function CreateBulletins() {
	const { languages, changePageLang, pageLang, imageUrl, setImageUrl } =
		useAuthContext()
	const [fileSize, setFileSize] = useState<number | null>(null)

	// ✅ Gère la taille du fichier et stocke l’entier
	const handleFileChange = (file: File, field: string) => {
		if (field === 'file' && file) {
			const sizeInBytes = file.size
			setFileSize(sizeInBytes)
			handleOnChange(file, field)
			handleOnChange(sizeInBytes, 'size') // stocke le nombre d’octets
		}
	}

	const { loading } = useSettings()
	const { data: teams, loading: loadingCat } = useAsync(() =>
		TeamServices.getTeam()
	)
	const { createBulletins, loading: loadingForm } = useBulletins()

	const { t } = useTranslation()
	const { inputs, errors, handleOnChange, hanldeError } = useValidation({
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
		size: '', // sera un nombre (octets)
	})

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
			hanldeError('Title is required', 'title')
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
			hanldeError('Year is required', 'year')
			valide = false
		}
		if (!inputs.month) {
			hanldeError('Month is required', 'month')
			valide = false
		}
		if (!inputs.page_number) {
			hanldeError('Number of pages is required', 'page_number')
			valide = false
		}
		if (!inputs.editor) {
			hanldeError('Editor is required', 'editor')
			valide = false
		}
		if (!inputs.size) {
			hanldeError('File size is required', 'size')
			valide = false
		}
		if (!inputs.image) {
			hanldeError('Cover is required', 'image')
			valide = false
		} else {
			const MAX_FILE_SIZE = 5120 // 5MB
			const fileSizeKiloBytes = inputs?.image?.size / 1024
			if (fileSizeKiloBytes > MAX_FILE_SIZE) {
				hanldeError('Cover image is too big (max 5 MB)', 'image')
				valide = false
			}
		}
		if (!inputs.file) {
			hanldeError('PDF file is required', 'file')
			valide = false
		} else {
			// ✅ Augmentation à 10 Mo pour les rapports / bulletins
			const MAX_FILE_SIZE = 10240 // 10 MB
			const fileSizeKiloBytes = inputs?.file?.size / 1024
			if (fileSizeKiloBytes > MAX_FILE_SIZE) {
				hanldeError('File is too big (max 10 MB)', 'file')
				valide = false
			}
		}

		if (valide) {
			// Convertir page_number en entier (si nécessaire pour l’API)
			const payload = {
				...inputs,
				page_number: parseInt(inputs.page_number, 10) || 0,
				size: inputs.size, // déjà un nombre
			}
			createBulletins(payload)
		}
	}

	return (
		<>
			<PageBreadcrumb title="Create Bulletin" subName={t('Bulletins')} />
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
													style={{ height: 50 }}
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
											onFocus={() => hanldeError(null, 'title')}
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
											onFocus={() => hanldeError(null, 'description')}
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
													name="created"
													label={t('Date create')}
													placeholder=""
													type="date"
													className="form-control"
													errors={errors.created}
													value={inputs.created}
													onFocus={() => hanldeError(null, 'created')}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'created')
													}
												/>
											</Col>
											<Col lg={2}>
												<FormInput
													invalid={undefined}
													name="year"
													style={{ height: 50 }}
													label="Select Year"
													type="select"
													containerClass="mb-3"
													className="form-select"
													key="year"
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'year')
													}
													errors={errors.year}>
													<option defaultValue="selected">...</option>
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
													name="month"
													style={{ height: 50 }}
													label="Select Month"
													type="select"
													containerClass="mb-3"
													className="form-select"
													key="month"
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'month')
													}
													errors={errors.month}>
													<option defaultValue="selected">...</option>
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
													name="editor"
													style={{ height: 50 }}
													label="Select Editor"
													type="select"
													containerClass="mb-3"
													className="form-select"
													key="editor"
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'editor')
													}
													errors={errors.editor}>
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
													label={t('Number of pages')}
													placeholder=""
													type="number"
													className="form-control"
													errors={errors.page_number}
													value={inputs.page_number}
													onFocus={() => hanldeError(null, 'page_number')}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'page_number')
													}
												/>
											</Col>
											<Col lg={2}>
												<FormInput
													invalid={undefined}
													name="author"
													style={{ height: 50 }}
													label="Select Author"
													type="select"
													containerClass="mb-3"
													className="form-select"
													value={inputs.author} // ✅ corrigé
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'author')
													}
													register={register}
													key="author"
													errors={errors.author} // ✅ corrigé
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
												{fileSize !== null && (
													<CustomInput
														name="size"
														label={t('File size')}
														placeholder=""
														type="text"
														className="form-control"
														errors={errors.size}
														value={formatBytes(fileSize)}
														onFocus={() => hanldeError(null, 'size')}
														onChange={() => {}} // ✅ ne rien faire
														disabled={true} // ✅ empêche la modification manuelle
													/>
												)}
											</Col>

											{/* Upload image couverture */}
											<Col lg={4} className="mb-3">
												<CustomInput
													name="image"
													label={t('Cover')}
													type="file"
													className="form-control"
													placeholder=""
													errors={errors.image}
													accept="image/*"
													onFocus={() => hanldeError(null, 'image')}
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
														src={
															imageUrl ||
															'https://apicosamed.cosamed.org/uploads/bulletins/1543ceff58b1606182e9b7cf357712b3.png'
														}
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
						{loadingCat && (
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

export default CreateBulletins
