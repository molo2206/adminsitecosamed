import ReactLoading from 'react-loading'
import { Button } from 'react-bootstrap'

interface PortletProps {
	label?: string
	loading?: boolean
}

const CustomButton = (props: PortletProps) => {
	return props.loading ? (
		<Button variant="primary" disabled className="w-100 d-flex" style={{
            height:50,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
        
        }} type={"submit"}>
            <span>
				<ReactLoading type={'spokes'} color={'#fff'} height={20} width={20} />
			</span>
        </Button>
	) : (
		<Button
			variant="primary"
			className="w-100"
			type="submit"
			disabled={props.loading}
            style={{
                height:50
            }}
		>
			
			<i className="ri-login-circle-fill me-1" />{' '}
			<span className="fw-bold">{props.label}</span>{' '}
		</Button>
	)
}

export default CustomButton
