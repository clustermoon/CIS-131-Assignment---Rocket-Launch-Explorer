// ** JavaScript Starter File **
// Purpose: Populate a dropdown of upcoming launches and display mission details
// and a rocket image using callbacks (Part 1), then refactor to promises (Part 2).

// Space Devs development endpoint: no rate limits, but the data is stale and limited.
const BASE_URL = "https://lldev.thespacedevs.com/2.3.0";

// ---------------------------------------------------------------
// PART 1: XMLHttpRequest and callbacks
// ---------------------------------------------------------------

// Step 1: Create getUpcomingLaunches(callback)
// - Makes a GET request to BASE_URL + "/launches/upcoming/"
// - Parses the response
// - Calls the callback function and passes the results array
function getUpcomingLaunches(callback) {
  const status = document.getElementById("status");
  status.textContent = "Loading...";
  
  axios.get(BASE_URL + "/launches/upcoming/").then(function (response) {
    status.textContent = "";
    populateDropdown(response.data.results);
  }).catch(function (error){
    status.textContent = "Could not load upcoming launches. Please try again later.";
    console.error(error);
  });
}

// Step 2: Create populateDropdown(launches)
// - Receives an array of launches
// - Adds one <option> per launch: text = launch name, value = launch id
function populateDropdown(launches) {
  for (const launch of launches) {
    const option = document.createElement("option");
    option.text = launch.name;
    option.value = launch.id;
    document.getElementById("launchDropdown").appendChild(option);
  }
}

// Step 3: Add event listener to #launchDropdown
// - On change, get the selected launch ID
// - Call getLaunchDetails(launchId, callback)
document.getElementById("launchDropdown").addEventListener("change", function () {
  const launchId = this.value;
  getLaunchDetails(launchId);
});

// Step 4: Create getLaunchDetails(launchId, callback)
// - Makes a GET request to BASE_URL + "/launches/" + launchId + "/"
// - Parses the response and passes the launch object to the callback
function getLaunchDetails(launchId, callback) {
  const status = document.getElementById("status");
  status.textContent = "Loading...";
  
  axios.get(BASE_URL + "/launches/" + launchId + "/").then(function (response) {
    status.textContent = "";
    displayLaunchInfo(response.data);
  }).catch(function (error){
    status.textContent = "Could not load launch details. Please try again later.";
    console.error(error);
  });
}

// Step 5: Create displayLaunchInfo(launch)
// - Updates #missionDetails with the mission name and description (if available)
// - Creates an image of the rocket (launch.rocket.configuration.image.image_url) and appends it to #rocket
// - If no image is available, displays a message instead
function displayLaunchInfo(launch) {
  const missionDetails = document.getElementById("missionDetails");
  const rocket = document.getElementById("rocket");

  missionDetails.innerHTML = "";
  rocket.innerHTML = "";

  const nameHeading = document.createElement("h2");
  nameHeading.textContent = launch.name;
  missionDetails.appendChild(nameHeading);

  const description = document.createElement("p");
  if (launch.mission && launch.mission.description) {
    description.textContent = launch.mission.description;
  } else {
    description.textContent = "No mission description available.";
  }
  missionDetails.appendChild(description);

  const config = launch.rocket && launch.rocket.configuration;
  if (config && config.image && config.image.image_url) {
    const img = document.createElement("img");
    img.src = config.image.image_url;
    img.alt = config.name || "Rocket image";
    rocket.appendChild(img);
  } else {
    const noImageMsg = document.createElement("p");
    noImageMsg.textContent = "No rocket image available.";
    rocket.appendChild(noImageMsg);
  }
}

// Final step: kick off the flow
getUpcomingLaunches();

// ---------------------------------------------------------------
// PART 2: Axios and promises (refactor after Part 1 is committed)
// ---------------------------------------------------------------
// - Replace both XHR requests with axios.get(...).then(...).catch(...)
// - Show "Loading..." in #status while a request is pending
// - Show a clear error message in #status when a request fails
// - Clear the status message when data arrives

