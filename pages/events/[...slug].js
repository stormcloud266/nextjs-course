import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data'
import Button from '../../components/ui/button'
import EventList from '../../components/events/eventList'
import ErrorAlert from '../../components/events/error-alert'
import ResultsTitle from '../../components/events/results-title'

export default function FilteredEventsPage() {
	const router = useRouter()
	const filterData = router.query.slug

	if (!filterData) {
		return <p className='center'>Loading...</p>
	}

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
		return (
			<div className='center'>
				<ErrorAlert>
					<p>Invalid Search</p>
				</ErrorAlert>
				<Button href='/events'>Show All Events</Button>
			</div>
		)
	}

	const filteredEvents = getFilteredEvents({ year, month })
	console.log('filteredEvents: ', filteredEvents)

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

	const date = new Date(year, month - 1)

	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	)
}
