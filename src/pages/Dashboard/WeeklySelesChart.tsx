import { Row } from 'react-bootstrap'
import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

// components
import { CustomCardPortlet } from '@/components'


interface Props {
	data:any|[]
}
const WeeklySelesChart = ({data}:Props) => {

	const weeklyChartOpts: ApexOptions = {
		series: [
			{
				name: 'Donation',
				data:data?.map((object:any) => object?.amount),
			}
		],
		chart: {
			height: 377,
			type: 'bar',
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				columnWidth: '60%',
			},
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent'],
		},
		dataLabels: {
			enabled: false,
		},
		colors: ['#3bc0c3', '#1a2942', '#d1d7d973'],
		xaxis: {
			categories: data?.map(({month}:any) => month),
		},
		yaxis: {
			title: {
				text: 'USD',
			},
		},
		legend: {
			offsetY: 7,
		},
		grid: {
			padding: {
				bottom: 20,
			},
		},
		fill: {
			opacity: 1,
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return 'USD ' + val
				},
			},
		},
	}

	return (
		<CustomCardPortlet
			cardTitle="Monthly Donations Report"
			titleClass="header-title"
		>
			<div dir="ltr">
				<ReactApexChart
					height={377}
					options={weeklyChartOpts}
					series={weeklyChartOpts.series}
					type="bar"
					className="apex-charts"
				/>
			</div>

			<Row className="text-center">
				{/* <Col>
					<p className="text-muted mt-3">Current Week</p>
					<h3 className=" mb-0">
						<span>$506.54</span>
					</h3>
				</Col>
				<Col>
					<p className="text-muted mt-3">Previous Week</p>
					<h3 className=" mb-0">
						<span>$305.25 </span>
					</h3>
				</Col>
				<Col>
					<p className="text-muted mt-3">Conversation</p>
					<h3 className=" mb-0">
						<span>3.27%</span>
					</h3>
				</Col>
				<Col>
					<p className="text-muted mt-3">Customers</p>
					<h3 className=" mb-0">
						<span>3k</span>
					</h3>
				</Col> */}
			</Row>
		</CustomCardPortlet>
	)
}

export default WeeklySelesChart
