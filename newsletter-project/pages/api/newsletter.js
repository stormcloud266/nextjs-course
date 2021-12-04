import { connectDatabase, insertDocument } from '../../helpers/db-utils.js'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const email = req.body.email

		if (!email || !email.includes('@')) {
			res.status(422).json({ message: 'invalid email address' })
			return
		}

		let client

		try {
			client = await connectDatabase()
		} catch (error) {
			res.status(500).json({ message: 'Failed to connect to database.' })
			return
		}

		try {
			await insertDocument(client, 'newsletter', { email })
			res.status(201).json({ message: 'Signed Up!', email })
		} catch (error) {
			res.status(500).json({ message: 'Failed to insert data.' })
		}

		client.close()
	} else {
		res.status(200).json({
			message: 'get',
		})
	}
}
