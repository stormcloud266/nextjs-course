import Link from 'next/link'
import styles from './button.module.css'

export default function Button({ href, onClick, children }) {
	return href ? (
		<Link href={href}>
			<a className={styles.btn}>{children}</a>
		</Link>
	) : (
		<button onClick={onClick} className={styles.btn}>
			{children}
		</button>
	)
}
