import { useRouter } from 'next/router'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/events/error-alert'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import { getEventById } from '../../dummy-data'

export default function EventDetailPage() {
	const { query } = useRouter()
	const eventId = query.eventId
	const event = getEventById(eventId)

	if (!event) {
		return (
			<div className='center'>
				<ErrorAlert>
					<p>Invalid Search</p>
				</ErrorAlert>
				<Button href='/events'>Show All Events</Button>
			</div>
		)
	}

	return (
		<>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</>
	)
}
