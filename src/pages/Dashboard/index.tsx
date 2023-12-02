import { Col, Row } from 'react-bootstrap'
import Statistics from './Statistics'
import Projects from './Projects'
import useAsync from '@/hooks/useAsync'
import DashboardServices from '@/services/DashboardServices'

// componets
import { PageBreadcrumb } from '@/components'

const Dashboard = () => {
	const { data, loading } = useAsync(DashboardServices.getStatistics)

	const statistics = [
		{
			title: 'Team',
			stats: data?.team,
			change: '',
			icon: 'ri-group-2-line',
			variant: 'text-bg-pink',
		},
		{
			title: 'Members',
			stats: data?.members,
			change: '',
			icon: 'ri-group-2-line',
			variant: 'text-bg-purple',
		},
		{
			title: 'Partners',
			stats: data?.partners,
			change: '',
			icon: 'ri-group-2-line',
			variant: 'text-bg-info',
		},
		{
			title: 'Users',
			stats: data?.users,
			change: '',
			icon: 'ri-group-2-line',
			variant: 'text-bg-primary',
		},
	]
	return (
		<>
			<PageBreadcrumb title="Welcome!" subName="Dashboards" />
			{loading ? (
				<div className="card-disabled">
					<div className="card-portlets-loader"></div>
				</div>
			) : (
				<>
					<Row>
						{(statistics || []).map((item, idx) => {
							return (
								<Col xxl={3} sm={6} key={idx}>
									<Statistics
										title={item.title}
										stats={item.stats}
										change={item.change}
										icon={item.icon}
										variant={item.variant}
									/>
								</Col>
							)
						})}
					</Row>

					{/* <Row>
						<Col lg={8}>
							<WeeklySelesChart />
						</Col>
						<Col lg={4}>
							<YearlySelesChart />
						</Col>
					</Row> */}

					<Row>
						{/* <Col xl={4}>
							<ChatList messages={chatMessages} />
						</Col> */}

						<Col xl={12}>
							<Projects data={data?.latest_users} />
						</Col>
					</Row>
					
				</>
			)}
		</>
	)
}

export default Dashboard
