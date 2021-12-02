import { useRouter } from 'next/router'
import { getFilteredEvents } from './helpers/api-utils'
import Button from './components/ui/button'
import EventList from './components/events/eventList'
import ErrorAlert from './components/events/error-alert'
import ResultsTitle from './components/events/results-title'

export default function FilteredEventsPage({ hasError, filteredEvents, date }) {
	const router = useRouter()
	const filterData = router.query.slug

	if (!filterData) {
		return <p className='center'>Loading...</p>
	}

	if (hasError) {
		return (
			<div className='center'>
				<ErrorAlert>
					<p>Invalid Search</p>
				</ErrorAlert>
				<Button href='/events'>Show All Events</Button>
			</div>
		)
	}

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<div className='center'>
				<ErrorAlert>
					<p>No Events Found</p>
				</ErrorAlert>
				<Button href='/events'>Show All Events</Button>
			</div>
		)
	}

	const formattedDate = new Date(date.year, date.month - 1)

	return (
		<>
			<ResultsTitle date={formattedDate} />
			<EventList items={filteredEvents} />
		</>
	)
}

export async function getServerSideProps(context) {
	const { params } = context
	const filterData = params.slug

	const filteredYear = filterData[0]
	const filteredMonth = filterData[1]

	const year = +filteredYear
	const month = +filteredMonth

	if (
		isNaN(year) ||
		isNaN(month) ||
		year > 2030 ||
		year < 2021 ||
		month > 12 ||
		month < 1
	) {
		return {
			props: { hasError: true },
		}
	}

	const filteredEvents = await getFilteredEvents({ year, month })

	return {
		props: {
			filteredEvents,
			date: {
				year,
				month,
			},
		},
	}
}
