import { Table } from 'react-bootstrap'

// components
import { CustomCardPortlet } from '@/components'

interface Props {
	data:any
}

const Projects = ({data}:Props) => {
	return (
		<CustomCardPortlet cardTitle="Latest users" titleClass="header-title">
			<Table hover responsive className="table-nowrap mb-0">
				<thead>
					<tr>
						<th>#</th>
						<th>Full Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Status</th>
						<th>Status</th>
						<th>Image</th>
					</tr>
				</thead>
				<tbody>
					{(data || [])?.slice(0,5)?.map((project:any, idx:any) => {
						return (
							<tr key={idx}>
								<td>{project?.id}</td>
								<td>{project?.full_name}</td>
								<td>{project?.email}</td>
								<td>{project?.role?.name}</td>
								<td>{project?.created_at}</td>
								<td>
									<span
										className={`badge bg-${project?.status === 1 ? 'success':'danger'}`}
									>
										{project?.status ? "Active":"Inactive"}
									</span>
								</td>
								<td>
									<img src={project?.image} className='avatar avatar-xs'/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</CustomCardPortlet>
	)
}

export default Projects
