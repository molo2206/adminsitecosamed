import { Card, Col, Row, Form } from 'react-bootstrap'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import Parteners from '@/hooks/Parteners'
import CustomButton from '@/components/form/CustomButton'
import { useTranslation } from 'react-i18next'
import useSettings from '@/hooks/useSettings'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'

function CreateParteners() {
	const { imageUrl, setImageUrl } = useAuthContext()
	const { loading } = useSettings()

	const { createParteners, loading: loadingForm } = Parteners()
	const { t } = useTranslation()

	const { inputs, errors, handleOnChange, hanldeError } = useValidation({
		full_name: '',
		email: '',
		url: '',
		image: null,
	})

	const validation = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!inputs.full_name) {
			hanldeError('Full_name us is required', 'full_name')
			valide = false
		}
		if (!inputs.email) {
			hanldeError('Email is required', 'email')
			valide = false
		}
		if (!inputs.url) {
			hanldeError('Url date is required', 'url')
			valide = false
		}

		if (!inputs.image) {
			hanldeError('Cover is required', 'image')
			valide = false
		} else {
			const MAX_FILE_SIZE = 5120 // 5MB
			const fileSizeKiloBytes = inputs?.image?.size / 1024
			if (fileSizeKiloBytes > MAX_FILE_SIZE) {
				hanldeError('Cover image is too big (max 5 mb) ', 'image')
				valide = false
			}
		}

		if (valide) {
			createParteners(inputs)
		}
	}

	return (
		<>
			<PageBreadcrumb title="Create Partener" subName={t('About')} />
			<Row>
				<Col xs={12}>
					<Card>
						<Card.Header></Card.Header>
						<Card.Body>
							<Form className="form-horizontal" onSubmit={validation}>
								<ul className="list-group list-group-flush">
									<li className="list-group-item">
										<CustomInput
											multiple={undefined}
											accept={undefined}
											onChangeCapture={undefined}
											name="full_name"
											label={t('FullName')}
											placeholder=""
											type="text"
											className="form-control"
											errors={errors.title}
											value={inputs.title}
											onFocus={() => {
												hanldeError(null, 'full_name')
											}}
											onChange={(e: any) =>
												handleOnChange(e.target.value, 'full_name')
											}
										/>
									</li>
									<li className="list-group-item">
										<CustomInput
											multiple={undefined}
											accept={undefined}
											onChangeCapture={undefined}
											name="email"
											label={t('Email')}
											placeholder=""
											type="text"
											className="form-control"
											errors={errors.email}
											value={inputs.email}
											onFocus={() => {
												hanldeError(null, 'email')
											}}
											onChange={(e: any) =>
												handleOnChange(e.target.value, 'email')
											}
										/>
									</li>
									<li className="list-group-item">
										<CustomInput
											multiple={undefined}
											accept={undefined}
											onChangeCapture={undefined}
											name="url"
											label="Url"
											placeholder=""
											type="text"
											className="form-control"
											errors={errors.url}
											value={inputs.url}
											onFocus={() => {
												hanldeError(null, 'url')
											}}
											onChange={(e: any) =>
												handleOnChange(e.target.value, 'url')
											}
										/>
									</li>

									<li className="list-group-item">
										<span
											className="d-block justify-content-center text-center  align-items-center mx-auto relative"
											// onClick={pickImage}
											role="button">
											<img
												src={
													imageUrl
														? imageUrl
														: '../../../src/assets/images/blog.jpg'
												}
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

export default CreateParteners
