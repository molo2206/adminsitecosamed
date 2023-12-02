import { ReactNode } from 'react'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useAuthContext } from '@/common'
import { useTranslation } from 'react-i18next'

interface PageTitleProps {
	subName?: string
	title: string
	addedChild?: ReactNode
}
const PageBreadcrumb = ({ subName, title, addedChild }: PageTitleProps) => {
	const { globalSetting } = useAuthContext()
	const {t} = useTranslation()
	return (
		<>
			<Helmet>
				<title>{globalSetting?.app_name || process.env.REACT_APP_NAME}</title>
			</Helmet>
			{subName && (
				<Row>
					<Col xs={12}>
						<div className="page-title-box">
							<div className="page-title-right">
								<ol className="breadcrumb m-0">
									<Link
										to="/"
										style={{ color: '#6C757D' }}
										className="breadcrumb-item">
										{t("Dashboard")}
									</Link>
									<Breadcrumb.Item>{t(subName)}</Breadcrumb.Item>
									<Breadcrumb.Item active>{t(title)}</Breadcrumb.Item>
								</ol>
							</div>
							<h4 className="page-title">{t(title)}</h4>
							{addedChild}
						</div>
					</Col>
				</Row>
			)}
		</>
	)
}

export default PageBreadcrumb
