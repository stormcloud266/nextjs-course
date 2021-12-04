import {
	connectDatabase,
	insertDocument,
	getAllDocuments,
} from '../../../helpers/db-utils.js'

export default async function handler(req, res) {
	const eventId = req.query.eventId
	let client

	try {
		client = await connectDatabase()
	} catch (error) {
		res.status(500).json({ message: 'Failed to connect to database.' })
		return
	}

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
			client.close()
			return
		}

		const newComment = {
			email,
			name,
			text,
			eventId,
		}

		try {
			await insertDocument(client, 'comments', newComment)
			res.status(201).json({ message: 'success', comment: newComment })
		} catch (error) {
			res.status(500).json({ message: 'Failed to insert data.' })
		}
	} else if (req.method === 'GET') {
		try {
			const documents = await getAllDocuments(
				client,
				'comments',
				{ _id: -1 },
				{ eventId }
			)
			res.status(200).json({ comments: documents })
		} catch (error) {
			res.status(500).json({ message: 'Failed to get data.' })
		}
	}

	client.close()
}
