/* eslint-disable no-inner-declarations */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Collapse } from 'react-bootstrap'
import { useAuthContext } from '@/common'
import { useTranslation } from "react-i18next";
import { getAllowedRoutes } from '@/utils/heleprs'
// helpers
import { findAllParent, findMenuItem } from '@/common'

// constants
import { MenuItemTypes } from '../constants/menu'

interface SubMenus {
	item: MenuItemTypes
	linkClassName?: string
	subMenuClassNames?: string
	activeMenuItems?: Array<string>
	toggleMenu?: (item: any, status: boolean) => void
	className?: string
}

const MenuItemWithChildren = ({
	item,
	linkClassName,
	subMenuClassNames,
	activeMenuItems,
	toggleMenu,
}: SubMenus) => {
	const [open, setOpen] = useState<boolean>(activeMenuItems!.includes(item.key))
	const { user } = useAuthContext()
	const {t} = useTranslation()

	useEffect(() => {
		setOpen(activeMenuItems!.includes(item.key))
	}, [activeMenuItems, item])

	const toggleMenuItem = () => {
		const status = !open
		setOpen(status)
		if (toggleMenu) toggleMenu(item, status)
		return false
	}

	return (
		item?.children && item?.children?.length > 0 && (
			<li className={`side-nav-item ${open ? 'menuitem-active' : ''}`}>
				<Link
					to="#"
					className={`side-nav-link ${linkClassName} ${
						activeMenuItems!.includes(item.key) ? 'open' : ''
					}`}
					aria-expanded={open}
					data-menu-key={item.key}
					onClick={toggleMenuItem}>
					{item.icon && <i className={item.icon} />}
					{!item.badge ? (
						<span className="menu-arrow" />
					) : (
						<span className={`badge bg-${item.badge.variant} float-end`}>
							{item.badge.text}
						</span>
					)}
					<span> {t(item.label)}</span>
				</Link>
				<Collapse in={open}>
					<div>
						<ul className={`side-nav-second-level ${subMenuClassNames}`}>
							{(getAllowedRoutes(item.children, user) || []).map(
								(child:any, idx:any) => {
									return (
										<React.Fragment key={idx}>
											{child.children ? (
												<MenuItemWithChildren
													item={child}
													linkClassName={
														activeMenuItems!.includes(child.key) ? 'active' : ''
													}
													activeMenuItems={activeMenuItems}
													subMenuClassNames="sub-menu"
													toggleMenu={toggleMenu}
												/>
											) : (
												<MenuItem
													item={child}
													className={
														activeMenuItems!.includes(child.key)
															? 'menuitem-active'
															: ''
													}
													linkClassName={
														activeMenuItems!.includes(child.key) ? 'active' : ''
													}
												/>
											)}
										</React.Fragment>
									)
								}
							)}
						</ul>
					</div>
				</Collapse>
			</li>
		)
	)
}

const MenuItem = ({ item, className, linkClassName }: SubMenus) => {
	// console.log(linkClassName)
	return (
		<li className={`side-nav-item ${className}`}>
			<MenuItemLink item={item} className={linkClassName} />
		</li>
	)
}

const MenuItemLink = ({ item, className }: SubMenus) => {
	const {t} = useTranslation()
	return (
		<Link
			to={item.url!}
			target={item.target}
			className={`side-nav-link-ref ${className}`}
			data-menu-key={item.key}>
			{item.icon && <i className={item.icon} />}
			{item.badge && (
				<span className={`badge bg-${item.badge.variant} float-end`}>
					{item.badge.text}
				</span>
			)}
			<span> {t(item.label)}</span>
		</Link>
	)
}

/**
 * Renders the application menu
 */
interface AppMenuProps {
	menuItems: MenuItemTypes[]
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
	const {t} = useTranslation()
	const location = useLocation()

	const menuRef = useRef(null)

	const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([])

	/**
	 * toggle the menus
	 */
	const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {
		if (show) {
			setActiveMenuItems([
				menuItem['key'],
				...findAllParent(menuItems, menuItem),
			])
		}
	}

	/**
	 * activate the menuitems
	 */
	const activeMenu = useCallback(() => {
		const div = document.getElementById('main-side-menu')
		let matchingMenuItem: HTMLElement | null = null

		if (div) {
			const items: any = div.getElementsByClassName('side-nav-link-ref')
			for (let i = 0; i < items.length; ++i) {
				let trimmedURL = location?.pathname?.replaceAll(
					process.env.PUBLIC_URL ?? '',
					''
				)
				const url = items[i].pathname
				if (trimmedURL === process.env.PUBLIC_URL + '/') {
					trimmedURL += 'ecommerce'
				}
				if (trimmedURL === url?.replaceAll(process.env.PUBLIC_URL, '')) {
					matchingMenuItem = items[i]
					break
				}
			}

			if (matchingMenuItem) {
				const mid = matchingMenuItem.getAttribute('data-menu-key')
				const activeMt = findMenuItem(menuItems, mid as any)
				if (activeMt) {
					setActiveMenuItems([
						activeMt['key'],
						...findAllParent(menuItems, activeMt),
					])
				}

				setTimeout(function () {
					const activatedItem = matchingMenuItem!
					if (activatedItem != null) {
						const simplebarContent = document.querySelector(
							'#leftside-menu-container .simplebar-content-wrapper'
						)
						const offset = activatedItem!.offsetTop - 300
						if (simplebarContent && offset > 100) {
							scrollTo(simplebarContent, offset, 600)
						}
					}
				}, 200)

				// scrollTo (Left Side Bar Active Menu)
				function easeInOutQuad(t: any, b: any, c: any, d: any) {
					t /= d / 2
					if (t < 1) return (c / 2) * t * t + b
					t--
					return (-c / 2) * (t * (t - 2) - 1) + b
				}
				function scrollTo(element: any, to: any, duration: any) {
					// eslint-disable-next-line prefer-const
					let start = element.scrollTop,
						// eslint-disable-next-line prefer-const
						change = to - start,
						currentTime = 0,
						// eslint-disable-next-line prefer-const
						increment = 20
					const animateScroll = function () {
						currentTime += increment
						const val = easeInOutQuad(currentTime, start, change, duration)
						element.scrollTop = val
						if (currentTime < duration) {
							setTimeout(animateScroll, increment)
						}
					}
					animateScroll()
				}
			}
		}
	}, [location, menuItems])

	useEffect(() => {
		activeMenu()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<ul className="side-nav" ref={menuRef} id="main-side-menu">
				{(menuItems || []).map((item, idx) => {
					return (
						<React.Fragment key={idx}>
							{item.isTitle ? (
								<li className="side-nav-title">{t(item.label)}</li>
							) : (
								<>
									{item.children ? (
										<MenuItemWithChildren
											item={item}
											toggleMenu={toggleMenu}
											subMenuClassNames=""
											activeMenuItems={activeMenuItems}
											linkClassName="side-nav-link"
										/>
									) : (
										<MenuItem
											item={item}
											linkClassName="side-nav-link"
											className={
												activeMenuItems!.includes(item.key)
													? 'menuitem-active'
													: ''
											}
										/>
									)}
								</>
							)}
						</React.Fragment>
					)
				})}
			</ul>
		</>
	)
}

export default AppMenu
