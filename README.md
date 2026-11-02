# Rocket Launch Explorer
Class Assignment.

Repository Link: https://github.com/clustermoon/CIS-131-Assignment---Rocket-Launch-Explorer

How this program works: 
getUpcomingLaunches sends a XML request when the state is 4 and the status is 200 ok, it then calls
populateDropdown when it recieves the response which populates the drop down with the data. This lets
the drop down fill only when the data has actually arrived from the Api.


What changed in teh Axios version:
Axios handles the ready state checks and JSON parsing so the data is available. The .then() method runs
when the response came back and calls the method to populate the dropdown, or display info. On the other
hand .catch() runs when the request fails to come back, and it shows an error message instead.
