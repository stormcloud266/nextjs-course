import AllPosts from '../../components/posts/all-posts'

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

export default function PostsPage() {
	return <AllPosts posts={DUMMY_POSTS} />
}
