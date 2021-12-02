import { useState } from 'react'
import { buildFeedbackPath, extractFeedback } from '../api/feedback'

export default function Feedback({ feedbackItems }) {
	const [feedbackData, setFeedbackData] = useState()

	function loadFeedbackHandler(id) {
		fetch(`/api/feedback/${id}`)
			.then((res) => res.json())
			.then((data) => setFeedbackData(data.feedback))
	}

	return (
		<>
			{feedbackData && <p>{feedbackData.email}</p>}
			<ul>
				{feedbackItems.map((item) => (
					<li key={item.id}>
						{item.text}{' '}
						<button onClick={loadFeedbackHandler.bind(null, item.id)}>
							Show Details
						</button>
					</li>
				))}
			</ul>
		</>
	)
}

export async function getStaticProps() {
	const filePath = buildFeedbackPath()
	const data = extractFeedback(filePath)

	return {
		props: {
			feedbackItems: data,
		},
	}
}
