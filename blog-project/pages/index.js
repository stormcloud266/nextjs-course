import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'
import { getFeaturedPosts } from '../lib/posts-util'

export default function HomePage({ posts }) {
	return (
		<>
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
