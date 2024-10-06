<script lang="ts">
	import '$lib/style/index.css'

	const { children } = $props()
</script>

<svelte:head>
	<title>Meno | Official</title>

	<meta name="author" content="Matias Meno" />
	<meta
		name="keywords"
		content="Meno, Matias Meno, Don't Look Back, We Follow, Bang Bang, Flashlights, Animal, Music, Austria, Vienna, Wien, FM4"
	/>
	<meta
		name="description"
		content="The Franco-Austrian musician Meno spent most of his musical career behind drums, percussions, guitars and pianos, but only recently decided to add a microphone to his repertoire and venture into the music business by himself.
His first single «Flashlights», a satirical self-reflection about the need to be the centre of attention, was met with critical acclaim, extensive airplay and a TOP 5 spot in the charts. The dark and massive synthesisers coupled with heavy beats of this track are a recurring theme of the EP of the same name, and guide you through childhood feelings, dance-offs and memories of a lost friend."
	/>

	<meta property="og:title" content="Meno | Official" />
	<meta property="og:url" content="https://www.yesmeno.com" />
	<meta
		property="og:description"
		content="The Franco-Austrian musician Meno spent most of his musical career behind drums, percussions, guitars and pianos, but only recently decided to add a microphone to his repertoire and venture into the music business by himself.
His first single «Flashlights», a satirical self-reflection about the need to be the centre of attention, was met with critical acclaim, extensive airplay and a TOP 5 spot in the charts. The dark and massive synthesisers coupled with heavy beats of this track are a recurring theme of the EP of the same name, and guide you through childhood feelings, dance-offs and memories of a lost friend."
	/>
	<meta property="og:site_name" content="Meno | Official" />
	<meta property="og:type" content="music.musician" />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:image" content="https://www.yesmeno.com/images/dont_look_back.jpg" />

	<meta property="fb:admins" content="1582162684" />
	<meta property="fb:app_id" content="424150458102290" />
</svelte:head>

{@render children()}
