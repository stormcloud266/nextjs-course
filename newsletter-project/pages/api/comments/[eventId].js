import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
	const eventId = req.query.eventId

	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.petvr.mongodb.net/events?retryWrites=true&w=majority`
	)

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
			email,
			name,
			text,
			eventId,
		}

		const bd = client.db()
		await bd.collection('comments').insertOne(newComment)

		res.status(201).json({ message: 'success', comment: newComment })
	} else if (req.method === 'GET') {
		const bd = client.db()
		const documents = await bd
			.collection('comments')
			.find({ eventId })
			.sort({ _id: -1 })
			.toArray()

		res.status(200).json({ comments: documents })
	}

	client.close()
}
