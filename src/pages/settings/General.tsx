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
			social_links:"shshhss"
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

		if (valide) {
			createSettings(inputs)
		}
	}

	useEffect(() => {
		setInputs({
			email: globalSetting?.emails || '',
			phone: globalSetting?.phones || '',
			app_name: globalSetting?.app_name || '',
			social_links:"shshhss"
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
