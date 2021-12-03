export default function handler(req, res) {
	const eventId = req.query.eventId

	if (req.method === 'POST') {
		const { email, name, text } = req.body

		if (
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!text ||
			text.trim() === ''
		) {
			res.status(422).json({ message: 'Invalid input' })
			return
		}

		const newComment = {
			id: new Date().toISOString(),
			email,
			name,
			text,
		}

		res.status(201).json({ message: 'success', comment: newComment })
	} else if (req.method === 'GET') {
		res.status(200).json({
			comments: [
				{
					id: new Date().toISOString(),
					name: 'tdawg',
					email: 'oaisdu@kasjdh.com',
					text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur!',
				},
			],
		})
	}
}
