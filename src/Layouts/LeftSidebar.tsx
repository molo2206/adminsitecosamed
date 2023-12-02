import { Link } from 'react-router-dom'
import AppMenu from './Menu'
import SimpleBar from 'simplebar-react'
import { useAuthContext } from '@/common'
import { MENU_ITEMS } from '@/constants/menu'
import { getAllowedRoutes } from '@/utils/heleprs'

/* Sidebar content */
const SideBarContent = () => {
	const {user} = useAuthContext()
	return (
		<>
			<AppMenu menuItems={getAllowedRoutes(MENU_ITEMS, user)} />
			<div className="clearfix" />
		</>
	)
}
const LeftSidebar = () => {
	const {globalSetting} = useAuthContext()
	return (
		<>
			<div className="leftside-menu">
				{/* Brand Logo Light */}
				<Link to="/" className="logo logo-light">
					<span className="logo-lg">
						<img src={globalSetting?.logo1} alt="logo" />
					</span>
					<span className="logo-sm">
						<img src={globalSetting?.logo1} alt="small logo" />
					</span>
				</Link>
				{/* Brand Logo Dark */}
				<a href="index.html" className="logo logo-dark">
					<span className="logo-lg">
						<img src={globalSetting?.logo1} alt="dark logo" />
					</span>
					<span className="logo-sm">
						<img src={globalSetting?.logo1} alt="small logo" />
					</span>
				</a>
				{/* Sidebar -left */}
				<SimpleBar
					className="h-100"
					id="leftside-menu-container"
					data-simplebar=""
				>
					{/*- Sidemenu */}
					<SideBarContent />
					{/*- End Sidemenu */}
					<div className="clearfix" />
				</SimpleBar>
			</div>
		</>
	)
}

export default LeftSidebar
