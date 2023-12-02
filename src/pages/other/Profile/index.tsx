import { Button, Card, Col, Image, Nav, Row, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useUsers from '@/hooks/useUsers'
import { useAuthContext } from '@/common'
import CustomButton from '@/components/form/CustomButton'
import { useEffect, useRef, useState } from 'react'
import ImageCroper from '@/components/FileUploader/ImageCrop'
import MainModal from '@/components/Modals/MainModal'

import { FormInput } from '@/components'
// images
import bgProfile from '@/assets/images/bg-profile.jpg'
import useValidation from '@/hooks/useValidation'

// components
import CustomInput from '@/components/form/CustomInput'

const ProfilePages = () => {
	const { user, isOpen, setIsOpen } = useAuthContext()
	const [imageUrl, setImageUrl] = useState<any>(null)
	const { update_profile, loading } = useUsers()
	const { update_password, loading: loadingPassword } = useUsers()
	const { update_image, loading: loadingImage } = useUsers()
	const pickRef = useRef<any>(null)

	const { inputs, errors, handleOnChange, hanldeError, setInputs } =
		useValidation({
			full_name: user?.full_name || '',
			email: user?.email || '',
			phone: user?.phone || '',
			gender: user?.gender || '',

			old_password: '',
			new_password: '',
		})

	useEffect(() => {
		setInputs({
			full_name: user?.full_name || '',
			email: user?.email || '',
			phone: user?.phone || '',
			gender: user?.gender || '',
		})
	}, [user])

	const validation = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!inputs.full_name) {
			hanldeError('Full Name is required', 'full_name')
			valide = false
		}
		if (!inputs.email) {
			hanldeError('Email is required', 'email')
			valide = false
		}
		if (!inputs.phone) {
			hanldeError('Phone is required', 'phone')
			valide = false
		}

		if (valide) {
			update_profile(inputs)
		}
	}

	const validation_password = (e: any) => {
		e.preventDefault()

		let valide = true
		if (!inputs.old_password) {
			hanldeError('Old Password is required', 'old_password')
			valide = false
		}
		if (!inputs.new_password) {
			hanldeError('New Password is required', 'new_password')
			valide = false
		}
		if (valide) {
			update_password(inputs)
		}
	}

	const pickImage = () => {
		pickRef.current.click()
	}

	const onChange = (e: any) => {
		e.preventDefault()
		setImageUrl(URL.createObjectURL(e.target.files[0]))
		setIsOpen(true)
		//update_image(e.target.files[0])
	}

	const close = () => {
		setIsOpen(false)
	}

	const onValidate = (data: any) => {
		setIsOpen(!isOpen)
		update_image(data)
	}

	return (
		<>
			<div>
				<Row>
					<MainModal
						size={'xl'}
						title={'Crop Image'}
						show={isOpen}
						close={close}>
						<ImageCroper onValidate={onValidate} url={imageUrl} />
					</MainModal>
					<Col sm={12}>
						<div
							className="profile-bg-picture"
							style={{ backgroundImage: `url(${bgProfile})` }}>
							<span className="picture-bg-overlay" />
						</div>
						<div className="profile-user-box">
							<Row>
								<Col sm={6}>
									<div className="profile-user-img">
										<Image
											src={user?.image}
											className="avatar-lg rounded-circle"
											alt="user"
										/>
									</div>
									<div>
										<h4 className="mt-4 fs-17 ellipsis">{user?.full_name}</h4>
										<p className="font-13"> {user?.email}</p>
										<p className="text-muted mb-0"></p>
									</div>
								</Col>
								<Col sm={6}>
									<div className="d-flex justify-content-end align-items-center gap-2">
										<Button
											disabled={loadingImage}
											onClick={pickImage}
											type="button"
											variant="soft-danger">
											<i className="ri-image-2-line align-text-bottom me-1 fs-16 lh-1" />{' '}
											Edit Picture
										</Button>
										<input
											onChange={onChange}
											type={'file'}
											className="d-none"
											ref={pickRef}
										/>
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm={12}>
						<Card className="p-0">
							<Card.Body className="p-0">
								<div className="profile-content">
									<Tab.Container defaultActiveKey="About">
										<Nav as="ul" justify className="nav-underline gap-0">
											<Nav.Item as="li">
												<Nav.Link
													as={Link}
													type="button"
													to="#"
													eventKey="Settings">
													Informations
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link
													type="button"
													as={Link}
													to="#"
													eventKey="Projects">
													Change Password
												</Nav.Link>
											</Nav.Item>
										</Nav>
										<Tab.Content className="m-0 p-4">
											<Tab.Pane
												eventKey="Settings"
												tabIndex={0}
												id="edit-profile">
												<div className="user-profile-content">
													<form onSubmit={validation}>
														<Row className="row-cols-sm-2 row-cols-1">
															<CustomInput
																multiple={undefined}
																accept={undefined}
																onChangeCapture={undefined}
																onFocus={undefined}
																name="name"
																label={'Full Name'}
																placeholder=""
																type="text"
																className="form-control"
																value={inputs.full_name}
																onChange={(e: any) => {
																	e.preventDefault()
																	hanldeError(null, 'full_name')
																	handleOnChange(e.target.value, 'full_name')
																}}
																key="select"
																errors={errors.full_name}
															/>
															<CustomInput
																multiple={undefined}
																accept={undefined}
																onChangeCapture={undefined}
																onFocus={undefined}
																name="email"
																label={'Email'}
																placeholder=""
																type="text"
																className="form-control"
																value={inputs.email}
																onChange={(e: any) => {
																	e.preventDefault()
																	hanldeError(null, 'email')
																	handleOnChange(e.target.value, 'email')
																}}
																key="select"
																errors={errors.email}
															/>
															<CustomInput
																multiple={undefined}
																accept={undefined}
																onChangeCapture={undefined}
																onFocus={undefined}
																name="phone"
																label={'Phone'}
																placeholder=""
																type="text"
																className="form-control"
																value={inputs.phone}
																onChange={(e: any) => {
																	e.preventDefault()
																	hanldeError(null, 'phone')
																	handleOnChange(e.target.value, 'phone')
																}}
																key="select"
																errors={errors.phone}
															/>
															<FormInput
																invalid={undefined}
																style={{ height: 50 }}
																name="select"
																label="Gender"
																type="select"
																containerClass="mb-3"
																className="form-select"
																key="select"
																value={inputs.gender}
																onChange={(e: any) => {
																	e.preventDefault()
																	hanldeError(null, 'gender')
																	handleOnChange(e.target.value, 'gender')
																}}
																errors={errors.gender}>
																<option defaultValue="selected">...</option>
																<option value={'Man'}>Man</option>
																<option value={'Woman'}>Woman</option>
															</FormInput>
														</Row>
														<Col lg={3}>
															<CustomButton label="Save" loading={loading} />
														</Col>
													</form>
												</div>
											</Tab.Pane>
											<Tab.Pane eventKey="Projects" id="projects">
												<Row className="m-t-10">
													<Col md={12}>
														<form onSubmit={validation_password}>
															<Row className="row-cols-sm-2 row-cols-1">
																<CustomInput
																	multiple={undefined}
																	accept={undefined}
																	onChangeCapture={undefined}
																	onFocus={undefined}
																	name="name"
																	label={'Old Password'}
																	placeholder=""
																	type="password"
																	className="form-control"
																	value={inputs.old_password}
																	onChange={(e: any) => {
																		e.preventDefault()
																		hanldeError(null, 'old_password')
																		handleOnChange(
																			e.target.value,
																			'old_password'
																		)
																	}}
																	key="select"
																	errors={errors.old_password}
																/>
																<CustomInput
																	multiple={undefined}
																	accept={undefined}
																	onChangeCapture={undefined}
																	onFocus={undefined}
																	name="email"
																	label={'New Password'}
																	placeholder=""
																	type="password"
																	className="form-control"
																	value={inputs.new_password}
																	onChange={(e: any) => {
																		e.preventDefault()
																		hanldeError(null, 'new_password')
																		handleOnChange(
																			e.target.value,
																			'new_password'
																		)
																	}}
																	key="select"
																	errors={errors.new_password}
																/>
															</Row>
															<Col lg={3}>
																<CustomButton
																	label="Save"
																	loading={loadingPassword}
																/>
															</Col>
														</form>
													</Col>
												</Row>
											</Tab.Pane>
										</Tab.Content>
									</Tab.Container>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default ProfilePages
