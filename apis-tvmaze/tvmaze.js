/**
 *  Author: Justin Brown for UMass/Springboard Bootcamp
 *  Assignment: API Practice: TV Maze
 *  In this exercise, you’ll finish a partially-complete web app which is a front-end for the TVMaze API.
 *  
 *  Step 1: Understand The API
 *  Explore the TVMaze API. You will need to make a get request to two endpoints:
 *  http://api.tvmaze.com/search/shows?q=<search query>
 *  and
 *  http://api.tvmaze.com/shows/<show id>/episodes
 *  Use a tool like curl or insomnia to make a HTTP request to both endpoints and get comfortable with the 
 *  JSON that is returned. You will need to parse the JSON in order to get the data for the application.
 *  
 *  Step 2: Understand Current Code
 *  We’ve provided two files for you:
 *  tvmaze.html
 *  All the HTML for the application. You should be able to complete all of the pages for this exercise 
 *  without having to change anything in this file.
 *  
 *  tvmaze.js
 *  Starter JavaScript for the application.
 *  Right now, the application has this feature:
 *  You can type part of a TV show title into the search form and, on submission, it will return 
 *  information about a hard coded show. It will show a series of cards with information on the show.
 *  
 *  Note how we’ve structured this code:
 *  by having a separate function for getShowsByTerm, you can test the “search API for shows” without having
 *  to do deal with anything related to the DOM in tests. This also makes this function re-usable if we 
 *  built a different version of this app with a different front-end (like in React); we could re-use 
 *  getShowsByTerm.
 *  Play with this function in the console and get a sense for how it works.
 *  populateShows deals just with inserting the passed-in shows into the DOM. This makes this testable 
 *  without having to have it tied to the code that gets data from the API.
 *  our handleSearch event handler ties the two together: it gets the search term, gets the shows using 
 *  getShowsByTerm, and fills in the DOM with populateShows.
 *  
 *  NOTE Notice the data attribute!
 *  A particularly important thing to note in reading our code is how we used a “data attribute”.
 *  Data attributes are very useful for when you want to associate some data (in this case, the show ID) 
 *  in the DOM, so you can recall it later.
 *  
 *  Note in populateShows how we add data-show-id onto the outermost .Show div. Later, when we want to 
 *  retrieve which show ID was clicked on, we’ll be able to get that show ID.
 *  You may find it helpful to skim the MDN article linked above.
 *  
 *  Step 3: Make AJAX request for Search
 *  Remove the hard coded array from the getShowsByTerm function and make replace the code with an AJAX 
 *  request to the search shows api from TVMaze. Make sure that the array of information you return from 
 *  the function is formatted as described in the comments for the getShowsByTerm function.
 *  
 *  Step 4: Add Show Images
 *  The TVMaze API includes images for many shows, but we don’t currently use these.
 *  Explore the docs for the TVMaze API and find how we’d extract an image in the getShowsByTerm function. 
 *  Add this image to the result object returned by this function.
 *  
 *  Update populateShows to show the image. You can do this with the following snippet of HTML, inside 
 *  the .card div:
 *  <img class="card-img-top" src="/path/to/image">
 *  Be careful how you implement this. Not all shows have images, and if you’re not careful, this will 
 *  break for shows without images. Make sure that you write this in a way where shows without missing 
 *  images won’t break your site.
 *  For shows without an image, you can have it show this generic image instead: 
 *  https://tinyurl.com/tv-missing
 *  
 *  Step 5: Add Episode Lists
 *  We want to add a feature where clicking an “Episodes” button at the bottom of a show card shows the 
 *  episodes for this show at the bottom of the page.
 *  First, implement the getEpisodes function, which is given a show ID. It should return an array of 
 *  objects with basic information on the episodes for that show, like:
 *  [
 *   {id: 1234, name: "Pilot", season: "1", number: "1"},
 *   {id: 3434, name: "In the Beginning", season: "1", number: "2"},
 *   ...
 *  ]
 *  To do this, you’ll need to read how to get episode data from TVMaze API.
 *  
 *  Next, write a function, populateEpisodes, which is provided an array of episodes info, and populates 
 *  that into the #episodes-list part of the DOM.
 *  The episodes list is a simple <ul>, and the individual episodes can just be basic <li> elements, like 
 *  <li>Pilot (season 1, number 1)</li>.
 *  (Also, now that we have episodes, you’ll need to reveal the #episodes-area, which is initially hidden!)
 *  
 *  Add an “Episodes” button at the bottom of each show card
 *  
 *  Add a click handler that listens for clicks on those buttons.
 *  
 *  You’ll need to make sure this eventlistener works even though the shows won’t be present in the 
 *  initial DOM. You’ll need to get the show ID of the show for the button you clicked. To do this, you 
 *  can read about getting data attributes with jQuery and also how to use jQuery to find something a few 
 *  levels up in the DOM. Then, this should use your getEpisodes and populateEpisodes functions. 
 *  Make sure you put thought into good variable names and code style for these, and write comments!
 *  
 *  Further Study
 *  There are a lot of other things you could do here:
 *  Write tests for your functions. Practice writing software tests in a great way to get better at this 
 *  critical developer skill!
 *  Add other information/features from TVMaze. There are other things you can get from TV Maze—you could 
 *  list the actors in a show, or the genres of a show, or other things.
 *  Make the episodes into a Bootstrap modal. If you want to learn more about the components of Bootstrap, 
 *  you could change you code so that it shows the list of episodes in a pop-up modal, rather than a list 
 *  at the bottom of the page.
 *  
 *  If you wrote the functions in part 3 well, you should be able to this only by having to change the 
 *  populateEpisodes function, but not other parts of your JavaScript — a nice reward for breaking your 
 *  code thoughtfully into good functions!
 */

"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

// Given a search term, search for tv shows that match that query.
//  Returns (promise) array of show objects: [show, show, ...].
//  Each show object contains: {id, name, summary, image}
//  (if no image URL given by API, use placeholder)
async function getShowsByTerm(term) {
  // make spaces html-safe
  let formattedTerm = term.toLowerCase().replace(/ /g, "%20");

  const response = await axios.get("https://api.tvmaze.com/search/shows?q="+formattedTerm);
  console.log(response.data);

  let shows = [];
  for (let i = 0; i < response.data.length; i++) {
    shows[i] = { 
      id: response.data[i].show.id,
      name: response.data[i].show.name,
      summary: response.data[i].show.summary,
    }
    // check if image exists
    if (response.data[i].show.image === null) {
      shows[i].image = "movie.jpg";
    } else {
      shows[i].image = response.data[i].show.image.medium;
    }
  }

  return shows;
}

// Given list of shows, create markup for each and to DOM
function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${show.image}"
              alt="${show.name} poster"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button id="${show.id}" class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
             <section id="episodesArea" class="episodes" data-hidden="true" style="display: none">
             <h4>Episodes</h4>
             <ul id="episodesList">
             </ul>
            </section>
           </div>
         </div>
       </div>`
    );
    $showsList.append($show);
  }
}

// Handle search form submission: get shows from API and display.
// Hide episodes area (that only gets shown if they ask for episodes)
async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});
/** 
$("#showsList").on('click', 'button', function() {
  let id = $(this)[0].id;
  console.log("data-show-id="+id);
  $("div[data-show-id="+id+"] #episodesArea").css('display', 'none');
});*/

// Toggles visibility of a show's Episodes section on button click
$("#showsList").on('click', 'button', function() {
  let id = $(this)[0].id;
  console.log(id);

  if ($("div[data-show-id="+id+"] .episodes").attr("data-hidden") === "true") {
    $("div[data-show-id="+id+"] .episodes").css('display', 'inherit');
    $("div[data-show-id="+id+"] .episodes").attr("data-hidden", "false");
  } else {
    $("div[data-show-id="+id+"] .episodes").css('display', 'none');
    $("div[data-show-id="+id+"] .episodes").attr("data-hidden", "true");
  }
});

// Given a show ID, get from API and return (promise) array of episodes:
// { id, name, season, number }
async function getEpisodesOfShow(id) {

}

/**  Write a clear docstring for this function... */
function populateEpisodes(episodes) {

}

