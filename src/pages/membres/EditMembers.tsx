import { Card, Col, Row, Form } from 'react-bootstrap'
import CustomInput from '@/components/form/CustomInput'
import { useAuthContext } from '@/common'
import { FormInput } from '@/components'
import Members from '@/hooks/Members'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/form/CustomButton'
import { useTranslation } from 'react-i18next'
import useSettings from '@/hooks/useSettings'
import MembersServices from '@/services/MembersServices'
import { showingTranslateValue } from '@/utils/heleprs'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
import { useNavigate, useParams } from 'react-router-dom'
import useAsync from '@/hooks/useAsync'
import ThematiqueServices from '@/services/ThematiqueServices'
import Error404 from '../error/Error404'
import CountryServices from '@/services/CountryServices'
import { useEffect } from 'react'

function EditMembers() {
	const { id } = useParams()
	const navigation = useNavigate()
	const {pageLang, lang, imageUrl, setImageUrl } =
		useAuthContext()
	const { loading } = useSettings()

	const { data: member, error: errorMember} = useAsync(() =>
		MembersServices.oneMember(id)
	)
	const { data: teams, loading: loadingTeams } = useAsync(() =>
		ThematiqueServices.getThematiques()
	)
    const { data: countries} = useAsync(() =>
		CountryServices.getCountry()
	)
	const genres = [
		{
			value: 'Masculin',
			label: 'Masculin',
		},
		{
			value: 'Feminin',
			label: 'Feminin',
		},
	]

	const Type = [
		{
			value: 'Bailleur',
			label: 'Bailleur',
		},
		{
			value: 'Membre actif',
			label: 'Membre actif',
		},
		{
			value: 'Autre',
			label: 'Autre',
		},
	]

	if (errorMember || !member) {
		navigation('/', { replace: true })
	}
	const { t } = useTranslation()
	const { createMember, loading: loadingForm } = Members()
	const { inputs, errors, handleOnChange, hanldeError, setInputs } =
		useValidation({
			name: '',
			prename: '',
			sexe: '',
			phone: '',
			email: '',
			typemembre: '',
			thematique: '',
			image: null,
			country: '',
			ville: '',
			profession: '',
		})
	useEffect(() => {
		setInputs({
			name: member?.name || '',
			prename: member?.prename || '',
			sexe: member?.sexe || '',
			image: null,
			phone: member?.phone || '',
			email: member?.email || '',
			typemembre: member?.typemembre || '',
			thematique: member?.thematique || '',
			country: member?.country || '',
			profession: member?.profession || '',
			num_ordre: member?.num_ordre || '',
            ville:member?.ville || '',
            corporation:member?.corporation || ''
		})
	}, [member, pageLang])

	const methods = useForm({
		defaultValues: {
			password: 'password',
			statictext: 'email@example.com',
			color: '#727cf5',
		},
	})
	const {
		control,
		
	} = methods
	const validation = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!inputs.name) {
			hanldeError('name us is required', 'name')
			valide = false
		}
		if (!inputs.prename) {
			hanldeError('prename is required', 'prename')
			valide = false
		}
		if (!inputs.sexe) {
			hanldeError('Sexe date is required', 'sexe')
			valide = false
		}

		if (!inputs.phone) {
			hanldeError('Phone is required', 'Author')
			valide = false
		}

		if (!inputs.email) {
			hanldeError('email is required', 'email')
			valide = false
		}

		if (!inputs.typemembre) {
			hanldeError('typemembre is required', 'typemembre')
			valide = false
		}
		if (!inputs.thematique) {
			hanldeError('thematique is required', 'thematique')
			valide = false
		}
		if (!inputs.country) {
			hanldeError('country is required', 'country')
			valide = false
		}
		if (!inputs.ville) {
			hanldeError('ville is required', 'ville')
			valide = false
		}
		if (!inputs.profession) {
			hanldeError('profession is required', 'profession')
			valide = false
		}

		if (valide) {
			createMember(inputs)
		}
	}
	return errorMember ? (
		// navigation('/', { replace: true })
		<Error404 />
	) : (
		<>
			<PageBreadcrumb title="Member" subName={t('Edit member')} />
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
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="name"
													label="name"
													placeholder=""
													type="text"
													className="form-control"
													errors={errors.name}
													value={inputs.name}
													onFocus={() => {
														hanldeError(null, 'name')
													}}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'name')
													}
												/>
											</Col>
											<Col lg={6}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="prename"
													label="Prename"
													placeholder=""
													type="text"
													className="form-control"
													errors={errors.prename}
													value={inputs.prename}
													onFocus={() => {
														hanldeError(null, 'prename')
													}}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'prename')
													}
												/>
											</Col>
										</Row>
									</li>
									<li className="list-group-item">
										<Row>
											<Col lg={6}>
												<FormInput
													invalid={undefined}
													name="select"
													style={{
														height: 50,
													}}
													label="Select Sexe"
													type="select"
													containerClass="mb-3"
													className="form-select"
													value={inputs.sexe}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'sexe')
													}
													key="select"
													errors={'Samuel'}
													control={control}>
													<option defaultValue="selected">...</option>
													{genres?.map((item: any, index: any) => (
														<option key={index} value={item.value}>
															{item?.label}
														</option>
													))}
												</FormInput>
											</Col>
											<Col lg={6}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="phone"
													label="Phone"
													placeholder=""
													type="phone"
													className="form-control"
													errors={errors.phone}
													value={inputs.phone}
													onFocus={() => {
														hanldeError(null, 'phone')
													}}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'phone')
													}
												/>
											</Col>
										</Row>
									</li>
									<li className="list-group-item">
										<Row>
											<Col lg={6}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="email"
													label="Email"
													placeholder=""
													type="email"
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
											</Col>
											<Col lg={6}>
												<FormInput
													invalid={undefined}
													name="select"
													style={{
														height: 50,
													}}
													label="Select Thematique"
													type="select"
													containerClass="mb-3"
													className="form-select"
													value={inputs.thematique}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'thematique')
													}
													key="select"
													errors={'Samuel'}
													control={control}>
													<option defaultValue="selected">...</option>
													{teams?.map((item: any, index: any) => (
														<option key={index} value={item.id}>
															{
																showingTranslateValue(item?.translations, lang)
																	?.value
															}
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
											label="Select Type membre"
											type="select"
											containerClass="mb-3"
											className="form-select"
											value={inputs.typemembre}
											onChange={(e: any) =>
												handleOnChange(e.target.value, 'typemembre')
											}
											key="select"
											errors={'Samuel'}
											control={control}>
											<option defaultValue="selected">...</option>
											{Type?.map((item: any, index: any) => (
												<option key={index} value={item.value}>
													{item?.label}
												</option>
											))}
										</FormInput>
									</li>
									<li className="list-group-item">
										<FormInput
											invalid={undefined}
											name="select"
											style={{
												height: 50,
											}}
											label="Select Pays"
											type="select"
											containerClass="mb-3"
											className="form-select"
											value={inputs.country}
											onChange={(e: any) =>
												handleOnChange(e.target.value, 'country')
											}
											key="select"
											errors={'Samuel'}
											control={control}>
											<option defaultValue="selected">...</option>
											{countries?.map((item: any, index: any) => (
												<option key={index} value={item.id}>
													{item?.name}
												</option>
											))}
										</FormInput>
									</li>
									<li className="list-group-item">
										<Row>
											<Col lg={6}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="ville"
													label="Ville"
													placeholder=""
													type="text"
													className="form-control"
													errors={errors.ville}
													value={inputs.ville}
													onFocus={() => {
														hanldeError(null, 'ville')
													}}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'ville')
													}
												/>
											</Col>
											<Col lg={6}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="profession"
													label="profession"
													placeholder=""
													type="text"
													className="form-control"
													errors={errors.profession}
													value={inputs.profession}
													onFocus={() => {
														hanldeError(null, 'profession')
													}}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'profession')
													}
												/>
											</Col>
										</Row>
									</li>
									<li className="list-group-item">
										<Row>
											<Col lg={6}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="num_ordre"
													label="Numèro d'ordre(Facultatif)"
													placeholder=""
													type="text"
													className="form-control"
													errors={errors.num_ordre}
													value={inputs.num_ordre}
													onFocus={() => {
														hanldeError(null, 'num_ordre')
													}}
													onChange={(e: any) =>
														handleOnChange(e.target.value, 'num_ordre')
													}
												/>
											</Col>
											<Col lg={6}>
												<CustomInput
													multiple={undefined}
													accept={undefined}
													onChangeCapture={undefined}
													name="title"
													label="corporation(Facultatif)"
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
											</Col>
										</Row>
									</li>

									<li className="list-group-item">
										<span
											className="d-block justify-content-center text-center  align-items-center mx-auto relative"
											// onClick={pickImage}
											role="button">
											<img
												src={imageUrl ? imageUrl : member?.image}
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

export default EditMembers
