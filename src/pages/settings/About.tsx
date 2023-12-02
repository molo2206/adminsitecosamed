import { useEffect } from 'react'
import { Card, Col, Row, Form } from 'react-bootstrap'

import { useAuthContext } from '@/common'
import { FormInput } from '@/components'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/form/CustomButton'
import { useTranslation } from 'react-i18next'
import CustomEditor from '@/components/form/CustomEditor'
import useSettings from '@/hooks/useSettings'
import { showingTranslateValue } from '@/utils/heleprs'
import useValidation from '@/hooks/useValidation'
import { PageBreadcrumb } from '@/components'
const About = () => {
	const {
		languages,
		changePageLang,
		globalSetting,
		pageLang,
	} = useAuthContext()
	const { createSettings, loading } = useSettings()
	const { t } = useTranslation()
	const { inputs, errors, handleOnChange, hanldeError, setInputs } =
		useValidation({
			about_us:
				showingTranslateValue(globalSetting?.translations, pageLang)
					?.about_us || '',
			mission:
				showingTranslateValue(globalSetting?.translations, pageLang)?.mission ||
				'',
			vision:
				showingTranslateValue(globalSetting?.translations, pageLang)?.vision ||
				'',
			history:
				showingTranslateValue(globalSetting?.translations, pageLang)?.history ||
				'',
			values: '',
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
		if (!inputs.about_us) {
			hanldeError('About us is required', 'about_us')
			valide = false
		}
		if (!inputs.mission) {
			hanldeError('Mission is required', 'mission')
			valide = false
		}
		if (!inputs.vision) {
			hanldeError('Vision is required', 'mission')
			valide = false
		}
		if (!inputs.history) {
			hanldeError('History is required', 'history')
			valide = false
		}

		if (valide) {
			createSettings({
				about_us: inputs.about_us,
				mission: inputs.mission,
				vision: inputs.vision,
				history: inputs.history,
				locale: pageLang,
			})
		}
	}

	useEffect(() => {
		setInputs({
			about_us:
				showingTranslateValue(globalSetting?.translations, pageLang)
					?.about_us || '',
			mission:
				showingTranslateValue(globalSetting?.translations, pageLang)?.mission ||
				'',
			vision:
				showingTranslateValue(globalSetting?.translations, pageLang)?.vision ||
				'',
			history:
				showingTranslateValue(globalSetting?.translations, pageLang)?.history ||
				'',
			values: '',
		})
	}, [globalSetting, pageLang])
	return (
		<>
			<PageBreadcrumb title="" subName={t('About')} />
			<Row>
				<Col xs={12}>
					<Card>
						<Card.Header>
							<Col lg={3}>
								<FormInput
								invalid={undefined}
									name="select"
									label="Select Role"
									type="select"
									containerClass="mb-3"
									className="form-select"
									register={register}
									key="select"
									onChange={(e) => changePageLang(e.target.value)}
									errors={err}
									value={pageLang}
									control={control}>
									<option defaultValue="selected">...</option>
									{languages?.map((item:any, index:any) => (
										<option key={index} value={item.iso}>
											{item.name}
										</option>
									))}
								</FormInput>
							</Col>
						</Card.Header>
						<Form className="form-horizontal" onSubmit={validation}>
							<ul className="list-group list-group-flush">
								<li className="list-group-item">
									<CustomEditor
										error={errors.about_us}
										label={t('About us')}
										value={inputs.about_us}
										onFocus={() => {
											hanldeError(null, 'about_us')
										}}
										onChange={(text: any) => handleOnChange(text, 'about_us')}
									/>
								</li>
								<li className="list-group-item">
									<CustomEditor
										error={errors.mission}
										label={t('Mission')}
										value={inputs.mission}
										onFocus={() => {
											hanldeError(null, 'mission')
										}}
										onChange={(text: any) => handleOnChange(text, 'mission')}
									/>
								</li>
								<li className="list-group-item">
									<CustomEditor
										label={t('Vision')}
										error={errors.vision}
										value={inputs.vision}
										onFocus={() => {
											hanldeError(null, 'vision')
										}}
										onChange={(text: any) => handleOnChange(text, 'vision')}
									/>
								</li>
								<li className="list-group-item">
									<CustomEditor
										label={t('History')}
										value={inputs.history}
										error={errors.history}
										onFocus={() => {
											hanldeError(null, 'history')
										}}
										onChange={(text: any) => handleOnChange(text, 'history')}
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

export default About
