import { Container, Row } from 'react-bootstrap'
import { useAuthContext } from '@/common'
const Footer = () => {
	const {globalSetting} = useAuthContext()
	return (
		<footer className="footer">
			<Container fluid>
				<Row className="row">
					<div className="col-12 text-center">
						{new Date().getFullYear()} © {globalSetting?.app_name}
					</div>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
