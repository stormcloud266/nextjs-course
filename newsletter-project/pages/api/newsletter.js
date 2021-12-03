export default function handler(req, res) {
	if (req.method === 'POST') {
		const email = req.body.email

		if (!email || !email.includes('@')) {
			res.status(422).json({ message: 'invalid email address' })
			return
		}

		res.status(201).json({ message: 'success', email })
	} else {
		res.status(200).json({
			message: 'get',
		})
	}
}
