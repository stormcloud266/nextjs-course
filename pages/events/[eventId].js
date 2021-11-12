import Button from '../../components/ui/button'
import ErrorAlert from '../../components/events/error-alert'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import { getEventById, getAllEvents } from '../../helpers/api-utils'

export default function EventDetailPage({ event }) {
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

export async function getStaticProps(context) {
	const eventId = context.params.eventId
	const event = await getEventById(eventId)

	return {
		props: {
			event,
		},
	}
}

export async function getStaticPaths() {
	const events = await getAllEvents()
	const paths = events.map((event) => ({ params: { eventId: event.id } }))

	return {
		paths,
		fallback: false,
	}
}
