import { useEffect, useState, useContext } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import { NotificationContext } from '../../store/notification-context'

function Comments(props) {
	const { showNotification } = useContext(NotificationContext)
	const { eventId } = props

	const [showComments, setShowComments] = useState(false)
	const [comments, setComments] = useState([])

	useEffect(() => {
		if (showComments) {
			fetch(`/api/comments/${eventId}`)
				.then((response) => {
					if (response.ok) {
						return response.json()
					}

					return response.json().then((data) => {
						throw new Error(data.message || 'Something went wrong.')
					})
				})
				.then((data) => setComments(data.comments))
				.catch((err) => setComments([]))
		}
	}, [showComments])

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus)
	}

	function addCommentHandler(commentData) {
		showNotification({
			title: 'Adding comment...',
			message: 'Adding your comment to this event.',
			status: 'pending',
		})

		fetch(`/api/comments/${eventId}`, {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json()
				}

				return response.json().then((data) => {
					throw new Error(data.message || 'Something went wrong.')
				})
			})
			.then((data) => {
				showNotification({
					title: 'Success!',
					message: 'Successfully added comment.',
					status: 'success',
				})
			})
			.catch((error) => {
				showNotification({
					title: 'Error!',
					message: error.message || 'Something went wrong.',
					status: 'error',
				})
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
