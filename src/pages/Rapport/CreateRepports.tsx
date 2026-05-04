import { Card, Col, Row, Form } from 'react-bootstrap'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import { FormInput } from '@/components'
import useRepport from '@/hooks/useRepport'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/form/CustomButton'
import TeamServices from '@/services/TeamServices'
import { useTranslation } from 'react-i18next'
import CustomEditor from '@/components/form/CustomEditor'
import useSettings from '@/hooks/useSettings'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
import useAsync from '@/hooks/useAsync'
import { formatBytes } from '@/utils/heleprs'
import { useState } from 'react'

function CreateRepports() {
	const { languages, changePageLang, pageLang } = useAuthContext()
	const [pdfFileSize, setPdfFileSize] = useState<number | null>(null)

	const { loading } = useSettings()
	const { data: teams, loading: loadingCat } = useAsync(() =>
		TeamServices.getTeam()
	)
	const { createRapports, loading: loadingForm } = useRepport()

	const { t } = useTranslation()
	const { inputs, errors, handleOnChange, hanldeError } = useValidation({
		title: '',
		description: '',
		created: '',
		author: '',
		image: null,
		file: null, // ✅ champ attendu par le hook
		page_number: '',
		pdf_size: '', // taille en octets
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

	const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setPdfFileSize(file.size)
			handleOnChange(file, 'file')
			handleOnChange(file.size, 'pdf_size')
		} else {
			setPdfFileSize(null)
			handleOnChange(null, 'file')
			handleOnChange('', 'pdf_size')
		}
	}

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
		if (!inputs.page_number) {
			hanldeError('Number of pages is required', 'page_number')
			valide = false
		}
		if (!inputs.pdf_size) {
			hanldeError('File size is required', 'pdf_size')
			valide = false
		}
		if (!inputs.image) {
			hanldeError('Cover is required', 'image')
			valide = false
		} else {
			const MAX_IMAGE_SIZE = 5120 // 5MB
			const imageSizeKB = inputs.image.size / 1024
			if (imageSizeKB > MAX_IMAGE_SIZE) {
				hanldeError('Cover image is too big (max 5 MB)', 'image')
				valide = false
			}
		}
		if (!inputs.file) {
			hanldeError('PDF file is required', 'file')
			valide = false
		} else {
			const MAX_PDF_SIZE = 10240 // 10MB
			const pdfSizeKB = inputs.file.size / 1024
			if (pdfSizeKB > MAX_PDF_SIZE) {
				hanldeError('File is too big (max 10 MB)', 'file')
				valide = false
			}
		}

		if (valide) {
			const payload = {
				...inputs,
				page_number: parseInt(inputs.page_number, 10) || 0,
				size: inputs.pdf_size, // l’API peut attendre `size`
			}
			createRapports(payload)
		}
	}

	return (
		<>
			<PageBreadcrumb title="Create Report" subName={t('Reports')} />
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
											name="title"
											label={t('Title')}
											type="text"
											placeholder=""
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
											<Col lg={4}>
												<CustomInput
													name="created"
													label={t('Date create')}
													type="date"
													placeholder=""
													className="form-control"
													errors={errors.created}
													value={inputs.created}
													onFocus={() => hanldeError(null, 'created')}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'created')
													}
												/>
											</Col>
											<Col lg={4}>
												<CustomInput
													name="page_number"
													label={t('Number of pages')}
													type="number"
													placeholder=""
													className="form-control"
													errors={errors.page_number}
													value={inputs.page_number}
													onFocus={() => hanldeError(null, 'page_number')}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'page_number')
													}
												/>
											</Col>
											<Col lg={4}>
												<FormInput
													invalid={undefined}
													name="author"
													style={{ height: 50 }}
													label="Select Author"
													type="select"
													containerClass="mb-3"
													className="form-select"
													value={inputs.author}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'author')
													}
													register={register}
													key="author"
													errors={errors.author}
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
										<Row>
											<Col lg={6}>
												<div className="mb-1">
													<label className="form-label">{t('Pdf File')}</label>
													<input
														type="file"
														accept=".pdf"
														onChange={handlePdfChange}
														className="form-control"
														style={{ height: 50 }}
													/>
													{errors.file && (
														<div className="invalid-feedback d-block">
															{errors.file}
														</div>
													)}
												</div>
												{pdfFileSize !== null && (
													<CustomInput
														name="pdf_size"
														label={t('File size')}
														type="text"
														placeholder=""
														className="form-control mt-2"
														errors={errors.pdf_size}
														value={formatBytes(pdfFileSize)}
														onFocus={() => hanldeError(null, 'pdf_size')}
														onChange={() => {}}
														disabled={true}
													/>
												)}
											</Col>
											<Col lg={6}>
												<CustomInput
													name="image"
													label={t('Cover') + ' (850 X 550)'}
													type="file"
													placeholder=""
													className="form-control"
													errors={errors.image}
													accept="image/*"
													onFocus={() => hanldeError(null, 'image')}
													onChangeCapture={(
														e: React.ChangeEvent<HTMLInputElement>
													) => handleOnChange(e.target.files?.[0], 'image')}
												/>
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

export default CreateRepports
