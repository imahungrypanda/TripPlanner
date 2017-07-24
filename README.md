# Trip Planner
### Description
Trip Planner is a react/google maps based web-app that finds the user’s current location and allows the user to drop several markers/pins down. Once a few markers are down it becomes possible to find the best route based on time between the markers. Once a route has been found it is added to the history so that a user can go back and either run the route again or add more markers to the route. The user also has the ability to clear the route to start a new one.

### Features
After dropping several markers click the `Find Best Route` button and off goes the call to Google Maps Direction Service to find the best route between the current location and all the markers that have been placed.

`Clear` removes all placed markers so that you can start over and `History` stores all the markers of routes that have been found.

### TODO:

- [x] get times/routes from each point
- [x] use a graph to determine the best route based on time (Have route go in a full circle) Switched to use the google directions api and pass it a list of way points to be stopped at
- [x] make history button show the history (CONSIDER having history also hold the best route to take if one was found) Didn't need to use the best route in the history
- [ ] tests
- [ ] option to set start and end points
- [ ] store history to the browser using localStorage for continuous history
- [ ] undo button
- [ ] allow for a route to be added to once it has been found
- [ ] instruction modal when page first loads
