# TV-Show-API
API Practice: TV Maze Database API practice for UMass/Springboard Bootcamp

<p>In this exercise, you’ll finish a partially-complete web app which is a front-end
for the <a class="reference external" href="https://www.tvmaze.com/api">TVMaze API</a>.</p>
<div class="section" id="step-1-understand-the-api">
<h2>Step 1: Understand The API<a class="headerlink" href="#step-1-understand-the-api" title="Permalink to this headline">»</a></h2>
<p>Explore the <a class="reference external" href="https://www.tvmaze.com/api">TVMaze API</a>.  You will need to make
a get request to two endpoints:</p>
<p><cite>http://api.tvmaze.com/search/shows?q=&lt;search query&gt;</cite></p>
<p>and</p>
<p><cite>http://api.tvmaze.com/shows/&lt;show id&gt;/episodes</cite></p>
<p>Use a tool like curl or insomnia to make a HTTP request to both endpoints and
get comfortable with the JSON that is returned.  You will need to parse the JSON
in order to get the data for the application.</p>
</div>
<div class="section" id="step-2-understand-current-code">
<h2>Step 2: Understand Current Code<a class="headerlink" href="#step-2-understand-current-code" title="Permalink to this headline">»</a></h2>
<p>We’ve provided two files for you:</p>
<dl class="docutils">
<dt><cite>tvmaze.html</cite></dt><dd>All the HTML for the application. You should be able to complete all of the
pages for this exercise without having to change anything in this file.</dd>
<dt><cite>tvmaze.js</cite></dt><dd>Starter JavaScript for the application.</dd>
</dl>
<p>Right now, the application has this feature:</p>
<ul class="simple">
<li>You can type part of a TV show title into the search form and, on submission,
it will return information about a hard coded show. It will show
a series of cards with information on the show.</li>
</ul>
<p>Note how we’ve structured this code:</p>
<ul>
<li><p class="first">by having a separate function for <cite>searchShows</cite>, you can test the
“search API for shows” without having to do deal with anything related to
the DOM in tests. This also makes this function re-usable if we built a
different version of this app with a different front-end (like in React);
we could re-use <cite>searchShows</cite>.</p>
<p>Play with this function in the console and get a sense for how it works.</p>
</li>
<li><p class="first"><cite>populateShows</cite> deals just with inserting the passed-in shows into the
DOM. This makes this testable without having to have it tied to the code
that gets data from the API.</p>
</li>
<li><p class="first">our <cite>handleSearch</cite> event handler ties the two together: it gets the search
term, gets the shows using <cite>searchShows</cite>, and fills in the DOM with
<cite>populateShows</cite>.</p>
</li>
</ul>
<div class="admonition note">
<p class="first admonition-title">Note</p>
<p>Notice the data attribute!</p>
<p>A particularly important thing to note in reading our code is how we used
a <a class="reference external" href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes">“data attribute”</a>.</p>
<p>Data attributes are very useful for when you want to associate some data (in
this case, the show ID) in the DOM, so you can recall it later.</p>
<p>Note in <cite>populateShows</cite> how we add <cite>data-show-id</cite> onto the outermost <cite>.Show</cite> div.
Later, when we want to retrieve which show ID was clicked on, we’ll be able to
get that show ID.</p>
<p class="last">You may find it helpful to skim the MDN article linked above.</p>
</div>
</div>
<div class="section" id="step-3-make-ajax-request-for-search">
<h2>Step 3: Make AJAX request for Search<a class="headerlink" href="#step-3-make-ajax-request-for-search" title="Permalink to this headline">»</a></h2>
<p>Remove the hard coded array from the <cite>searchShows</cite> function and make replace
the code with an AJAX request to the search shows api from TVMaze.  Make sure
that the array of information you return from the function is formatted as
described in the comments for the <cite>searchShows</cite> function.</p>
</div>
<div class="section" id="step-4-add-show-images">
<h2>Step 4: Add Show Images<a class="headerlink" href="#step-4-add-show-images" title="Permalink to this headline">»</a></h2>
<p>The TVMaze API includes images for many shows, but we don’t currently use these.</p>
<p>Explore the docs for the TVMaze API and find how we’d extract an image in the
<cite>searchShows</cite> function. Add this image to the result object returned by this
function.</p>
<p>Update <cite>populateShows</cite> to show the image. You can do this with the following
snippet of HTML, inside the <cite>.card</cite> div:</p>
<div class="highlight-html notranslate"><div class="highlight"><pre><span></span><span class="p">&lt;</span><span class="nt">img</span> <span class="na">class</span><span class="o">=</span><span class="s">&quot;card-img-top&quot;</span> <span class="na">src</span><span class="o">=</span><span class="s">&quot;/path/to/image&quot;</span><span class="p">&gt;</span>
</pre></div>
</div>
<p><strong>Be careful how you implement this</strong>. Not all shows have images, and if you’re
not careful, this will break for shows without images. Make sure that you write this in
a way where shows without missing images won’t break your site.</p>
<p>For shows without an image, you can have it show this generic image instead:
<a class="reference external" href="https://tinyurl.com/tv-missing">https://tinyurl.com/tv-missing</a></p>
</div>
<div class="section" id="step-5-add-episode-lists">
<h2>Step 5: Add Episode Lists<a class="headerlink" href="#step-5-add-episode-lists" title="Permalink to this headline">»</a></h2>
<p>We want to add a feature where clicking an “Episodes” button at the bottom
of a show card shows the episodes for this show at the bottom of the page.</p>
<ul>
<li><p class="first">First, implement the <cite>getEpisodes</cite> function, which is given a show ID. It should
return an array of objects with basic information on the episodes for that show,
like:</p>
<div class="highlight-js notranslate"><div class="highlight"><pre><span></span><span class="p">[</span><span class="w"></span>
<span class="w">  </span><span class="p">{</span><span class="nx">id</span><span class="o">:</span><span class="w"> </span><span class="mf">1234</span><span class="p">,</span><span class="w"> </span><span class="nx">name</span><span class="o">:</span><span class="w"> </span><span class="s2">&quot;Pilot&quot;</span><span class="p">,</span><span class="w"> </span><span class="nx">season</span><span class="o">:</span><span class="w"> </span><span class="s2">&quot;1&quot;</span><span class="p">,</span><span class="w"> </span><span class="nx">number</span><span class="o">:</span><span class="w"> </span><span class="s2">&quot;1&quot;</span><span class="p">},</span><span class="w"></span>
<span class="w">  </span><span class="p">{</span><span class="nx">id</span><span class="o">:</span><span class="w"> </span><span class="mf">3434</span><span class="p">,</span><span class="w"> </span><span class="nx">name</span><span class="o">:</span><span class="w"> </span><span class="s2">&quot;In the Beginning&quot;</span><span class="p">,</span><span class="w"> </span><span class="nx">season</span><span class="o">:</span><span class="w"> </span><span class="s2">&quot;1&quot;</span><span class="p">,</span><span class="w"> </span><span class="nx">number</span><span class="o">:</span><span class="w"> </span><span class="s2">&quot;2&quot;</span><span class="p">},</span><span class="w"></span>
<span class="w">  </span><span class="cm">/* and so on... */</span><span class="w"></span>
<span class="p">]</span><span class="w"></span>
</pre></div>
</div>
<p>To do this, you’ll need to read how to get episode data from TVMaze API.</p>
</li>
<li><p class="first">Next, write a function, <cite>populateEpisodes</cite>, which is provided an array of
episodes info, and populates that into the <cite>#episodes-list</cite> part of the DOM.</p>
<p>The episodes list is a simple <cite>&lt;ul&gt;</cite>, and the individual episodes can just be
basic <cite>&lt;li&gt;</cite> elements, like <code class="docutils literal notranslate"><span class="pre">&lt;li&gt;Pilot</span> <span class="pre">(season</span> <span class="pre">1,</span> <span class="pre">number</span> <span class="pre">1)&lt;/li&gt;</span></code>.</p>
<p>(Also, now that we have episodes, you’ll need to reveal the <cite>#episodes-area</cite>,
which is initially hidden!)</p>
</li>
<li><p class="first">Add an “Episodes” button at the bottom of each show card</p>
</li>
<li><p class="first">Add a click handler that listens for clicks on those buttons.</p>
<ul class="simple">
<li>You’ll need to make sure this eventlistener works even though the shows
won’t be present in the initial DOM</li>
<li>You’ll need to get the show ID of the show for the button you clicked. To do
this, you can read about <a class="reference external" href="https://api.jquery.com/data/">getting data attributes with jQuery</a> and also how to <a class="reference external" href="https://api.jquery.com/closest/">use jQuery to find something a few levels up in the DOM</a></li>
<li>Then, this should use your <cite>getEpisodes</cite> and <cite>populateEpisodes</cite> functions.</li>
</ul>
</li>
</ul>
<p><strong>Make sure you put thought into good variable names and code style for these,
and write comments!</strong></p>
</div>
<div class="section" id="further-study">
<h2>Further Study<a class="headerlink" href="#further-study" title="Permalink to this headline">»</a></h2>
<p>There are a lot of other things you could do here:</p>
<ul>
<li><p class="first"><strong>Write tests</strong> for your functions. Practice writing software tests in a great
way to get better at this critical developer skill!</p>
</li>
<li><p class="first"><strong>Add other information/features from TVMaze</strong>. There are other things you can
get from TV Maze—you could list the actors in a show, or the genres of a show,
or other things.</p>
</li>
<li><p class="first"><strong>Make the episodes into a Bootstrap modal</strong>. If you want to learn more about
the components of Bootstrap, you could change you code so that it shows the
list of episodes in a pop-up modal, rather than a list at the bottom of the page.</p>
<p>If you wrote the functions in part 3 well, you should be able to this only by
having to change the <cite>populateEpisodes</cite> function, but not other parts of your
JavaScript — a nice reward for breaking your code thoughtfully into good
functions!</p>
</li>
</ul>
