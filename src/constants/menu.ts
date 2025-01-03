export interface MenuItemTypes {
	key: string
	label: string
	isTitle?: boolean
	icon?: string
	url?: string
	badge?: {
		variant: string
		text: string
	}
	parentKey?: string
	permissions?: object
	target?: string
	children?: MenuItemTypes[]
}

const MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'Main',
		label: 'Main',
		isTitle: true,
	},
	{
		key: 'dashboard',
		label: 'Dashboard',
		isTitle: false,
		url: '/',
		icon: 'ri-dashboard-3-line',
	},
	{
		key: 'bulettin',
		label: 'Bulletins',
		isTitle: false,
		icon: 'ri-draft-fill',
		permissions: { ressource: 'Bulletins', action: 'read' },
		children: [
			{
				key: 'bulletin-list',
				label: 'Bulletins list',
				url: '/bulletins/list',
				parentKey: 'bulletins',
				permissions: { ressource: 'Bulletins', action: 'read' },
			},
			{
				key: 'create-bulletins',
				label: 'Create Bulletins',
				url: '/bulletins/create',
				parentKey: 'bulletins',
				permissions: { ressource: 'Bulletins', action: 'create' },
			},
		],
	},
	{
		key: 'blog',
		label: 'BLogs',
		isTitle: false,
		icon: 'ri-community-line',
		permissions: { ressource: 'Blogs', action: 'read' },
		children: [
			{
				key: 'blog-list',
				label: 'Blog list',
				url: '/blog/listblog',
				parentKey: 'blog',
				permissions: { ressource: 'Blogs', action: 'read' },
			},
			{
				key: 'create-blog',
				label: 'Create Blog',
				url: '/blog/create',
				parentKey: 'blog',
				permissions: { ressource: 'Blogs', action: 'create' },
			},
		],
	},
	{
		key: 'rapports',
		label: 'Rapports de situations',
		isTitle: false,
		icon: 'ri-chat-forward-line',
		permissions: { ressource: 'Rapports', action: 'read' },
		children: [
			{
				key: 'Rapports-list',
				label: 'Rapports list',
				url: '/rapport/list',
				parentKey: 'rapports',
				permissions: { ressource: 'Rapports', action: 'read' },
			},
			{
				key: 'create-rapports',
				label: 'Create Rapports',
				url: '/rapport/create',
				parentKey: 'rapports',
				permissions: { ressource: 'Rapports', action: 'create' },
			},
		],
	},
	{
		key: 'finance',
		label: 'Rapport Financier',
		isTitle: false,
		icon: 'ri-chat-forward-line',
		permissions: { ressource: 'Finance', action: 'read' },
		children: [
			{
				key: 'create-finance',
				label: 'Create Finance',
				url: '/finance/create',
				parentKey: 'finance',
				permissions: { ressource: 'Finance', action: 'create' },
			},
		],
	},
	{
		key: 'offres',
		label: 'Offres d\'emploi',
		isTitle: false,
		icon: 'ri-chat-forward-line',
		permissions: { ressource: 'Offres', action: 'read' },
		children: [
			// {
			// 	key: 'offres-list',
			// 	label: 'Offres list',
			// 	url: '/offres/list',
			// 	parentKey: 'offres',
			// 	permissions: { ressource: 'Offres', action: 'read' },
			// },
			{
				key: 'create-offres',
				label: 'Create Offres',
				url: '/offres/create',
				parentKey: 'offres',
				permissions: { ressource: 'Offres', action: 'create' },
			},
		],
	},
	{
		key: 'books',
		label: 'Livres',
		isTitle: false,
		icon: 'ri-steam-fill',
		permissions: { ressource: 'Books', action: 'read' },
		url: '/books/list',
	},

	{
		key: 'projects',
		label: 'Projects',
		isTitle: false,
		icon: 'ri-bubble-chart-line',
		permissions: { ressource: 'Projets', action: 'read' },
		children: [
			{
				key: 'projects-list',
				label: 'Projects list',
				url: '/projects/list',
				parentKey: 'projects',
				permissions: { ressource: 'Projets', action: 'read' },
			},
			{
				key: 'create-project',
				label: 'Create project',
				url: '/project/create',
				parentKey: 'projects',
				permissions: { ressource: 'Projets', action: 'create' },
			},
		],
	},

	{
		key: 'communicated',
		label: 'Communicated',
		isTitle: false,
		icon: 'ri-customer-service-fill',
		permissions: { ressource: 'Communiques', action: 'read' },
		children: [
			{
				key: 'communicated-list',
				label: 'Communicated list',
				url: '/communicated/listcommunicate',
				parentKey: 'communicated',
				permissions: { ressource: 'Communiques', action: 'read' },
			},
			{
				key: 'create-blog',
				label: 'Create communicated',
				url: '/communicated/create',
				parentKey: 'communicated',
				permissions: { ressource: 'Communiques', action: 'create' },
			},
		],
	},
	{
		key: 'events',
		label: 'Events',
		isTitle: false,
		icon: 'ri-calendar-event-fill',
		permissions: { ressource: 'Events', action: 'read' },
		children: [
			{
				key: 'events-list',
				label: 'Events list',
				url: '/events/list',
				parentKey: 'events',
				permissions: { ressource: 'Events', action: 'read' },
			},
			{
				key: 'create-events',
				label: 'Create Event',
				url: '/events/create',
				parentKey: 'events',
				permissions: { ressource: 'Events', action: 'create' },
			},
		],
	},

	{
		key: 'team',
		label: 'Team',
		isTitle: false,
		icon: 'ri-team-line',
		url: '/team',
		permissions: { ressource: 'Team', action: 'read' },
	},


	{
		key: 'members',
		label: 'Members',
		isTitle: false,
		icon: 'ri-group-fill',
		permissions: { ressource: 'Members', action: 'read' },
		children: [
			{
				key: 'members-list',
				label: 'Members list',
				url: '/members/list',
				parentKey: 'members',
				permissions: { ressource: 'Members', action: 'read' },
			},
			{
				key: 'create-members',
				label: 'Create Members',
				url: '/members/create',
				parentKey: 'members',
				permissions: { ressource: 'Members', action: 'create' },
			},
		],
	},
	{
		key: 'pertener',
		label: 'Parteners',
		isTitle: false,
		icon: 'ri-organization-chart',
		permissions: { ressource: 'Parteners', action: 'read' },
		children: [
			{
				key: 'parteners-list',
				label: 'Parteners list',
				url: '/partener/listparteners',
				parentKey: 'partener',
				permissions: { ressource: 'Parteners', action: 'read' },
			},
			{
				key: 'create-partener',
				label: 'Create Partener',
				url: '/partener/create',
				parentKey: 'partener',
				permissions: { ressource: 'Parteners', action: 'create' },
			},
		],
	},
	// {
	// 	key: 'partners',
	// 	label: 'Partners',
	// 	isTitle: false,
	// 	icon: 'ri-pages-line',
	// 	url: '/partners/list',
	// 	permissions: { ressource: 'Partners', action: 'read' },
	// },
	{
		key: 'testimonials',
		label: 'Testimonials',
		isTitle: false,
		icon: 'ri-microscope-line',
		permissions: { ressource: 'Testimonials', action: 'read' },
		url: '/testimonials/list',
	},
	{
		key: 'categories',
		label: 'Categories',
		isTitle: false,
		icon: 'ri-pages-line',
		url: '/category',
		permissions: { ressource: 'Categories', action: 'read' },
	},
	{
		key: 'thematiques',
		label: 'Thematique',
		isTitle: false,
		icon: 'ri-price-tag-2-fill',
		url: '/thematique/listthematique',
		permissions: { ressource: 'Thematiques', action: 'read' },
	},
	{
		key: 'services',
		label: 'Services',
		isTitle: false,
		icon: 'ri-service-line',
		permissions: { ressource: 'Services', action: 'read' },
		children: [
			{
				key: 'services-list',
				label: 'Services list',
				url: '/services/list',
				parentKey: 'services',
				permissions: { ressource: 'Services', action: 'read' },
			},
			{
				key: 'create-services',
				label: 'Create Service',
				url: '/services/create',
				parentKey: 'services',
				permissions: { ressource: 'Services', action: 'create' },
			},
		],
	},
	{
		key: 'gallery',
		label: 'Gallery',
		isTitle: false,
		icon: 'ri-image-line',
		//permissions: { ressource: 'Photos', action: 'read' },
		children: [
			{
				key: 'photos',
				label: 'Photos',
				url: '/gallery/photo',
				parentKey: 'gallery',
				permissions: { ressource: 'Photos', action: 'read' },
			},
			{
				key: 'videos',
				label: 'Videos',
				url: '/gallery/videos',
				parentKey: 'gallery',
				permissions: { ressource: 'Videos', action: 'read' },
			},
		],
	},
	{
		key: 'settings',
		label: 'Settings',
		isTitle: true,
	},
	{
		key: 'users',
		label: 'Users',
		isTitle: false,
		icon: 'ri-map-pin-user-line',
		url: '/users',
		permissions: { ressource: 'Users', action: 'read' },
	},
	{
		key: 'countries',
		label: 'Countries',
		isTitle: false,
		icon: 'ri-road-map-fill',
		permissions: { ressource: 'Countries', action: 'read' },
		children: [
			{
				key: 'countries',
				label: 'Countries',
				isTitle: false,
				icon: 'ri-pages-line',
				url: '/countries',
				parentKey: 'countries',
				permissions: { ressource: 'Countries', action: 'read' },
			},
			{
				key: 'cities',
				label: 'City',
				isTitle: false,
				icon: 'ri-pages-line',
				url: '/cities',
				permissions: { ressource: 'Countries', action: 'read' },
			},
		],
	},

	{
		key: 'demandes',
		label: 'Demandes',
		isTitle: false,
		icon: 'ri-git-pull-request-line',
		permissions: { ressource: 'Requests', action: 'read' },
		children: [
			{
				key: 'demandes',
				label: 'Visa',
				isTitle: false,
				icon: 'ri-pages-line',
				url: '/demandes/visa',
				parentKey: 'countries',
				permissions: { ressource: 'Requests', action: 'read' },
			},
			{
				key: 'demandes',
				label: 'Travel',
				isTitle: false,
				icon: 'ri-pages-line',
				url: '/demandes/voyage',
				permissions: { ressource: 'Requests', action: 'read' },
			},
		],
	},
	{
		key: 'about-us',
		label: 'About us',
		isTitle: false,
		icon: 'ri-price-tag-2-line',
		url: '/settings/about-us',
		permissions: { ressource: 'Settings', action: 'read' },
	},
	{
		key: 'settings',
		label: 'General settings',
		isTitle: false,
		icon: 'ri-settings-4-line',
		url: '/settings/general',
		permissions: { ressource: 'Settings', action: 'read' },
	},
	{
		key: 'about-us-images',
		label: 'About us images',
		isTitle: false,
		icon: 'ri-landscape-line',
		url: '/settings/images',
		permissions: { ressource: 'Settings', action: 'read' },
	},
	{
		key: 'about-us-logos',
		label: 'About us logos',
		isTitle: false,
		icon: 'ri-remixicon-line',
		url: '/settings/logo',
		permissions: { ressource: 'Settings', action: 'read' },
	},
	{
		key: 'addresses',
		label: 'Our Addresses',
		isTitle: false,
		icon: 'ri-map-2-line',
		url: '/settings/addresses',
		permissions: { ressource: 'Settings', action: 'read' },
	},
	{
		key: 'roles',
		label: 'Roles',
		isTitle: false,
		icon: 'ri-function-line',
		url: '/roles',
		permissions: { ressource: 'Roles', action: 'read' },
	},
	{
		key: 'ressources',
		label: 'Ressources',
		isTitle: false,
		icon: 'ri-pages-line',
		url: '/ressources',
		permissions: { ressource: 'Permissions', action: 'read' },
	},
	{
		key: 'typemembre',
		label: 'Type Membre',
		isTitle: false,
		icon: 'ri-pages-line',
		url: '/typemembre',
		permissions: { ressource: 'TypeMember', action: 'read' },
	}
]

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'dashboard',
		icon: 'ri-dashboard-3-line',
		label: 'Dashboards',
		isTitle: true,
		children: [
			{
				key: 'dashboard',
				label: 'Dashboard',
				url: '/',
				parentKey: 'dashboard',
			},
		],
	},
	{
		key: 'pages',
		icon: 'ri-pages-line',
		label: 'Pages',
		isTitle: true,
		children: [
			{
				key: 'auth',
				label: 'Authentication',
				isTitle: false,
				children: [
					{
						key: 'auth-login',
						label: 'Login',
						url: '/auth/login',
						parentKey: 'pages',
					},
					{
						key: 'auth-register',
						label: 'Register',
						url: '/auth/register',
						parentKey: 'pages',
					},
					{
						key: 'auth-logout',
						label: 'Logout',
						url: '/auth/logout',
						parentKey: 'pages',
					},
					{
						key: 'auth-forgot-password',
						label: 'Forgot Password',
						url: '/auth/forgot-password',
						parentKey: 'pages',
					},
					{
						key: 'auth-lock-screen',
						label: 'Lock Screen',
						url: '/auth/lock-screen',
						parentKey: 'pages',
					},
				],
			},
			{
				key: 'pages-error',
				label: 'Error',
				parentKey: 'pages',
				children: [
					{
						key: 'error-404',
						label: 'Error 404',
						url: '/pages/error-404',
						parentKey: 'pages-error',
					},
					{
						key: 'error-404-alt',
						label: 'Error 404-alt',
						url: '/pages/error-404-alt',
						parentKey: 'pages-error',
					},
					{
						key: 'error-500',
						label: 'Error 500',
						url: '/pages/error-500',
						parentKey: 'pages-error',
					},
				],
			},
			{
				key: 'pages-starter',
				label: 'Starter Page',
				url: '/pages/starter',
				parentKey: 'pages',
			},
			{
				key: 'pages-ContactList',
				label: 'Contact List',
				url: '/pages/contact-list',
				parentKey: 'pages',
			},
			{
				key: 'pages-profile',
				label: 'Profile',
				url: '/pages/profile',
				parentKey: 'pages',
			},
			{
				key: 'pages-invoice',
				label: 'Invoice',
				url: '/pages/invoice',
				parentKey: 'pages',
			},
			{
				key: 'pages-faq',
				label: 'FAQ',
				url: '/pages/faq',
				parentKey: 'pages',
			},
			{
				key: 'pages-pricing',
				label: 'Pricing',
				url: '/pages/pricing',
				parentKey: 'pages',
			},
			{
				key: 'pages-maintenance',
				label: 'Maintenance',
				url: '/pages/maintenance',
				parentKey: 'pages',
			},
			{
				key: 'pages-timeline',
				label: 'Timeline',
				url: '/pages/timeline',
				parentKey: 'pages',
			},
		],
	},
	{
		key: 'ui',
		icon: 'ri-stack-line',
		label: 'Components',
		isTitle: true,
		children: [
			{
				key: 'base1',
				label: 'Base UI 1',
				parentKey: 'ui',
				children: [
					{
						key: 'ui-accordions',
						label: 'Accordions',
						url: '/ui/accordions',
						parentKey: 'base1',
					},
					{
						key: 'ui-alerts',
						label: 'Alerts',
						url: '/ui/alerts',
						parentKey: 'base1',
					},
					{
						key: 'ui-avatars',
						label: 'Avatars',
						url: '/ui/avatars',
						parentKey: 'base1',
					},
					{
						key: 'ui-badges',
						label: 'Badges',
						url: '/ui/badges',
						parentKey: 'base1',
					},
					{
						key: 'ui-breadcrumb',
						label: 'Breadcrumb',
						url: '/ui/breadcrumb',
						parentKey: 'base1',
					},
					{
						key: 'ui-buttons',
						label: 'Buttons',
						url: '/ui/buttons',
						parentKey: 'base1',
					},
					{
						key: 'ui-cards',
						label: 'Cards',
						url: '/ui/cards',
						parentKey: 'base1',
					},
					{
						key: 'ui-carousel',
						label: 'Carousel',
						url: '/ui/carousel',
						parentKey: 'base1',
					},
					{
						key: 'ui-dropdowns',
						label: 'Dropdowns',
						url: '/ui/dropdowns',
						parentKey: 'base1',
					},
					{
						key: 'ui-embed-video',
						label: 'Embed Video',
						url: '/ui/embed-video',
						parentKey: 'base1',
					},
					{
						key: 'ui-grid',
						label: 'Grid',
						url: '/ui/grid',
						parentKey: 'base1',
					},
					{
						key: 'ui-list-group',
						label: 'List Group',
						url: '/ui/list-group',
						parentKey: 'base1',
					},
					{
						key: 'ui-links',
						label: 'Links',
						url: '/ui/links',
						parentKey: 'base1',
					},
				],
			},
			{
				key: 'base2',
				label: 'Base UI 2',
				parentKey: 'ui',
				children: [
					{
						key: 'ui-modals',
						label: 'Modals',
						url: '/ui/modals',
						parentKey: 'base2',
					},
					{
						key: 'ui-notifications',
						label: 'Notifications',
						url: '/ui/notifications',
						parentKey: 'base2',
					},
					{
						key: 'ui-offcanvas',
						label: 'Offcanvas',
						url: '/ui/offcanvas',
						parentKey: 'base2',
					},
					{
						key: 'ui-placeholders',
						label: 'Placeholders',
						url: '/ui/placeholders',
						parentKey: 'base2',
					},
					{
						key: 'ui-pagination',
						label: 'Pagination',
						url: '/ui/pagination',
						parentKey: 'base2',
					},
					{
						key: 'ui-popovers',
						label: 'Popovers',
						url: '/ui/popovers',
						parentKey: 'base2',
					},
					{
						key: 'ui-progress',
						label: 'Progress',
						url: '/ui/progress',
						parentKey: 'base2',
					},

					{
						key: 'ui-spinners',
						label: 'Spinners',
						url: '/ui/spinners',
						parentKey: 'base2',
					},
					{
						key: 'ui-tabs',
						label: 'Tabs',
						url: '/ui/tabs',
						parentKey: 'base2',
					},
					{
						key: 'ui-tooltips',
						label: 'Tooltips',
						url: '/ui/tooltips',
						parentKey: 'base2',
					},
					{
						key: 'ui-typography',
						label: 'Typography',
						url: '/ui/typography',
						parentKey: 'base2',
					},
					{
						key: 'ui-utilities',
						label: 'Utilities',
						url: '/ui/utilities',
						parentKey: 'base2',
					},
				],
			},
			{
				key: 'extended',
				label: 'Extended UI',
				parentKey: 'ui',
				children: [
					{
						key: 'extended-portlets',
						label: 'Portlets',
						url: '/extended-ui/portlets',
						parentKey: 'extended',
					},
					{
						key: 'extended-scrollbar',
						label: 'Scrollbar',
						url: '/extended-ui/scrollbar',
						parentKey: 'extended',
					},
					{
						key: 'extended-range-slider',
						label: 'Range Slider',
						url: '/extended-ui/range-slider',
						parentKey: 'extended',
					},
				],
			},
			{
				key: 'forms',
				label: 'Forms',
				parentKey: 'ui',
				children: [
					{
						key: 'forms-basic-elements',
						label: 'Basic Elements',
						url: '/ui/forms/basic-elements',
						parentKey: 'forms',
					},
					{
						key: 'forms-form-advanced',
						label: 'Form Advanced',
						url: '/ui/forms/form-advanced',
						parentKey: 'forms',
					},
					{
						key: 'forms-validation',
						label: 'Form Validation',
						url: '/ui/forms/validation',
						parentKey: 'forms',
					},
					{
						key: 'forms-wizard',
						label: 'Form Wizard',
						url: '/ui/forms/wizard',
						parentKey: 'forms',
					},
					{
						key: 'forms-file-uploads',
						label: 'File Uploads',
						url: '/ui/forms/file-uploads',
						parentKey: 'forms',
					},
					{
						key: 'forms-editors',
						label: 'Form Editors',
						url: '/ui/forms/editors',
						parentKey: 'forms',
					},
					{
						key: 'forms-image-crop',
						label: 'Image Crop',
						url: '/ui/forms/image-crop',
						parentKey: 'forms',
					},
					{
						key: 'forms-editable',
						label: 'Editable',
						url: '/ui/forms/editable',
						parentKey: 'forms',
					},
				],
			},
			{
				key: 'charts',
				label: 'Charts',
				isTitle: false,
				children: [
					{
						key: 'apex-charts',
						label: 'Apex Charts',
						url: '/charts/apex-charts',
						parentKey: 'charts',
					},
					{
						key: 'chartjs-charts',
						label: 'ChartJS',
						url: '/charts/chartjs',
						parentKey: 'charts',
					},
					{
						key: 'Sparkline-charts',
						label: 'Sparkline Charts',
						url: '/charts/sparkline-charts',
						parentKey: 'charts',
					},
				],
			},
			{
				key: 'tables',
				label: 'Tables',
				isTitle: false,
				children: [
					{
						key: 'tables-basic',
						label: 'Basic Tables',
						url: '/ui/tables/basic-tables',
						parentKey: 'tables',
					},
					{
						key: 'tables-data',
						label: 'Data Tables',
						url: '/ui/tables/data-tables',
						parentKey: 'tables',
					},
				],
			},
			{
				key: 'icons',
				label: 'Icons',
				isTitle: false,
				children: [
					{
						key: 'icons-remix',
						label: 'Remix icons',
						url: '/ui/icons/remix-icons',
						parentKey: 'icons',
					},
					{
						key: 'icons-Bootstrap',
						label: 'Bootstrap icons',
						url: '/ui/icons/Bootstrap-icons',
						parentKey: 'icons',
					},
					{
						key: 'icons-Material Icons',
						label: 'Material Design Icons',
						url: '/ui/icons/Material-icons',
						parentKey: 'icons',
					},
				],
			},
			{
				key: 'maps',
				label: 'Maps',
				isTitle: false,
				children: [
					{
						key: 'maps-google-maps',
						label: 'Google maps',
						url: '/ui/maps/google-maps',
						parentKey: 'maps',
					},
					{
						key: 'maps-vector-maps',
						label: 'Vector maps',
						url: '/ui/maps/vector-maps',
						parentKey: 'maps',
					},
				],
			},
		],
	},
]

export { MENU_ITEMS, HORIZONTAL_MENU_ITEMS }
