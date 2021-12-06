import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'

const DUMMY_POSTS = [
	{
		slug: 'getting-started-nextjs',
		title: 'title one',
		image: 'getting-started-nextjs.png',
		excerpt: 'Lorem ipsum dolor sit.',
		date: '2021-03-20',
	},
	{
		slug: 'nextjs-file-based-routing',
		title: 'title two',
		image: 'nextjs-file-based-routing.png',
		excerpt: 'Lorem ipsum dolor sit.',
		date: '2021-01-10',
	},
]

export default function HomePage() {
	return (
		<>
			<Hero />
			<FeaturedPosts posts={DUMMY_POSTS} />
		</>
	)
}
