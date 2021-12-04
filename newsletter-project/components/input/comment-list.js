import classes from './comment-list.module.css'

function CommentList({ comments }) {
	return (
		<ul className={classes.comments}>
			{comments.map(({ name, text, _id }) => (
				<li key={_id}>
					<p>{text}</p>
					<div>
						By <address>{name}</address>
					</div>
				</li>
			))}
		</ul>
	)
}

export default CommentList
