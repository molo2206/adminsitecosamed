import { Card, Col, Row, Form } from 'react-bootstrap'
import { useAuthContext } from '@/common'
import CustomInput from '@/components/form/CustomInput'
import CustomButton from '@/components/form/CustomButton'
import { useTranslation } from 'react-i18next'
import useSettings from '@/hooks/useSettings'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
const SettingLogo = () => {
	const { globalSetting, logo1, logo2, setLogo1, setLogo2 } = useAuthContext()
	const { t } = useTranslation()

	const { errors, hanldeError } = useValidation({})
	const { createSettings, loading } = useSettings()

	const validation = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!logo1) {
			hanldeError('Logo 1 us is required', 'logo1')
			valide = false
		}
		if (!logo2) {
			hanldeError('Logo 2 is required', 'logo2')
			valide = false
		}

		if (valide) {
			createSettings({})
		}
	}

	return (
		<>
			<PageBreadcrumb title="" subName={t('Logos')} />
			<Row>
				<Col xs={12}>
					<Card>
						<Card.Header></Card.Header>
						<Form className="form-horizontal" onSubmit={validation}>
							<ul className="list-group list-group-flush">
								<li className="list-group-item">
									<Row>
										<Col lg={6}>
											<CustomInput multiple={undefined}
												onChangeCapture={undefined}
												onFocus={undefined}
												name="name"
												label={'Logo 1'}
												placeholder=""
												type="file"
												className="form-control"
												errors={errors.logo1}
												accept="image/jpeg,image/png"
												onChange={(e:any) => {
													hanldeError(null, 'logo1')
													setLogo1(e.target.files[0])
												}}
											/>
											<img
												className="avatar avatar-sm rounded"
												src={globalSetting?.logo1}
											/>
										</Col>
										<Col lg={6}>
											<CustomInput multiple={undefined}
												onChangeCapture={undefined}
												onFocus={undefined}
												name="name"
												label={'Logo 2'}
												placeholder=""
												type="file"
												className="form-control"
												errors={errors.logo2}
												accept="image/jpeg,image/png"
												onChange={(e:any) => {
													hanldeError(null, 'logo2')
													setLogo2(e.target.files[0])
												}}
											/>
											<img
												className="avatar avatar-sm rounded"
												src={globalSetting?.logo2}
											/>
										</Col>
									</Row>
								</li>

								<li className="list-group-item">
									<Col lg={4}>
										<CustomButton label={'Save'} loading={loading} />
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

export default SettingLogo
