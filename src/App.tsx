import configureFakeBackend from './common/api/fake-backend'
import { AuthProvider, ThemeProvider } from './common/context'
import AllRoutes from './routes/Routes'
import { AxiosInterceptor } from './services/Instance'
import { ToastProvider } from 'react-toast-notifications'
import './assets/scss/app.scss'
import './assets/scss/icons.scss'

configureFakeBackend()

function App() {
	return (
		<ToastProvider>
			<ThemeProvider>
				<AxiosInterceptor>
					<AuthProvider>
						<AllRoutes />
					</AuthProvider>
				</AxiosInterceptor>
			</ThemeProvider>
		</ToastProvider>
	)
}

export default App
