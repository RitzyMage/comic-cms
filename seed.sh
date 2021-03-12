start=$(pwd)

cd server
npx knex seed:run

getWebp() {
  if [ ! -f $1 ]; then
    wget https://misc.averys.green/comic-cms/images/$1
  fi
}

cd $start/client/static/img/comics
getWebp 2011-02-28-the-dark-age-of-spot.webp
getWebp 2011-02-28-the-dark-age-of-spot.webp
getWebp 2011-03-02-our-nations-enemy.webp
getWebp 2011-03-04-adventures-in-aimless-moping.webp
getWebp 2011-03-07-if-i-had-a-hammer.webp
getWebp 2011-03-09-ending-this-nightmare.webp
getWebp 2012-05-07-round-table-discussion-at-a-square-table.webp
getWebp 2012-05-09-righting-the-wrong-rights-wrongly.webp
getWebp 2012-05-11-in-all-fairness.webp
getWebp 2012-08-27-spot-the-difference.webp
getWebp 2012-08-29-architect-of-sleep.webp
getWebp 2012-08-31-the-retcon-retcon.webp
getWebp 2012-10-19-spotting-in-plain-sight.webp
getWebp 2013-02-06-the-pending-litigation-of-spot.webp
getWebp 2013-06-26-the-end-of-spot.webp
getWebp 2013-09-02-the-boring-adventures-of-spot.webp
getWebp 2013-12-27-spot-vs-santa.webp
getWebp 2014-02-07-spot-and-the-unfortunate-intermission.webp
getWebp 2014-06-02-not-that-kind-of-grounded.webp
getWebp 2014-06-04-off-the-record.webp
getWebp 2014-06-06-wrong-side-of-the-trax.webp
getWebp 2014-07-21-spot-and-the-exposition-of-evil.webp
getWebp 2014-07-23-saving-lives-taking-names.webp
getWebp 2014-07-25-battle-of-epic-proportions.webp
getWebp 2020-03-13-the-secret.webp
getWebp 2020-03-16-jim-jimminy-jim-jimminy-jim-jim-jerry.webp
getWebp 2020-03-18-super-camouflage.webp
getWebp 2020-03-20-this-looks-like-a-job-for-the-intern.webp
getWebp 2020-03-23-then-who-was-car.webp
getWebp 2020-03-25-well-turn-me-into-a-newt.webp
getWebp 2020-03-27-exactly-what-spot-would-have-done.webp
getWebp 2020-03-30-shocking-reveal.webp