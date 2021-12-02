import MainHeader from './mainHeader'

export default function Layout({ children }) {
	return (
		<>
			<MainHeader />
			<main>{children}</main>
		</>
	)
}
