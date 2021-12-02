import { buildFeedbackPath, extractFeedback } from './api/feedback'

export default function Feedback({ feedbackItems }) {
	return (
		<ul>
			{feedbackItems.map((item) => (
				<li key={item.id}>{item.text}</li>
			))}
		</ul>
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
