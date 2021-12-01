import Image from 'next/image'
import Button from '../ui/button'
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import ArrowRight from '../icons/arrow-right-icon'
import styles from './eventItem.module.css'

export default function EventItem({ title, image, date, location, id }) {
	const formattedDate = new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
	const formattedAddress = location.replace(',', '\n')
	const exploreLink = `/events/${id}`

	return (
		<li className={styles.item}>
			<Image src={'/' + image} alt={title} width={250} height={160} />
			<div className={styles.content}>
				<div className={styles.summary}>
					<h2>{title}</h2>
				</div>
				<div className={styles.date}>
					<DateIcon />
					<time>{formattedDate}</time>
				</div>
				<div className={styles.address}>
					<AddressIcon />

					<address>{formattedAddress}</address>
				</div>
				<div className={styles.actions}>
					<Button href={exploreLink}>
						<span>Explore Event</span>
						<span className={styles.icon}>
							<ArrowRight />
						</span>
					</Button>
				</div>
			</div>
		</li>
	)
}
