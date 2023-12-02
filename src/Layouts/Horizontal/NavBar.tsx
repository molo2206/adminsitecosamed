import { Collapse, Container } from 'react-bootstrap'
import AppMenu from './Menu'
import { MENU_ITEMS } from '@/constants/menu'
import { getAllowedRoutes } from '@/utils/heleprs'
import { useAuthContext } from '@/common'

type NavbarProps = {
	isMenuOpened?: boolean
}
const NavBar = ({ isMenuOpened }: NavbarProps) => {
	const {user} = useAuthContext()
	return (
		<div className="topnav">
			<Container fluid>
				<nav className="navbar navbar-expand-lg">
					<Collapse in={isMenuOpened}>
						<div className="collapse navbar-collapse" id="topnav-menu-content">
							<AppMenu menuItems={getAllowedRoutes(MENU_ITEMS, user)} />
						</div>
					</Collapse>
				</nav>
			</Container>
		</div>
	)
}

export default NavBar
