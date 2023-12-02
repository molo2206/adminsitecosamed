import './empty.scss'
const EmptyState = () => {
	return (
		<div className="empty_state justify-content-center align-item-center d-flex w-100">
			<i className="ri-folder-unknow-line" style={{
                fontSize:100
            }}></i>
			<h3 className="">No Data</h3>
	
		</div>
	)
}

export default EmptyState
