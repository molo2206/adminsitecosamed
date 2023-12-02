import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// All layouts containers
import DefaultLayout from '../Layouts/Default'
import { getAllowedRoutes } from '@/utils/heleprs'
import VerticalLayout from '../Layouts/Vertical'
import HorizontalLayout from '../Layouts/Horizontal'
import DeleteModal from '@/components/Modals/DeleteModal'
import {
	authProtectedFlattenRoutes,
	publicProtectedFlattenRoutes,
} from './index'
import {
	ThemeSettings,
	useAuthContext,
	useThemeContext,
} from '../common/context'
interface IRoutesProps {}

const AllRoutes = (props: IRoutesProps) => {
	const { settings } = useThemeContext()

	const Layout =
		settings.layout.type === ThemeSettings.layout.type.vertical
			? VerticalLayout
			: HorizontalLayout
	// const api = new APICore()
	const { isAuthenticated, modalDelete, toggleModalDelete,user } = useAuthContext()
	return (
		<React.Fragment>
			<DeleteModal isOpen={modalDelete} close={toggleModalDelete} />
			<Routes>
				<Route>
					{publicProtectedFlattenRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={
								<DefaultLayout {...props}>{route.element}</DefaultLayout>
							}
							key={idx}
						/>
					))}
				</Route>

				<Route>
					{getAllowedRoutes(authProtectedFlattenRoutes, user)?.map((route:any, idx:number) => (
						<Route
							path={route.path}
							element={
								isAuthenticated === false ? (
									<Navigate
										to={{
											pathname: '/auth/login',
										}}
									/>
								) : (
									<Layout {...props}>{route.element}</Layout>
								)
							}
							key={idx}
						/>
					))}
				</Route>
			</Routes>
		</React.Fragment>
	)
}

export default AllRoutes
