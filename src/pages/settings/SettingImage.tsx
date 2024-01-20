import { Card, Col, Row, Form } from 'react-bootstrap'
import { useAuthContext } from '@/common'
import CustomInput from '@/components/form/CustomInput'
import CustomButton from '@/components/form/CustomButton'
import { useTranslation } from 'react-i18next'
import useSettings from '@/hooks/useSettings'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
const SettingImage = () => {
	const {
		globalSetting,
		setImage1,
		setImage2,
		setImage3,
		setImage4,
		setImage5,
	} = useAuthContext()
	const { t } = useTranslation()

	const { errors, hanldeError } = useValidation({})
	const { createSettings, loading } = useSettings()

	const validation = (e: any) => {
		e.preventDefault()

		let valide = true

		if (valide) {
			createSettings({})
		}
	}

	return (
		<>
			<PageBreadcrumb title="" subName={t('Images')} />
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
												label={'Image 1 (400 X 540)'}
												placeholder=""
												type="file"
												className="form-control"
												errors={errors.image1}
												accept="image/jpeg"
												onChange={(e: any) => {
													hanldeError(null, 'image1')
													setImage1(e.target.files[0])
												}}
											/>
											<img
												className="avatar avatar-sm rounded"
												src={globalSetting?.image1}
											/>
										</Col>
										<Col lg={6}>
											<CustomInput multiple={undefined}
											
												onChangeCapture={undefined}
												onFocus={undefined}
												name="name"
												label={'Image 2 (850 X 550)'}
												placeholder=""
												type="file"
												accept="image/jpeg,image/png"
												className="form-control"
												errors={errors.image2}
												onChange={(e: any) => {
													hanldeError(null, 'image2')
													setImage2(e.target.files[0])
												}}
											/>
											<img
												className="avatar avatar-sm rounded"
												src={globalSetting?.image2}
											/>
										</Col>
									</Row>
								</li>
								<li className="list-group-item">
									<Row>
										<Col lg={6}>
											<CustomInput multiple={undefined}
											
												onChangeCapture={undefined}
												onFocus={undefined}
												name="name"
												label={'Image 3 (850 X 550)'}
												placeholder=""
												type="file"
												className="form-control"
												errors={errors.image3}
												accept="image/jpeg,image/png"
												onChange={(e: any) => {
													hanldeError(null, 'image3')
													setImage3(e.target.files[0])
												}}
											/>
											<img
												className="avatar avatar-sm rounded"
												src={globalSetting?.image3}
											/>
										</Col>
										<Col lg={6}>
											<CustomInput multiple={undefined}
												
												onChangeCapture={undefined}
												onFocus={undefined}
												name="name"
												label={'Image 4 (850 X 550)'}
												placeholder=""
												type="file"
												accept="image/jpeg,image/png"
												className="form-control"
												errors={errors.image4}
												onChange={(e: any) => {
													hanldeError(null, 'image4')
													setImage4(e.target.files[0])
												}}
											/>
											<img
												className="avatar avatar-sm rounded"
												src={globalSetting?.image4}
											/>
										</Col>
									</Row>
								</li>
								<li className="list-group-item">
									<Row>
										<Col lg={6}>
											<CustomInput multiple={undefined}
												
												onChangeCapture={undefined}
												onFocus={undefined}
												name="name"
												label={'Image 5 (850 X 550)'}
												placeholder=""
												type="file"
												className="form-control"
												errors={errors.image5}
												accept="image/jpeg,image/png"
												onChange={(e: any) => {
													hanldeError(null, 'image5')
													setImage5(e.target.files[0])
												}}
											/>
											<img
												className="avatar avatar-sm rounded"
												src={globalSetting?.image5}
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

export default SettingImage
