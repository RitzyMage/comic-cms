import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("comics").update({ next: null });
  await knex("comics").update({ previous: null });
  await knex("comic_tags").del();
  await knex("comics").del();

  await knex("comics").insert([
    {
      id: 1,
      title: "The Dark Age Of Spot",
      transcript:
        "The Adventures of SPOT *lightning strike* A great evil was apporaching the world, " +
        "great enough to make Spot (superdog) brood dramatically. SPOT: NOOOOOOO! STRIPE: Spot why are " +
        "you telling No when nothing's even happened? SPOT: Sorry, I was looking into the future with my super vision.",
      mouseover: "giving them all nervous breakdowns",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2011-02-28-the-dark-age-of-spot.png",
      image_lowres: "/img/comics/2011-02-28-the-dark-age-of-spot.webp",
      posted: "2011-02-28",
      height: 888,
      width: 1200,
    },
    {
      id: 2,
      title: "Our Nation’s Enemy",
      transcript: "STRIPE: Well what about about brathing fire on it?*(One of...) SPOT: No, ...",
      mouseover: "W . . . wait . . . is THAT how orphans (do not) dress?",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2011-03-02-our-nations-enemy.png",
      image_lowres: "/img/comics/2011-03-02-our-nations-enemy.webp",
      posted: "2011-03-02",
      height: 888,
      width: 1200,
    },
    {
      id: 3,
      title: "Adventures In Aimless Moping",
      transcript: "And so somehow a single distributor...",
      mouseover:
        "This is actually the closest I have gotten to actual superhero comics this entire run HEY-OOOO",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2011-03-04-adventures-in-aimless-moping.png",
      image_lowres: "/img/comics/2011-03-04-adventures-in-aimless-moping.webp",
      posted: "2011-03-04",
      height: 888,
      width: 1200,
    },
    {
      id: 4,
      title: "If I Had A Hammer",
      transcript: "GRAPE: Peanut, is something wrong? PEANUT: No... Why? ...",
      mouseover:
        "Peanut and Grape feature because lets face it, if these go on longer than a week you complain voraciously",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2011-03-07-if-i-had-a-hammer.png",
      image_lowres: "/img/comics/2011-03-07-if-i-had-a-hammer.webp",
      posted: "2011-03-07",
      height: 888,
      width: 1200,
    },
    {
      id: 5,
      title: "Ending This Nightmare",
      transcript: "STRIPE: Psst.. just tell them to say NO. SPOT: Oh right... the old standby! ...",
      mouseover: "I was justified! You saw his angry eyebrows!",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2011-03-09-ending-this-nightmare.png",
      image_lowres: "/img/comics/2011-03-09-ending-this-nightmare.webp",
      posted: "2011-03-09",
      height: 888,
      width: 1200,
    },
    {
      id: 6,
      title: "Round Table Discussion At A Square Table",
      transcript: "The Adventures of SPOT (superdog) the Movie",
      mouseover: "No YOU'RE dumb",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2012-05-07-round-table-discussion-at-a-square-table.png",
      image_lowres: "/img/comics/2012-05-07-round-table-discussion-at-a-square-table.webp",
      posted: "2012-04-07",
      height: 888,
      width: 1200,
    },
    {
      id: 7,
      title: "Righting The Wrong Rights Wrongly",
      transcript: "Meanwhile---- Muahahaha! It is I the Critic, and by giving...",
      mouseover: "I just couldn't get enough of how little chemistry they had onscreen!",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2012-05-09-righting-the-wrong-rights-wrongly.png",
      image_lowres: "/img/comics/2012-05-09-righting-the-wrong-rights-wrongly.webp",
      posted: "2012-04-09",
      height: 888,
      width: 1200,
    },
    {
      id: 8,
      title: "In All Fairness",
      transcript: "Mr. Sorceror: STAY THY HAND. THE KRUNLK: KRUNLK DENIED? ...",
      mouseover: "and far away, the faint sound of maniacal laughter",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2012-05-11-in-all-fairness.png",
      image_lowres: "/img/comics/2012-05-11-in-all-fairness.webp",
      posted: "2012-04-11",
      height: 888,
      width: 1200,
    },
    {
      id: 9,
      title: "Spot The Difference",
      transcript: "GRAPE: Hey Peanut, whatever happened to that story with the cyborg? ...",
      mouseover:
        "It's a good thing I ingrained that habit when I got that short term memory disorder . . . no wait, that was Memento. What was I thinking of?",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2012-08-27-spot-the-difference.png",
      image_lowres: "/img/comics/2012-08-27-spot-the-difference.webp",
      posted: "2012-08-27",
      height: 888,
      width: 1200,
    },
    {
      id: 10,
      title: "Architect Of Sleep",
      transcript: "SPOT approaches a building...",
      mouseover: "I take that look of utter disgust to mean I misspelled something?",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2012-08-29-architect-of-sleep.png",
      image_lowres: "/img/comics/2012-08-29-architect-of-sleep.webp",
      posted: "2012-08-29",
      height: 888,
      width: 1200,
    },
    {
      id: 11,
      title: "The Retcon Retcon",
      transcript: "PEANUT: Come On! It can be the start of an awesome gritty reboot! ...",
      mouseover:
        "'So why did they make a clone of Stripe too?' 'Universal matter vibrations.' 'So, just because?' 'Yeah, pretty much.'",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2012-08-31-the-retcon-retcon.png",
      image_lowres: "/img/comics/2012-08-31-the-retcon-retcon.webp",
      posted: "2012-08-31",
      height: 888,
      width: 1200,
    },
    {
      id: 12,
      title: "Spotting In Plain Sight",
      transcript: "Spot (Superdog) in the Hall of Ween! SPOT: Gentlemen...",
      mouseover: "If you can't blindly follow dumb children's movies . . .",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2012-10-19-spotting-in-plain-sight.png",
      image_lowres: "/img/comics/2012-10-19-spotting-in-plain-sight.webp",
      posted: "2012-10-19",
      height: 471,
      width: 1200,
    },
    {
      id: 13,
      title: "The Pending Litigation Of Spot",
      transcript:
        "Spot (Superdog) in THE TRIAL of ZE-DOK! BRAN OF THE UNIVERSE: Spot, we the brans of the universe, hereby call you ...",
      mouseover: "Everything I need to know I learned from Star Trek",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2013-02-06-the-pending-litigation-of-spot.png",
      image_lowres: "/img/comics/2013-02-06-the-pending-litigation-of-spot.webp",
      posted: "2013-02-06",
      height: 888,
      width: 1200,
    },
    {
      id: 14,
      title: "The END Of Spot",
      transcript: "TODAY, SPOT (superdog) will DIE! SPOT: I will? ...",
      mouseover: "My favorite part was where he didn't die",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2013-06-26-the-end-of-spot.png",
      image_lowres: "/img/comics/2013-06-26-the-end-of-spot.webp",
      posted: "2013-06-26",
      height: 888,
      width: 1200,
    },
    {
      id: 15,
      title: "The Boring Adventures Of Spot",
      transcript: "The Adventures of Spot (superdog): SPOT and the COST of BUSINESS ...",
      mouseover:
        "It's simple math: everything is exactly equivalent to everything else and there are no extraneous details worth worrying about",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2013-09-02-the-boring-adventures-of-spot.png",
      image_lowres: "/img/comics/2013-09-02-the-boring-adventures-of-spot.webp",
      posted: "2013-09-02",
      height: 888,
      width: 1200,
    },
    {
      id: 16,
      title: "Spot Vs Santa",
      transcript: "This issue... will Christmas EVER be the same?...",
      mouseover: "Spot doesn’t always win because he’s strong, but because he cares",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2013-12-27-spot-vs-santa.png",
      image_lowres: "/img/comics/2013-12-27-spot-vs-santa.webp",
      posted: "2013-12-27",
      height: 888,
      width: 1200,
    },
    {
      id: 17,
      title: "Spot And The Unfortunate Intermission",
      transcript: "When get-well cards aren't enough! SPOT (Superdog) is sick! ...",
      mouseover: "sorry I forgot to draw them entirely poorly",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2014-02-07-spot-and-the-unfortunate-intermission.png",
      image_lowres: "/img/comics/2014-02-07-spot-and-the-unfortunate-intermission.webp",
      posted: "2014-02-07",
      height: 888,
      width: 1200,
    },
    {
      id: 18,
      title: "Not That Kind Of Grounded",
      transcript: "Truth, Justice and the What-ican Way?! SPOT: (Superdog) Grounded! ...",
      mouseover: "keep forgetting he has the fire breath",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2014-06-02-not-that-kind-of-grounded.png",
      image_lowres: "/img/comics/2014-06-02-not-that-kind-of-grounded.webp",
      posted: "2014-06-02",
      height: 888,
      width: 1200,
    },
    {
      id: 19,
      title: "Off The Record",
      transcript: "STRIPE: SUPERDOG! Stripe Sylv, Triweekly Globe ...",
      mouseover: "I see Regular Hawk has an axe to grind",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2014-06-04-off-the-record.png",
      image_lowres: "/img/comics/2014-06-04-off-the-record.webp",
      posted: "2014-06-04",
      height: 888,
      width: 1200,
    },
    {
      id: 20,
      title: "Wrong side of the TRAX",
      transcript: "GANG MEMBER: Yo yo what do we have here, some kind of stupid punk...",
      mouseover: '"But how did you know which houses were the gang members?" "I did?"',
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2014-06-06-wrong-side-of-the-trax.png",
      image_lowres: "/img/comics/2014-06-06-wrong-side-of-the-trax.webp",
      posted: "2014-06-06",
      height: 888,
      width: 1200,
    },
    {
      id: 21,
      title: "Spot And The Exposition Of Evil",
      transcript: "SPOT: Continues to be GROUNDED! ...",
      mouseover: "No, they're explosions, not daises!! And our flag's color is just lightish red!",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2014-07-21-spot-and-the-exposition-of-evil.png",
      image_lowres: "/img/comics/2014-07-21-spot-and-the-exposition-of-evil.webp",
      posted: "2014-06-21",
      height: 888,
      width: 1200,
    },
    {
      id: 22,
      title: "Saving Lives, Taking Names",
      transcript: "SO THEN??? SPOT: This is Fine ...",
      mouseover: "Who are you going to trust--me, or an infallible supercomputer?",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2014-07-23-saving-lives-taking-names.png",
      image_lowres: "/img/comics/2014-07-23-saving-lives-taking-names.webp",
      posted: "2014-06-23",
      height: 888,
      width: 1200,
    },
    {
      id: 23,
      title: "Battle Of Epic Proportions",
      transcript: "And so, the REGULAR HAWK flew to Colorado. ...",
      mouseover: "*gasp* you can't say butt on the internet",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2016/07/2014-07-25-battle-of-epic-proportions.png",
      image_lowres: "/img/comics/2014-07-25-battle-of-epic-proportions.webp",
      posted: "2014-06-25",
      height: 888,
      width: 1200,
    },
    {
      id: 24,
      title: "The Secret",
      transcript:
        "SPOT (SUPERDOG) in... the IDENTITY OF SPOT (SUPERDOG); one day at the triweekly globe!!!...",
      mouseover:
        "oh no it's another spot arc it's been years but it still happens too often somehow",
      image: "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-13-the-secret.png",
      image_lowres: "/img/comics/2020-03-13-the-secret.webp",
      posted: "2020-03-13",
      height: 659,
      width: 878,
    },
    {
      id: 25,
      title: "Jim Jimminy Jim Jimminy Jim Jim Jerry",
      transcript:
        "Stripe: The fact is, he has a secret identity, and I've tracked it to this very building! ...",
      mouseover: "also it's cold now, I had to drop off everyone else's orders on the way up",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-16-jim-jimminy-jim-jimminy-jim-jim-jerry.png",
      image_lowres: "/img/comics/2020-03-16-jim-jimminy-jim-jimminy-jim-jim-jerry.webp",
      posted: "2020-03-16",
      height: 659,
      width: 878,
    },
    {
      id: 26,
      title: "Super Camouflage",
      transcript: "Houndstooth: Do you REALLY think Jim-Jim is Spot (superdog)? ...",
      mouseover:
        "unless there's someone I'm forgetting, and his superpower is to make us forget every time we look at him, but that'd be extremely silly and convoluted",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-18-super-camouflage.png",
      image_lowres: "/img/comics/2020-03-18-super-camouflage.webp",
      posted: "2020-03-18",
      height: 659,
      width: 878,
    },
    {
      id: 27,
      title: "This Looks Like A Job For The Intern",
      transcript:
        "STRIPE: Jim-jim, for the sake of argument, how far deos spot (superdog)'s super-hearing reach? JIM_JIM: Depends on the writer ...",
      mouseover: "that sounded like YOUR car",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-20-this-looks-like-a-job-for-the-intern.png",
      image_lowres: "/img/comics/2020-03-20-this-looks-like-a-job-for-the-intern.webp",
      posted: "2020-03-20",
      height: 659,
      width: 878,
    },
    {
      id: 28,
      title: "Then Who Was Car",
      transcript:
        "STRIPE: Now that Jim-Jim is gone, we can discuss this collection of ugly bowties ...",
      mouseover: "The next fifty comics is just them lampshading the previous comic",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-23-then-who-was-car.png",
      image_lowres: "/img/comics/2020-03-23-then-who-was-car.webp",
      posted: "2020-03-23",
      height: 659,
      width: 878,
    },
    {
      id: 29,
      title: "Well Turn Me Into A Newt",
      transcript:
        "JIM-JIM: I don;t get why you're ven so obsessed with this! STRIPE: Just admid that you're spot(superdog)! ...",
      mouseover: "Well Turn Me Into A Newt",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-25-well-turn-me-into-a-newt.png",
      image_lowres: "/img/comics/2020-03-25-well-turn-me-into-a-newt.webp",
      posted: "2020-03-25",
      height: 659,
      width: 878,
    },
    {
      id: 30,
      title: "Exactly What Spot Would Have Done",
      transcript: "JIM-JIM: Okay hahah, seriously now somebody help ...",
      mouseover: 'you\'ll look up and shout "Save us!"... and I\'ll look down, and whisper "kay."',
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-27-exactly-what-spot-would-have-done.png",
      image_lowres: "/img/comics/2020-03-27-exactly-what-spot-would-have-done.webp",
      posted: "2020-03-27",
      height: 659,
      width: 878,
    },
    {
      id: 31,
      title: "Shocking Reveal",
      transcript:
        "SPOT: Sorry for taking so long, Jim-Jim! Turns out the movie didn't even have an after-credits sequence! JIM-Jim: Hahaha, that's okay ...",
      mouseover: "to probably never be continued",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-30-shocking-reveal.png",
      image_lowres: "/img/comics/2020-03-30-shocking-reveal.webp",
      posted: "2020-03-30",
      height: 659,
      width: 878,
    },
  ]);

  await knex("comics").where({ id: 1 }).update({ next: 2 });
  for (let i = 2; i < 31; ++i) {
    await knex("comics")
      .where({ id: i })
      .update({ previous: i - 1, next: i + 1 });
  }
  await knex("comics").where({ id: 31 }).update({ previous: 30 });
}
