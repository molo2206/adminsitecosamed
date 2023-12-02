import { Link, Navigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthLayout from '../AuthLayout'
import useLogin from './useLogin'
import CustomButton from '@/components/form/CustomButton'

// components
import { VerticalForm, FormInput, PageBreadcrumb } from '@/components'

interface UserData {
	email: string
	password: string
}

const schemaResolver = yupResolver(
	yup.object().shape({
		email: yup.string().required('Please enter email'),
		password: yup.string().required('Please enter Password'),
	})
)
const Login = () => {
	const { loading, login, redirectUrl, isAuthenticated } = useLogin()
	return (
		<>
			<PageBreadcrumb title="Log In" />

			{isAuthenticated && <Navigate to={redirectUrl} replace />}

			<AuthLayout
				authTitle="Sign In"
				helpText="Enter your email address and password to access account."
				//bottomLinks={<BottomLinks />}
				hasThirdPartyLogin>
				<VerticalForm<UserData>
					onSubmit={login}
					resolver={schemaResolver}
					defaultValues={{ email: '', password: '' }}>
					<FormInput
						invalid={undefined}
						label="Email address"
						type="text"
						name="email"
						placeholder="Enter your email"
						containerClass="mb-3"
						required
					/>
					<FormInput
						invalid={undefined}
						label="Password"
						name="password"
						type="password"
						required
						id="password"
						placeholder="Enter your password"
						containerClass="mb-3">
						<Link to="/auth/forgot-password" className="text-muted float-end">
							<small>Forgot your password?</small>
						</Link>
					</FormInput>
					<FormInput
						invalid={undefined}
						label="Remember me"
						type="checkbox"
						name="checkbox"
						containerClass={'mb-3'}
					/>
					<div className="mb-0 text-start">
						<CustomButton loading={loading} label="Login" />
					</div>
				</VerticalForm>
			</AuthLayout>
		</>
	)
}

export default Login
