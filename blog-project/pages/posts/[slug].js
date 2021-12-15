import Head from 'next/head'
import PostContent from '../../components/posts/post-detail/post-content'
import { getPostData, getPostsFiles } from '../../lib/posts-util'

export default function PostPage({ post }) {
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name='description' content={post.excerpt} />
			</Head>
			<PostContent post={post} />
		</>
	)
}

export async function getStaticProps({ params }) {
	const { slug } = params
	const post = getPostData(slug)
	return {
		props: { post },
		revalidate: 600,
	}
}

export async function getStaticPaths() {
	const postFileNames = getPostsFiles()
	const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''))
	console.log('slugs: ', slugs)

	return {
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	}
}
