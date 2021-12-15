import Head from 'next/head'
import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'
import { getFeaturedPosts } from '../lib/posts-util'

export default function HomePage({ posts }) {
	return (
		<>
			<Head>
				<title>Welcome to my blog</title>
				<meta
					name='description'
					content='A blog about programming and web development.'
				/>
			</Head>
			<Hero />
			<FeaturedPosts posts={posts} />
		</>
	)
}

export async function getStaticProps() {
	const featuredPosts = getFeaturedPosts()

	return {
		props: {
			posts: featuredPosts,
		},
	}
}
