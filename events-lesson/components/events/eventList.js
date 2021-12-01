import EventItem from './eventItem'
import styles from './eventList.module.css'

export default function EventList({ items }) {
	return (
		<ul className={styles.list}>
			{items.map((event) => (
				<EventItem {...event} key={event.id} />
			))}
		</ul>
	)
}
