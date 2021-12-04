import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const email = req.body.email

		if (!email || !email.includes('@')) {
			res.status(422).json({ message: 'invalid email address' })
			return
		}

		const client = await MongoClient.connect(
			`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.petvr.mongodb.net/events?retryWrites=true&w=majority`
		)

		const bd = client.db()
		await bd.collection('newsletter').insertOne({ email })
		client.close()

		res.status(201).json({ message: 'success', email })
	} else {
		res.status(200).json({
			message: 'get',
		})
	}
}
