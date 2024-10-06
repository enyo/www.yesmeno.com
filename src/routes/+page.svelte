<script lang="ts">
	import InfoSection from '$lib/InfoSection.svelte'
	import Section from '$lib/Section.svelte'
	import { songs } from '$lib/songs'
</script>

{#each songs as song, index}
	<Section
		{index}
		image="/images/{song.image}.jpg"
		link={song.link}
		name={song.name}
		htmlName={song.htmlName}
	/>
{/each}

<InfoSection />
