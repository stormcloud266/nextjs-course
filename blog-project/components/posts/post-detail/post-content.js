import PostHeader from './post-header'
import classes from './post-content.module.css'

const DUMMY_POST = {
	slug: 'getting-started-nextjs',
	title: 'title one',
	image: 'getting-started-nextjs.png',
	content: '# Lorem ipsum dolor sit.',
	date: '2021-03-20',
}

export default function PostContent() {
	const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`

	return (
		<article className={classes.content}>
			<PostHeader title={DUMMY_POST.title} image={imagePath} />
			content
		</article>
	)
}
