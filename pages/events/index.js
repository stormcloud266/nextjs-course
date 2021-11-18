import { useRouter } from 'next/router'
import { getAllEvents } from '../../helpers/api-utils'
import EventList from '../../components/events/eventList'
import EventsSearch from '../../components/events/eventsSearch'

export default function EventsPage({ events }) {
	const { push } = useRouter()

	const onSearch = (year, month) => {
		push(`/events/${year}/${month}`)
	}

	return (
		<>
			<EventsSearch onSearch={onSearch} />
			<EventList items={events} />
		</>
	)
}

export async function getStaticProps() {
	const events = await getAllEvents()

	return {
		props: { events },
		revalidate: 60,
	}
}
