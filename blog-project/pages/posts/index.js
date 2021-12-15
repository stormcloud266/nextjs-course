import Head from 'next/head'
import AllPosts from '../../components/posts/all-posts'
import { getAllPosts } from '../../lib/posts-util'

export default function PostsPage({ posts }) {
	return (
		<>
			<Head>
				<title>All blog posts</title>
				<meta name='description' content='View all my posts.' />
			</Head>
			<AllPosts posts={posts} />
		</>
	)
}

export async function getStaticProps() {
	const allPosts = getAllPosts()

	return {
		props: {
			posts: allPosts,
		},
	}
}
