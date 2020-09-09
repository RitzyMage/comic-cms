import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("COMICS").del();

  // Inserts seed entries
  await knex("COMICS").insert([
    {
      id: 1,
      title: "The Secret",
      transcript:
        "SPOT (SUPERDOG) in... the IDENTITY OF SPOT (SUPERDOG); onde day at the triweekly globe!!!...",
      mouseover:
        "oh no it's another spot arc it's been years but it still happens too often somehow",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-13-the-secret.png",
      image_lowres: "/img/comics/2020-03-13-the-secret.webp",
      posted: "2020-03-13",
      height: 659,
      width: 878,
    },
    {
      id: 2,
      title: "Jim Jimminy Jim Jimminy Jim Jim Jerry",
      transcript:
        "Stripe: The fact is, he has a secret identity, and I've tracked it to this very building!...",
      mouseover:
        "also it's cold now, I had to drop off everyone else's orders on the way up",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-16-jim-jimminy-jim-jimminy-jim-jim-jerry.png",
      image_lowres:
        "/img/comics/2020-03-16-jim-jimminy-jim-jimminy-jim-jim-jerry.webp",
      posted: "2020-03-16",
      height: 659,
      width: 878,
    },
    {
      id: 3,
      title: "Super Camouflage",
      transcript:
        "Houndstooth: Do you REALLY think Jim-Jim is Spot (superdog)?...",
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
      id: 4,
      title: "This Looks Like A Job For The Intern",
      transcript:
        "STRIPE: Jim-jim, for the sake of argument, how far deos spot (superdog)'s super-hearing reach? JIM_JIM: Depends on the writer...",
      mouseover: "that sounded like YOUR car",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-20-this-looks-like-a-job-for-the-intern.png",
      image_lowres:
        "/img/comics/2020-03-20-this-looks-like-a-job-for-the-intern.webp",
      posted: "2020-03-20",
      height: 659,
      width: 878,
    },
    {
      id: 5,
      title: "Then Who Was Car",
      transcript:
        "STRIPE: Now that Jim-Jim is gone, we can discuss this collection of ugly bowties...",
      mouseover:
        "The next fifty comics is just them lampshading the previous comic",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-23-then-who-was-car.png",
      image_lowres: "/img/comics/2020-03-23-then-who-was-car.webp",
      posted: "2020-03-23",
      height: 659,
      width: 878,
    },
    {
      id: 6,
      title: "Well Turn Me Into A Newt",
      transcript:
        "JIM-JIM: I don;t get why you're ven so obsessed with this! STRIPE: Just admid that you're spot(superdog)!",
      mouseover: "Well Turn Me Into A Newt",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-25-well-turn-me-into-a-newt.png",
      image_lowres: "/img/comics/2020-03-25-well-turn-me-into-a-newt.webp",
      posted: "2020-03-25",
      height: 659,
      width: 878,
    },
    {
      id: 7,
      title: "Exactly What Spot Would Have Done",
      transcript: "JIM-JIM: Okay hahah, seriously now somebody help",
      mouseover:
        'you\'ll look up and shout "Save us!"... and I\'ll look down, and whisper "kay."',
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-27-exactly-what-spot-would-have-done.png",
      image_lowres:
        "/img/comics/2020-03-27-exactly-what-spot-would-have-done.webp",
      posted: "2020-03-27",
      height: 659,
      width: 878,
    },
    {
      id: 8,
      title: "Shocking Reveal",
      transcript:
        "SPOT: Sorry for taking so long, Jim-Jim! Turns out the movie didn't even have an after-credits sequence! JIM-Jim: Hahaha, that's okay...",
      mouseover: "to probably never be continued",
      image:
        "https://www.housepetscomic.com/wp-content/uploads/2020/03/2020-03-30-shocking-reveal.png",
      image_lowres: "/img/comics/2020-03-30-shocking-reveal.webp",
      posted: "2020-03-30",
      height: 659,
      width: 878,
    },
  ]);

  await knex("COMICS").where({ id: 1 }).update({ next: 2 });
  await knex("COMICS").where({ id: 2 }).update({ previous: 1, next: 3 });
  await knex("COMICS").where({ id: 3 }).update({ previous: 2, next: 4 });
  await knex("COMICS").where({ id: 4 }).update({ previous: 3, next: 5 });
  await knex("COMICS").where({ id: 5 }).update({ previous: 4, next: 6 });
  await knex("COMICS").where({ id: 6 }).update({ previous: 5, next: 7 });
  await knex("COMICS").where({ id: 7 }).update({ previous: 6, next: 8 });
  await knex("COMICS").where({ id: 8 }).update({ previous: 7 });
}
