import { useAuthContext } from '@/common'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const LanguageDropdown = () => {
	
	const { toggleDropDown, dropDownOpen, lang, languages, handleLanguageChange } = useAuthContext()

	return (
		<>
			<Dropdown show={dropDownOpen} onToggle={toggleDropDown}>
				<Dropdown.Toggle
					className="nav-link dropdown-toggle arrow-none"
					as="a"
					role="button"
					onClick={toggleDropDown}>
					{/* <img
						src={enLang.flag}
						alt="user-avatar"
						className="me-0 me-sm-1"
						height="12"
					/> */}
					<span className="align-middle d-none d-lg-inline-block">
						{languages?.find((i:any) => i.iso === lang)?.name}
					</span>
					<i className="ri-arrow-down-s-line d-none d-sm-inline-block align-middle" />
				</Dropdown.Toggle>

				<Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-animated">
					{(languages || []).map((lang:any, idx:any) => {
						return (
							<Link onClick={() => handleLanguageChange(lang.iso)} to="#" className="dropdown-item" key={idx + '-lang'}>
								{/* <img
									src={`https://flagcdn.com/w320/cd.jpg`}
									alt={lang.name}
									className="me-1"
									height="12"
								/> */}
								<span className="align-middle">{lang.name}</span>
							</Link>
						)
					})}
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}

export default LanguageDropdown
