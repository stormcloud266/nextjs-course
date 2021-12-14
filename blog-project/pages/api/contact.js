import { MongoClient } from 'mongodb'

export async function connectDatabase() {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.petvr.mongodb.net/events?retryWrites=true&w=majority`
	)
	return client
}

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { email, name, message } = req.body

		if (
			!email ||
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!message ||
			message.trim() === ''
		) {
			res.status(422).json({ message: 'Invalid input' })
			return
		}

		const newMessage = {
			name,
			email,
			message,
		}

		let client

		try {
			client = await MongoClient.connect(
				`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.petvr.mongodb.net/blog?retryWrites=true&w=majority`
			)
		} catch (error) {
			res.status(500).json({ message: 'Could not connect to database.' })
			return
		}

		const db = client.db()

		try {
			const result = await db.collection('messages').insertOne(newMessage)
			newMessage.id = result.insertedId
		} catch (error) {
			client.close()
			res.status(500).json({ message: 'Could not connect to database.' })
			return
		}

		client.close()
		res.status(201).json({ message: 'Successfully stored message', newMessage })
	}
}
