import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

// components
import PrivateRoute from './PrivateRoute'

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'))
const Register = React.lazy(() => import('../pages/auth/Register'))
const Logout = React.lazy(() => import('../pages/auth/Logout'))
const ForgotPassword = React.lazy(() => import('../pages/auth/ForgotPassword'))
const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'))

// // dashboard
const Dashboard = React.lazy(() => import('../pages/Dashboard'))

// // pages
const ProfilePages = React.lazy(() => import('../pages/other/Profile/'))

const MaintenancePages = React.lazy(() => import('../pages/other/Maintenance'))
const ListService = React.lazy(() => import('../pages/services/ListService'))
const CreateService = React.lazy(() => import('../pages/services/CreateService'))
const EditService = React.lazy(() => import('../pages/services/EditService'))

const ListPhoto = React.lazy(() => import('../pages/media/ListPhoto'))
const ListVideo = React.lazy(() => import('../pages/media/ListVideo'))
const ListRoles = React.lazy(() => import('../pages/roles/ListRoles'))
const ListTeam = React.lazy(() => import('../pages/team/ListTeam'))
const ListEvent = React.lazy(() => import('../pages/events/ListEvent'))
const ListTestimonials = React.lazy(() => import('../pages/testimonials/ListTestimonials'))
const ListBooks = React.lazy(
	() => import('../pages/books/ListBooks')
)
const ListMembers = React.lazy(() => import('../pages/membres/ListMembers'))
const Visa = React.lazy(() => import('../pages/demandes/Visa'))
const Travel = React.lazy(() => import('../pages/demandes/Travel'))
const DetailDemande = React.lazy(() => import('../pages/demandes/DetailDemande'))
const About = React.lazy(() => import('../pages/settings/About'))
const SettingLogo = React.lazy(() => import('../pages/settings/SettingLogo'))
const General = React.lazy(() => import('../pages/settings/General'))
const SettingImage = React.lazy(() => import('../pages/settings/SettingImage'))
const Addresses = React.lazy(() => import('../pages/settings/Addresses'))
const CreateEvent = React.lazy(() => import('../pages/events/CreateEvent'))
const EditEvent = React.lazy(() => import('../pages/events/EditEvent'))
const ListCategory = React.lazy(() => import('../pages/category/ListCategory'))
const ListCountries = React.lazy(
	() => import('../pages/countries/ListCountries')
)
const ListCities = React.lazy(() => import('../pages/countries/ListCities'))
const ListRessources = React.lazy(
	() => import('../pages/permissions/ListRessources')
)
const ListUsers = React.lazy(() => import('../pages/users/ListUsers'))
const RoleHasPermissions = React.lazy(
	() => import('../pages/roles/RoleHasPermissions')
)

const Error404 = React.lazy(() => import('../pages/error/Error404'))

const Error500 = React.lazy(() => import('../pages/error/Error500'))

export interface RoutesProps {
	path: RouteProps['path']
	name?: string
	element?: RouteProps['element']
	route?: any
	exact?: boolean
	icon?: string
	header?: string
	roles?: string[]
	children?: RoutesProps[]
	permissions:any
}

// dashboards
const dashboardRoutes: RoutesProps = {
	path: '/admin',
	name: 'Dashboards',
	icon: 'home',
	header: 'Navigation',
	permissions:"",
	children: [
		{
			path: '/',
			name: 'Root',
			element: <Dashboard />,
			route: PrivateRoute,
			permissions:""
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			element: <Dashboard />,
			route: PrivateRoute,
			permissions:""
		},
	],
}

// pages
const customPagesRoutes = {
	path: '/events',
	name: 'Pages',
	icon: 'pages',
	header: 'Custom',
	permissions: { ressource: 'Events', action: 'read' },
	
}


const otherRoutes: RoutesProps[] = [
	{
		path: '/roles',
		name: 'Roles',
		icon: 'pocket',
		permissions: { ressource: 'Events', action: 'read' },
		element: <ListRoles />,
		route: PrivateRoute,
		
	},
	{
		path: '/ressources',
		name: 'Ressouces',
		icon: 'pocket',
		element: <ListRessources />,
		permissions: { ressource: 'Permissions', action: 'read' },
		route: PrivateRoute,
	},
	{
		path: '/roles/permissions',
		name: 'Permissions',
		icon: 'pocket',
		element: <RoleHasPermissions />,
		route: PrivateRoute,
		permissions: { ressource: 'Roles', action: 'update' },
	},
	{
		path: '/users',
		name: 'Users',
		icon: 'pocket',
		element: <ListUsers />,
		route: PrivateRoute,
		permissions: { ressource: 'Users', action: 'read' },
	},
	{
		path: '/user/profile',
		name: 'Profile',
		element: <ProfilePages />,
		route: PrivateRoute,
		permissions: "",
	},
	{
		path: '/category',
		name: 'Categories',
		element: <ListCategory />,
		route: PrivateRoute,
		permissions: { ressource: 'Categories', action: 'read' },
	},
	{
		path: '/countries',
		name: 'Countries',
		element: <ListCountries />,
		route: PrivateRoute,
		permissions: { ressource: 'Countries', action: 'read' },
	},
	{
		path: '/cities',
		name: 'Cities',
		element: <ListCities />,
		route: PrivateRoute,
		permissions: { ressource: 'Cities', action: 'read' },
	},
	{
		path: '/team',
		name: 'Team',
		element: <ListTeam />,
		route: PrivateRoute,
		permissions: { ressource: 'Team', action: 'read' },
	},
	{
		path: '/settings/about-us',
		name: 'About',
		element: <About />,
		route: PrivateRoute,
		permissions: { ressource: 'Settings', action: 'read' },
	},
	{
		path: '/settings/logo',
		name: 'Logos',
		element: <SettingLogo />,
		route: PrivateRoute,
		permissions: { ressource: 'Settings', action: 'read' },
	},
	{
		path: '/settings/images',
		name: 'Images',
		element: <SettingImage />,
		route: PrivateRoute,
		permissions: { ressource: 'Settings', action: 'read' },
	},
	{
		path: '/settings/addresses',
		name: 'Addresses',
		element: <Addresses />,
		route: PrivateRoute,
		permissions: { ressource: 'Settings', action: 'read' },
	},
	{
		path: '/demandes/visa',
		name: 'Visa',
		element: <Visa />,
		route: PrivateRoute,
		permissions: { ressource: 'Requests', action: 'read' },
	},
	{
		path: '/demandes/voyage',
		name: 'Travel',
		element: <Travel />,
		route: PrivateRoute,
		permissions: { ressource: 'Requests', action: 'read' },
	},
	{
		path: '/demande/:id',
		name: 'Request',
		element: <DetailDemande />,
		route: PrivateRoute,
		permissions: { ressource: 'Requests', action: 'read' },
	},
	{
		path: '/settings/general',
		name: 'Settings',
		element: <General />,
		route: PrivateRoute,
		permissions: { ressource: 'Settings', action: 'read' },
	},
	{
		path: '/events/create',
		name: 'Create Event',
		element: <CreateEvent />,
		route: PrivateRoute,
		permissions: { ressource: 'Events', action: 'create' },
	},
	{
		path: '/events/edit/:id',
		name: 'Edit Event',
		element: <EditEvent />,
		route: PrivateRoute,
		permissions: { ressource: 'Events', action: 'update' },
	},
	{
		path: '/events/list',
		name: 'Event List',
		element: <ListEvent />,
		route: PrivateRoute,
		permissions: { ressource: 'Events', action: 'read' },
	},
	{
		path: '/services/create',
		name: 'Create Service',
		element: <CreateService />,
		route: PrivateRoute,
		permissions: { ressource: 'Services', action: 'create' },
	},
	{
		path: '/services/edit/:id',
		name: 'Edit Service',
		element: <EditService />,
		route: PrivateRoute,
		permissions: { ressource: 'Services', action: 'update' },
	},
	{
		path: '/services/list',
		name: 'Service List',
		element: <ListService />,
		route: PrivateRoute,
		permissions: { ressource: 'Services', action: 'read' },
	},
	{
		path: '/testimonials/list',
		name: 'Testimonials List',
		element: <ListTestimonials />,
		route: PrivateRoute,
		permissions: { ressource: 'Testimonials', action: 'read' },
	},
	{
		path: '/books/list',
		name: 'Books List',
		element: <ListBooks />,
		route: PrivateRoute,
		permissions: { ressource: 'Books', action: 'read' },
	},
	{
		path: '/members/list',
		name: 'Members List',
		element: <ListMembers />,
		route: PrivateRoute,
		permissions: { ressource: 'Members', action: 'read' },
	},
	{
		path: '/gallery/photo',
		name: 'Gallery Photos',
		element: <ListPhoto />,
		route: PrivateRoute,
		permissions: { ressource: 'Photos', action: 'read' },
	},
	{
		path: '/gallery/videos',
		name: 'Gallery Videos',
		element: <ListVideo />,
		route: PrivateRoute,
		permissions: { ressource: 'Videos', action: 'read' },
	},
]

// auth
const authRoutes: RoutesProps[] = [
	{
		path: '/auth/login',
		name: 'Login',
		element: <Login />,
		route: Route,
		permissions:""
	},
	{
		path: '/auth/register',
		name: 'Register',
		element: <Register />,
		route: Route,
		permissions:""
	},
	{
		path: '/auth/logout',
		name: 'Logout',
		element: <Logout />,
		route: Route,
		permissions:""
	},
	{
		path: '/auth/forgot-password',
		name: 'Forgot Password',
		element: <ForgotPassword />,
		route: Route,
		permissions:""
	},
	{
		path: '/auth/lock-screen',
		name: 'Lock Screen',
		element: <LockScreen />,
		route: Route,
		permissions:""
	},
]

// public routes
const otherPublicRoutes = [
	{
		path: '*',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
		permissions:""
		
	},
	{
		path: 'pages/error-404',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
		permissions:""
	},
	{
		path: 'pages/error-500',
		name: 'Error - 500',
		element: <Error500 />,
		route: Route,
		permissions:""
	},
	{
		path: '/pages/maintenance',
		name: 'Maintenance',
		element: <MaintenancePages />,
		route: Route,
		permissions:""
	},
]

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
	let flatRoutes: RoutesProps[] = []

	routes = routes || []
	routes.forEach((item: RoutesProps) => {
		flatRoutes.push(item)
		if (typeof item.children !== 'undefined') {
			flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)]
		}
	})
	return flatRoutes
}

// All routes
const authProtectedRoutes = [dashboardRoutes, customPagesRoutes, ...otherRoutes]
const publicRoutes = [...authRoutes, ...otherPublicRoutes]

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes])
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes])
export {
	publicRoutes,
	authProtectedRoutes,
	authProtectedFlattenRoutes,
	publicProtectedFlattenRoutes,
}
