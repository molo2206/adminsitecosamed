import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
	useReducer,
	ReactNode,
} from 'react'
import { useToasts } from 'react-toast-notifications'
import AuthServices from '@/services/AuthServices'
import { useNavigate } from 'react-router-dom'
import SettingServices from '@/services/SettingServices'
import useValidation from '@/hooks/useValidation'
import CountryServices from '@/services/CountryServices'
import useAsync from '@/hooks/useAsync'
import Cookies from 'js-cookie'
import i18n from '@/i18n'
const AuthContext = createContext<any>({})

export function useAuthContext() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuthContext must be used within an AuthProvider')
	}
	return context
}

const authSessionKey = '_DICI_AUTH'
const authToken = '_DICI_TOKEN'

export function AuthProvider({ children }: { children: ReactNode }) {
	const {resetInput} = useValidation({})
	const [refresh, forceUpdate] = useReducer((x) => x + 1, 0)
	const [isEdit, setIsEdit] = useState(false)
	const [selected, setSelected] = useState(null)
	const [logo1, setLogo1] = useState(null)
	const [logo2, setLogo2] = useState(null)
	const [selectedRole, setSelectedRole] = useState<any>(null)
	const [selectedType, setSelectedType] = useState<any>(null)
	const [lang, setLang] = useState<any | null>('en')
	const [image, setImage] = useState(null)
	const [image1, setImage1] = useState(null)
	const [image2, setImage2] = useState(null)
	const [image3, setImage3] = useState(null)
	const [image4, setImage4] = useState(null)
	const [image5, setImage5] = useState(null)
	const [pageLang, setPageLang] = useState(lang)
	const [isOpen, setIsOpen] = useState(false)
	const [modalDelete, showModalDelete] = useState(false)
	const [imageUrl, setImageUrl] = useState(null)
	// const { i18n } = useTranslation();
	const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
	const navigation = useNavigate()
	/**
	 * toggle language dropdown
	 */
	useEffect(() => {
		setLang(Cookies.get('i18next'))
	}, [lang])
	const toggleDropDown = () => {
		setDropDownOpen(!dropDownOpen)
	}

	const changePageLang = (lang: any) => {
		setPageLang(lang)
	}

	const handleLanguageChange = (lang: string) => {
		Cookies.set('i18next', lang)
		i18n.changeLanguage(lang)
		setLang(lang)
		toggleDropDown()
		//alert(lang)
	}

	const toggleModal = () => {
		resetInput()
		setIsOpen(!isOpen)
	}
	const toggleModalDelete = () => {
		showModalDelete(false)
	}
	const closeModal = () => {
		resetInput()
		setIsEdit(false)
		setSelected(null)
		setIsOpen(false)
		setImage(null)
		setImageUrl(null)
	}

	const handleUpdate = (data: any) => {
		setIsEdit(true)
		setSelected(data)
		toggleModal()
	}

	const handleDelete = (data: any) => {
		setSelected(data)
		showModalDelete(true)
	}

	const handleUpdateNavigate = (data: any, route: any) => {
		setIsEdit(true)
		setSelected(data)
		navigation(route)
	}
	const [token, setToken] = useState(
		localStorage.getItem(authToken)
			? JSON.parse(localStorage.getItem(authToken) || '')
			: undefined
	)
	const [user, setUser] = useState(
		localStorage.getItem(authSessionKey)
			? JSON.parse(localStorage.getItem(authSessionKey) || '{}')
			: undefined
	)
	const { addToast } = useToasts()

	const errorNotification = (message: string) => {
		addToast(message, { autoDismiss: true, appearance: 'error' })
	}
	const successNotification = (message: string) => {
		addToast(message, { autoDismiss: true, appearance: 'success' })
	}

	const saveSession = useCallback(
		(token: string) => {
			localStorage.setItem(authToken, JSON.stringify(token))
			setToken(token)
		},
		[setToken]
	)

	const saveUser = useCallback(
		(user: object) => {
			localStorage.setItem(authSessionKey, JSON.stringify(user))
			setUser(user)
		},
		[setUser]
	)

	const removeSession = useCallback(() => {
		localStorage.removeItem(authSessionKey)
		localStorage.removeItem(authToken)
		setUser(undefined)
		setToken(undefined)
	}, [setUser, setToken])

	const { data: _user } = useAsync(AuthServices._showProfile)
	useEffect(() => {
		if(_user){
saveUser(_user)

		}
		
		
	}, [_user])

	const { data: globalSetting, loading: loadingSettings } = useAsync(
		SettingServices.getGlobalSettings
	)
	const { data: languages } = useAsync(SettingServices.getLanguage)
	const { data: countries } = useAsync(CountryServices.getCountry)

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isAuthenticated: Boolean(token),
				saveSession,
				saveUser,
				removeSession,
				errorNotification,
				successNotification,
				globalSetting,
				refresh,
				forceUpdate,
				handleUpdate,
				isEdit,
				selected,
				setIsEdit,
				setSelected,
				toggleModal,
				isOpen,
				closeModal,
				selectedRole,
				setSelectedRole,
				countries,
				lang,
				handleLanguageChange,
				languages,
				toggleDropDown,
				dropDownOpen,
				selectedType,
				setSelectedType,
				image,
				setImage,
				pageLang,
				changePageLang,
				imageUrl,
				setImageUrl,
				loadingSettings,
				logo1,
				logo2,
				setIsOpen,
				setLogo1,
				setLogo2,
				image1,
				image2,
				image3,
				image4,
				image5,
				setImage1,
				setImage2,
				setImage3,
				setImage4,
				setImage5,
				handleUpdateNavigate,
				handleDelete,
				modalDelete,
				toggleModalDelete
			}}>
			{children}
		</AuthContext.Provider>
	)
}
