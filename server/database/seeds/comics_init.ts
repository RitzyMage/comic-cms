import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('COMICS').del();

	// Inserts seed entries
	await knex('COMICS').insert([
		{
			id: 1,
			title: 'The Secret',
			transcript:
				'SPOT (SUPERDOG) in... the IDENTITY OF SPOT (SUPERDOG); onde day at the triweekly globe!!!...',
			mouseover:
				"oh no it's another spot arc it's been years but it still happens too often somehow",
			image: 'https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-13-the-secret.png',
			image_lowres:
				'https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-13-the-secret.png',
			posted: '2020-03-13',
		},
		{
			id: 2,
			title: 'Jim Jimminy Jim Jimminy Jim Jim Jerry',
			transcript:
				"Stripe: The fact is, he has a secret identity, and I've tracked it to this very building!...",
			mouseover: "also it's cold now, I had to drop off everyone else's orders on the way up",
			image:
				'https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-16-jim-jimminy-jim-jimminy-jim-jim-jerry.png',
			image_lowres:
				'https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-16-jim-jimminy-jim-jimminy-jim-jim-jerry.png',
			posted: '2020-03-16',
		},
		{
			id: 3,
			title: 'Super Camouflage',
			transcript: 'Houndstooth: Do you REALLY think Jim-Jim is Spot (superdog)?...',
			mouseover:
				"unless there's someone I'm forgetting, and his superpower is to make us forget every time we look at him, but that'd be extremely silly and convoluted",
			image:
				'https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-18-super-camouflage.png',
			image_lowres:
				'https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-18-super-camouflage.png',
			posted: '2020-03-18',
		},
	]);
}
