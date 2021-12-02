import fs from 'fs'
import path from 'path'

function handler(req, res) {
	if (req.method === 'POST') {
		const email = req.body.email
		const text = req.body.text

		const feedback = {
			id: new Date().toISOString(),
			email,
			text,
		}

		const filePath = path.join(process.cwd(), 'data', 'feedback.json')
		const fileData = fs.readFileSync(filePath)
		const data = JSON.parse(fileData)
		data.push(feedback)
		fs.writeFileSync(filePath, JSON.stringify(data))
		res.status(201).json({ message: 'Success!', feedback })
	} else {
		res.status(200).json({ message: 'This works' })
	}
}

export default handler
