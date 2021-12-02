import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useSWR from 'swr'
import Button from '../../components/ui/button'
import EventList from '../../components/events/eventList'
import ErrorAlert from '../../components/events/error-alert'
import ResultsTitle from '../../components/events/results-title'

export default function FilteredEventsPage() {
	const [events, setEvents] = useState()
	const router = useRouter()
	const filterData = router.query.slug
	let headData = (
		<Head>
			<title>Search Events</title>
			<meta name='description' content='Search all events.' />
		</Head>
	)

	const { data, error } = useSWR(
		'https://testing-271fe-default-rtdb.firebaseio.com/nextjs/events.json',
		(...args) => fetch(...args).then((res) => res.json())
	)

	useEffect(() => {
		if (data) {
			const events = []

			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				})
			}
			setEvents(events)
		}
	}, [data])

	if (!events) {
		return (
			<>
				{headData}
				<p className='center'>Loading...</p>
			</>
		)
	}

	const filteredYear = filterData[0]
	const filteredMonth = filterData[1]

	const year = +filteredYear
	const month = +filteredMonth

	headData = (
		<Head>
			<title>
				Events for {month}/{year}
			</title>
			<meta
				name='description'
				content={`View all the great events nearby for ${month}/${year}.`}
			/>
		</Head>
	)

	if (
		isNaN(year) ||
		isNaN(month) ||
		year > 2030 ||
		year < 2021 ||
		month > 12 ||
		month < 1 ||
		error
	) {
		return (
			<div className='center'>
				{headData}

				<ErrorAlert>
					<p>Invalid Search</p>
				</ErrorAlert>
				<Button href='/events'>Show All Events</Button>
			</div>
		)
	}

	let filteredEvents = events.filter((event) => {
		const eventDate = new Date(event.date)
		return (
			eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
		)
	})

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<div className='center'>
				{headData}

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
			{headData}

			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	)
}
