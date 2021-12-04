import { useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments(props) {
	const { eventId } = props

	const [showComments, setShowComments] = useState(false)
	const [comments, setComments] = useState([])

	useEffect(() => {
		if (showComments) {
			fetch(`/api/comments/${eventId}`)
				.then((res) => {
					if (res.status >= 200 && res.status <= 299) {
						return res.json()
					} else {
						throw Error('Error fetching messages.')
					}
				})
				.then((data) => setComments(data.comments))
				.catch((err) => setComments([]))
		}
	}, [showComments])

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus)
	}

	function addCommentHandler(commentData) {
		// send data to API
		fetch(`/api/comments/${eventId}`, {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && <CommentList comments={comments} />}
		</section>
	)
}

export default Comments
