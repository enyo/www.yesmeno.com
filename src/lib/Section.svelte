<script lang="ts">
	import type { Song } from './songs'
	import { inView } from '$lib/actions/in-view'
	import { backdrop } from './backdrop.svelte'
	import { pageOffset } from './actions/page-offset'

	const { link, name, image, htmlName, index }: Song & { index: number } = $props()

	let sectionTop = $state(0)
	let sectionHeight = $state(1)

	let scrollY = $state(0)

	let position: 'current' | 'before' | 'after' = $derived(
		backdrop.currentElement === index
			? 'current'
			: index < backdrop.currentElement
				? 'before'
				: 'after'
	)

	let visible = $derived(position === 'current')

	// In percentage
	const maxOffset = 10

	let backdropYOffset = $derived.by(() => {
		let sectionDistance = scrollY - (sectionTop ?? 10000)
		return Math.min(
			maxOffset,
			Math.max(-maxOffset, sectionDistance * (maxOffset / (sectionHeight / 1.5)))
		)
	})

	const switchImage = () => {
		backdrop.currentElement = index
		backdrop.zIndex++
	}
</script>

<svelte:window bind:scrollY />

<div
	class="backdrop"
	style="--offset: {backdropYOffset / 2}%; --max-offset: {maxOffset}%;"
	class:visible
>
	<div class="image">
		<img src={image} alt={name} />
	</div>
</div>

<section
	bind:clientHeight={sectionHeight}
	use:inView={{ threshold: 0.5 }}
	onviewenter={switchImage}
	use:pageOffset
	onoffset={(e) => {
		sectionTop = e.detail.top
	}}
	class:visible
	class:before={position === 'before'}
	class:after={position === 'after'}
>
	<a href={link} target="_blank">
		<span>
			{#if htmlName}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html htmlName}
			{:else}
				{name}
			{/if}
		</span>
		<div class="highlighter"></div>
	</a>
</section>

<style lang="postcss">
	section {
		position: relative;
		min-height: var(--section-height);
		width: 100%;
		display: grid;
		place-content: center;
		z-index: 10000;
		opacity: 0;
		transition: opacity 400ms ease;

		&.visible {
			opacity: 1;
		}
	}
	a {
		display: block;
		margin: 0 auto;
		font-family: var(--font-display);
		font-size: fluid(4.5rem, 8rem);
		font-weight: 900;
		text-decoration: none;
		color: white;
		line-height: 1;
		position: relative;
		text-align: center;
		padding: 0 10px;
		transition: all 400ms ease-out;

		.before & {
			translate: 0 -60%;
		}
		.after & {
			translate: 0 60%;
		}

		@media (max-width: 680px) {
			width: min-content;
		}
		& span {
			position: relative;
			z-index: 10;
		}
		&:hover {
			color: black;

			& .highlighter {
				bottom: -10%;
				height: 120%;
			}
		}
	}
	.highlighter {
		position: absolute;
		display: block;
		left: 0;
		right: 0;
		background: var(--color-primary);
		bottom: -20%;
		height: 0.4rem;
		transition: all 0.2s ease-out;
		pointer-events: none;
		mix-blend-mode: screen;
	}
	.backdrop {
		display: block;
		position: fixed;
		inset: 0;
		opacity: 0;
		transition: opacity 400ms ease;
		overflow: hidden;
		z-index: 10;
		&.visible {
			opacity: 1;
		}

		.image {
			position: absolute;
			translate: 0 calc(-1 * var(--offset));
			inset: calc(-1 * var(--max-offset)) 0;
			z-index: 10;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
</style>
