import { Image } from 'react-bootstrap'
import { ThemeSettings, useThemeContext } from '@/common'
import { Link } from 'react-router-dom'
import { useAuthContext } from '@/common'

// components
import { LanguageDropdown, ProfileDropdown } from '@/components'
import { useThemeCustomizer } from '@/components'
import { useViewport } from '@/hooks'
/**
 * for subtraction minutes
 */

export interface MessageItem {
	id: number
	name: string
	subText: string
	avatar: string
	createdAt: Date
}

export interface NotificationItem {
	id: number
	title: string
	icon: string
	variant: string
	createdAt: Date
}

export interface ProfileOption {
	label: string
	icon: string
	redirectTo: string
}

const profileMenus: ProfileOption[] = [
	{
		label: 'My Account',
		icon: 'ri-account-circle-line',
		redirectTo: '/user/profile',
	},
	// {
	// 	label: 'Settings',
	// 	icon: 'ri-settings-4-line',
	// 	redirectTo: '/pages/profile',
	// },
	{
		label: 'Logout',
		icon: 'ri-logout-box-line',
		redirectTo: '/auth/logout',
	},
]

type TopbarProps = {
	topbarDark?: boolean
	toggleMenu?: () => void
	navOpen?: boolean
}
const Topbar = ({ toggleMenu, navOpen }: TopbarProps) => {
	const { sideBarType } = useThemeCustomizer()
	const { width } = useViewport()

	/**
	 * Toggle the leftmenu when having mobile screen
	 */

	const handleLeftMenuCallBack = () => {
		if (width < 768) {
			if (sideBarType === 'full') {
				showLeftSideBarBackdrop()
				document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
			} else {
				updateSidebar({ size: ThemeSettings.sidebar.size.full })
			}
		} else if (sideBarType === 'condensed') {
			updateSidebar({ size: ThemeSettings.sidebar.size.default })
		} else if (sideBarType === 'full') {
			showLeftSideBarBackdrop()
			document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
		} else if (sideBarType === 'fullscreen') {
			updateSidebar({ size: ThemeSettings.sidebar.size.default })
			document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
		} else {
			updateSidebar({ size: ThemeSettings.sidebar.size.condensed })
		}
	}

	/**
	 * creates backdrop for leftsidebar
	 */
	function showLeftSideBarBackdrop() {
		const backdrop = document.createElement('div')
		backdrop.id = 'custom-backdrop'
		backdrop.className = 'offcanvas-backdrop fade show'
		document.body.appendChild(backdrop)

		backdrop.addEventListener('click', function () {
			document
				.getElementsByTagName('html')[0]
				.classList.remove('sidebar-enable')
			hideLeftSideBarBackdrop()
		})
	}

	function hideLeftSideBarBackdrop() {
		const backdrop = document.getElementById('custom-backdrop')
		if (backdrop) {
			document.body.removeChild(backdrop)
			document.body.style.removeProperty('overflow')
		}
	}
	const { settings, updateSettings, updateSidebar } = useThemeContext()

	/**
	 * Toggle Dark Mode
	 */
	const toggleDarkMode = () => {
		if (settings.theme === 'dark') {
			updateSettings({ theme: ThemeSettings.theme.light })
		} else {
			updateSettings({ theme: ThemeSettings.theme.dark })
		}
	}

	const { user, globalSetting } = useAuthContext()

	return (
		<>
			<div className="navbar-custom">
				<div className="topbar container-fluid">
					<div className="d-flex align-items-center gap-1">
						{/* Topbar Brand Logo */}
						<div className="logo-topbar">
							{/* Logo light */}
							<Link to="/" className="logo-light">
								<span className="logo-lg">
									<Image src={globalSetting?.logo1} alt="logo" />
								</span>
								<span className="logo-sm">
									<Image src={globalSetting?.logo1} alt="small logo" />
								</span>
							</Link>
							{/* Logo Dark */}
							<Link to="/" className="logo-dark">
								<span className="logo-lg">
									<img src={globalSetting?.logo1} alt="dark logo" />
								</span>
								<span className="logo-sm">
									<img src={globalSetting?.logo1} alt="small logo" />
								</span>
							</Link>
						</div>
						{/* Sidebar Menu Toggle Button */}
						<button
							className="button-toggle-menu"
							onClick={handleLeftMenuCallBack}>
							<i className="ri-menu-line" />
						</button>
						{/* Horizontal Menu Toggle Button */}
						<button
							className={`navbar-toggle ${navOpen ? 'open' : ''}`}
							data-bs-toggle="collapse"
							data-bs-target="#topnav-menu-content"
							onClick={toggleMenu}>
							<div className="lines">
								<span />
								<span />
								<span />
							</div>
						</button>
						{/* Topbar Search Form */}
						<div className="app-search d-none d-lg-block">
							{/* <form>
								<div className="input-group">
									<input
										type="search"
										className="form-control"
										placeholder="Search..."
									/>
									<span className="ri-search-line search-icon text-muted" />
								</div>
							</form> */}
						</div>
					</div>
					<ul className="topbar-menu d-flex align-items-center gap-3">
						{/* <li className="dropdown d-lg-none">
							<SearchDropDown />
						</li> */}
						<li className="dropdown">
							<LanguageDropdown />
						</li>
						{/* <li className="dropdown notification-list">
							<MessageDropdown messages={Messages} />
						</li>
						<li className="dropdown notification-list">
							<NotificationDropdown notifications={Notifications} />
						</li> */}
						{/* <li className="d-none d-sm-inline-block">
							<button className="nav-link" onClick={handleRightSideBar}>
								<i className="ri-settings-3-line fs-22" />
							</button>
						</li> */}
						<li className="d-none d-sm-inline-block">
							<div
								className="nav-link"
								id="light-dark-mode"
								onClick={toggleDarkMode}>
								<i className="ri-moon-line fs-22" />
							</div>
						</li>
						<li className="dropdown">
							<ProfileDropdown
								menuItems={profileMenus}
								userImage={user?.image}
								username={user?.full_name}
							/>
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}

export default Topbar
