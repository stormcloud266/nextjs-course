import Image from 'next/image'
import classes from './hero.module.css'

export default function Hero() {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src='/images/site/profile.jpg'
					alt='my profile picture'
					width={300}
					height={300}
				/>
			</div>
			<h1>Hi I'm Max</h1>
			<p>I blog about ReactJS, Next, and Gatsby</p>
		</section>
	)
}
