import { useRouter } from 'next/router'
import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/events/eventList'
import EventsSearch from '../../components/events/eventsSearch'

export default function EventsPage() {
	const allEvents = getAllEvents()
	const { push } = useRouter()

	const onSearch = (year, month) => {
		push(`/events/${year}/${month}`)
	}

	return (
		<>
			<EventsSearch onSearch={onSearch} />
			<EventList items={allEvents} />
		</>
	)
}
