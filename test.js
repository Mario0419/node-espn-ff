const EspnFF = require('espn-ff');

// Create a scraper instance
// NOTE: For public leagues, you do not need `cookie`, for private you will
const scraper = new EspnFF({
    leagueId: 968390,
});

scraper.getFantasyTeams((err, teams) => {
    console.log('TEAMS');
    console.dir(teams);
});

scraper.getRoster(1, (err, roster) => {
    console.log('Team 1 roster');
    console.dir(roster);
});

// scraper.getMatchups(null, (err, matchups) => {
//     console.log('This weeks matchups');
//     console.dir(matchups);
// });

scraper.getStandings((error, standings) => {
    console.log('Standings');
    console.log(standings);
});