import { useEffect } from 'react'
import { Card, Col, Row, Form } from 'react-bootstrap'

import { useAuthContext } from '@/common'
import CustomInput from '@/components/form/CustomInput'
import CustomButton from '@/components/form/CustomButton'
import { useTranslation } from 'react-i18next'
import useSettings from '@/hooks/useSettings'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
const General = () => {
	const { globalSetting } = useAuthContext()
	const { createSettings, loading } = useSettings()
	const { t } = useTranslation()
	const { inputs, errors, handleOnChange, hanldeError, setInputs } =
		useValidation({
			email: globalSetting?.emails || '',
			phone: globalSetting?.phones || '',
			app_name: globalSetting?.app_name || '',
			stripe: globalSetting?.stripe || '',
			facebook: '',
			twitter: '',
			youtube: '',
			linkedin: '',
		})

	const validation = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!inputs.app_name) {
			hanldeError('This field is required', 'app_name')
			valide = false
		}
		if (!inputs.email) {
			hanldeError('This field is required', 'email')
			valide = false
		}
		if (!inputs.phone) {
			hanldeError('This field is required', 'phone')
			valide = false
		}
		if (!inputs.facebook) {
			hanldeError('This field is required', 'facebook')
			valide = false
		}
		if (!inputs.twitter) {
			hanldeError('This field is required', 'twitter')
			valide = false
		}
		if (!inputs.youtube) {
			hanldeError('This field is required', 'youtube')
			valide = false
		}
		if (!inputs.linkedin) {
			hanldeError('This field is required', 'linkedin')
			valide = false
		}

		if (valide) {
			createSettings(inputs)
		}
	}

	useEffect(() => {
		const social_links = JSON.parse(globalSetting?.social_links || '{}')
		setInputs({
			email: globalSetting?.emails || '',
			phone: globalSetting?.phones || '',
			app_name: globalSetting?.app_name || '',
			stripe: globalSetting?.stripe || '',
			facebook: social_links?.facebook || '',
			twitter: social_links?.twitter || '',
			youtube: social_links?.youtube || '',
			linkedin: social_links?.linkedin || '',
		})
	}, [globalSetting])
	return (
		<>
			<PageBreadcrumb title="" subName={t('About')} />
			<Row>
				<Col xs={12}>
					<Card>
						<Card.Header>
							<Col lg={3}></Col>
						</Card.Header>
						<Form className="form-horizontal" onSubmit={validation}>
							<ul className="list-group list-group-flush">
								<Row>
									<Col lg={6} md={6}>
										<li className="list-group-item">
											<CustomInput
												multiple={undefined}
												accept={undefined}
												onChangeCapture={undefined}
												name="app_name"
												label={t('AppName')}
												placeholder=""
												type="text"
												className="form-control"
												errors={errors.app_name}
												value={inputs.app_name}
												onFocus={() => {
													hanldeError(null, 'app_name')
												}}
												onChange={(e: any) =>
													handleOnChange(e.target.value, 'app_name')
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
												name="phone"
												label={t('Phone')}
												placeholder=""
												type="text"
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
										</li>
										<li className="list-group-item">
											<CustomInput
												multiple={undefined}
												accept={undefined}
												onChangeCapture={undefined}
												name="stripe"
												label={'Stripe Key'}
												placeholder=""
												type="text"
												className="form-control"
												errors={errors.stripe}
												value={inputs.stripe}
												onFocus={() => {
													hanldeError(null, 'stripe')
												}}
												onChange={(e: any) =>
													handleOnChange(e.target.value, 'stripe')
												}
											/>
										</li>
									</Col>
									<Col lg={6} md={6}>
										<li className="list-group-item">
											<CustomInput
												multiple={undefined}
												accept={undefined}
												onChangeCapture={undefined}
												name="facebook"
												label={t('Facebook')}
												placeholder=""
												type="text"
												className="form-control"
												errors={errors.facebook}
												value={inputs.facebook}
												onFocus={() => {
													hanldeError(null, 'facebook')
												}}
												onChange={(e: any) =>
													handleOnChange(e.target.value, 'facebook')
												}
											/>
										</li>
										<li className="list-group-item">
											<CustomInput
												multiple={undefined}
												accept={undefined}
												onChangeCapture={undefined}
												name="twitter"
												label={t('Twitter')}
												placeholder=""
												type="text"
												className="form-control"
												errors={errors.twitter}
												value={inputs.twitter}
												onFocus={() => {
													hanldeError(null, 'twitter')
												}}
												onChange={(e: any) =>
													handleOnChange(e.target.value, 'twitter')
												}
											/>
										</li>
										<li className="list-group-item">
											<CustomInput
												multiple={undefined}
												accept={undefined}
												onChangeCapture={undefined}
												name="youtube"
												label={t('Youtube')}
												placeholder=""
												type="text"
												className="form-control"
												errors={errors.youtube}
												value={inputs.youtube}
												onFocus={() => {
													hanldeError(null, 'youtube')
												}}
												onChange={(e: any) =>
													handleOnChange(e.target.value, 'youtube')
												}
											/>
										</li>
										<li className="list-group-item">
											<CustomInput
												multiple={undefined}
												accept={undefined}
												onChangeCapture={undefined}
												name="linkedin"
												label={t('Linkedin')}
												placeholder=""
												type="text"
												className="form-control"
												errors={errors.linkedin}
												value={inputs.linkedin}
												onFocus={() => {
													hanldeError(null, 'linkedin')
												}}
												onChange={(e: any) =>
													handleOnChange(e.target.value, 'linkedin')
												}
											/>
										</li>
									</Col>
								</Row>
								<li className="list-group-item">
									<Col lg={4}>
										<CustomButton loading={loading} label={'Save'} />
									</Col>
								</li>
							</ul>
						</Form>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default General
