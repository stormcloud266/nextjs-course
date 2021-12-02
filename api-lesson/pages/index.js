import { useRef } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
	const emailInputRef = useRef()
	const feedbackInputRef = useRef()

	const submitFormHandler = (event) => {
		event.preventDefault()

		const email = emailInputRef.current.value
		const text = feedbackInputRef.current.value

		const reqBody = { email, text }

		fetch('/api/feedback', {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
	}

	return (
		<div className={styles.container}>
			<h1>Feedback</h1>
			<form onSubmit={submitFormHandler}>
				<div>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' ref={emailInputRef} />
				</div>
				<div>
					<label htmlFor='feedback'>Your Feedback</label>
					<textarea
						name='feedback'
						id='feedback'
						cols='20'
						rows='5'
						ref={feedbackInputRef}
					></textarea>
				</div>
				<button>Send Feedback</button>
			</form>
		</div>
	)
}
