<script lang="ts">
	import { inView } from './actions/in-view'
	import { backdrop } from './backdrop.svelte'
	import Apple from './icons/Apple.svelte'
	import Instagram from './icons/Instagram.svelte'
	import Spotify from './icons/Spotify.svelte'
	import YouTube from './icons/YouTube.svelte'

	const emails = ['contact@yesmeno.com', 'booking@yesmeno.com', 'press@yesmeno.com']
</script>

<section use:inView={{ threshold: 0.5 }} onviewenter={() => (backdrop.currentElement = undefined)}>
	<ul class="contact-links">
		{#each emails as email}
			<li>
				<a href="mailto:{email}">
					<span class="local">{email.replace(/@.*$/, '')}</span><span class="domain"
						>@{email.replace(/^.*@/, '')}</span
					>
				</a>
			</li>
		{/each}
	</ul>

	<ul class="social-links">
		<li>
			<a target="_blank" href="https://open.spotify.com/artist/6YYLgYEaM5Z42woEFtzu32">
				<Spotify />
			</a>
		</li>
		<li>
			<a target="_blank" href="https://itunes.apple.com/at/artist/meno/1084458695">
				<Apple />
			</a>
		</li>
		<li>
			<a target="_blank" href="https://www.youtube.com/yesmeno">
				<YouTube />
			</a>
		</li>
		<li>
			<a target="_blank" href="https://www.instagram.com/yesyesmeno/">
				<Instagram />
			</a>
		</li>
	</ul>
</section>

<style lang="postcss">
	section {
		position: relative;
		min-height: var(--section-height);
		width: 100%;
		display: grid;
		place-content: center;
		font-family: var(--font-display);
		--size: min(8vw, 15vh);
		font-size: var(--size);
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.contact-links {
		a {
			.domain {
				opacity: 0.1;
				transition: all 200ms ease-out;
			}
			&:hover {
				.domain {
					opacity: 1;
				}
			}
		}
	}

	.social-links {
		margin-top: calc(var(--size) / 3);
		display: grid;
		grid-template-columns: repeat(4, auto);
		justify-content: space-between;
	}
</style>
