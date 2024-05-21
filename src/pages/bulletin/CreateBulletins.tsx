import { Card, Col, Row, Form } from 'react-bootstrap'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import { FormInput } from '@/components'
import useBulletins from '@/hooks/useBulletins'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/form/CustomButton'
import CustomMaskInput from '@/components/form/CustomMaskInput'
import TeamServices from '@/services/TeamServices'
import { useTranslation } from 'react-i18next'
import CustomEditor from '@/components/form/CustomEditor'
import useSettings from '@/hooks/useSettings'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
import useAsync from '@/hooks/useAsync'

function CreateBulletins() {
	const { languages, changePageLang, pageLang } = useAuthContext()
	const years = [
		{
			name: '2023',
		},
		{
			name: '2024',
		},
		{
			name: '2025',
		},
		{
			name: '2026',
		},
		{
			name: '2027',
		},
	]
	const months = [
		{
			name: 'January',
		},
		{
			name: 'February',
		},
		{
			name: 'March',
		},
		{
			name: 'April',
		},
		{
			name: 'May',
		},

		{
			name: 'Jun',
		},
		{
			name: 'July',
		},
		{
			name: 'August',
		},
		{
			name: 'September',
		},
		{
			name: 'November',
		},
		{
			name: 'December',
		},
	]
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
		if (!inputs.file) {
			hanldeError('File is required', 'file')
			valide = false
		} else {
			const MAX_FILE_SIZE = 5120 // 5MB
			const fileSizeKiloBytes = inputs?.file?.size / 1024
			if (fileSizeKiloBytes > MAX_FILE_SIZE) {
				hanldeError('File is too big (max 5 mb) ', 'file')
				valide = false
			}
		}

		if (valide) {
			createBulletins(inputs)
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
											<Col lg={4}>
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
													errors={err}
													value={inputs.year}>
													<option defaultValue="selected">...</option>
													{years?.map((item: any, index: any) => (
														<option key={index} value={item.name}>
															{item.name}
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
													errors={err}
													value={inputs.month}>
													<option defaultValue="selected">...</option>
													{months?.map((item: any, index: any) => (
														<option key={index} value={item.name}>
															{item.name}
														</option>
													))}
												</FormInput>
											</Col>
											<Col lg={4}>
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
													register={register}
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
									</li>
									<li className=" list-group-item">
										<CustomInput
											multiple={undefined}
											invalid={undefined}
											accept={undefined}
											name="file"
											label={t('Pdf File')}
											placeholder=""
											type="file"
											className="form-control"
											errors={errors.file}
											onFocus={() => {
												hanldeError(null, 'file')
											}}
											onChangeCapture={(e: any) =>
												handleOnChange(e.target.files[0], 'file')
											}
										/>
									</li>
									<li className="list-group-item">
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
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default CreateBulletins
