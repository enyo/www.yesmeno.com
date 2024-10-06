export type Song = {
	name: string
	htmlName?: string
	link: string
	image: string
}
export const songs: Song[] = [
	{
		name: 'Don’t look back',
		link: 'https://www.youtube.com/watch?v=GhvvR0uSdg8',
		image: 'dont_look_back'
	},
	{ name: 'We follow', link: 'https://www.youtube.com/watch?v=GhvvR0uSdg8', image: 'we_follow' },
	{
		name: 'Better heart',
		link: 'https://www.youtube.com/watch?v=-KWySvPwLXQ',
		image: 'better_heart'
	},
	{ name: 'Bang bang', link: 'https://www.youtube.com/watch?v=1Qe6dyxoVnk', image: 'bang_bang' },
	{
		name: 'Back for more',
		link: 'https://www.youtube.com/watch?v=lQ3OSTDpLmY',
		image: 'back_for_more'
	},
	{ name: 'Aux bras', link: 'https://www.youtube.com/watch?v=2McZErtMST8', image: 'aux_bras' },
	{ name: 'Animal', link: 'https://www.youtube.com/watch?v=z-OUBkuDzv4', image: 'animal' },
	{
		name: 'Flashlights',
		htmlName: 'Flash<wbr />lights',
		link: 'https://www.youtube.com/watch?v=sFBFkZYGgcE',
		image: 'flashlights'
	}
]
