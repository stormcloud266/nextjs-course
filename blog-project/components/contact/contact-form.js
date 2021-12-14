import { useState, useEffect } from 'react'
import classes from './contact-form.module.css'
import Notification from '../ui/notification'

async function sendContactData(contactDetails) {
	const response = await fetch('/api/contact', {
		method: 'POST',
		body: JSON.stringify(contactDetails),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong.')
	}
}

export default function ContactForm() {
	const [enteredEmail, setEnteredEmail] = useState('')
	const [enteredName, setEnteredName] = useState('')
	const [enteredMessage, setEnteredMessage] = useState('')
	const [requestStatus, setRequestStatus] = useState()
	const [errorMessage, setErrorMessage] = useState()

	useEffect(() => {
		if (requestStatus === 'success' || requestStatus === 'error') {
			const timer = setTimeout(() => {
				setRequestStatus(null)
				setErrorMessage(null)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [requestStatus])

	async function sendMessageHandler(event) {
		event.preventDefault()

		setRequestStatus('pending')

		try {
			await sendContactData({
				email: enteredEmail,
				name: enteredName,
				message: enteredMessage,
			})
			setRequestStatus('success')
			setEnteredEmail('')
			setEnteredName('')
			setEnteredMessage('')
		} catch (error) {
			setErrorMessage(error.message)
			setRequestStatus('error')
		}
	}

	let notification

	if (requestStatus === 'pending') {
		notification = {
			status: 'pending',
			title: 'Sending message...',
			message: 'Your message is on its way!',
		}
	}

	if (requestStatus === 'success') {
		notification = {
			status: 'success',
			title: 'Success!',
			message: 'Message sent successfully!',
		}
	}

	if (requestStatus === 'error') {
		notification = {
			status: 'error',
			title: 'Error!',
			message: errorMessage,
		}
	}

	return (
		<section className={classes.contact}>
			<h1>How can I help you?</h1>
			<form action='' className={classes.form} onSubmit={sendMessageHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor='email'>Your Email</label>
						<input
							type='email'
							name='email'
							id='email'
							value={enteredEmail}
							required
							onChange={(e) => setEnteredEmail(e.target.value)}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='name'>Your Name</label>
						<input
							type='text'
							name='name'
							id='name'
							value={enteredName}
							required
							onChange={(e) => setEnteredName(e.target.value)}
						/>
					</div>
				</div>

				<div className={classes.control}>
					<label htmlFor='message'>Your Message</label>
					<textarea
						id='message'
						rows='5'
						value={enteredMessage}
						required
						onChange={(e) => setEnteredMessage(e.target.value)}
					/>
				</div>

				<div className={classes.actions}>
					<button>Send Form</button>
				</div>
			</form>

			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
		</section>
	)
}
