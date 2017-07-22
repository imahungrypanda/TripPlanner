# Trip Planner
### Description
Trip Planner is a react/google maps based web app that finds the users current location and allows the user to drop several markers/pins down. Once a few markers are down it becomes possible to find the best route between the markers.

### TODO:

- [x] get times/routes from each point
- [x] use a graph to determine the best route based on time (Have route go in a full circle) Switched to use the google directions api and pass it a list of way points to be stopped at
- [ ] make history button show the history (CONSIDER having history also hold the best route to take if one was found)
- [ ] tests
- [ ] store history to the browser using localStorage for continuous history
- [ ] undo button
- [ ] option to set start and end points
- [ ] allow for a route to be added to once it has been found
- [ ] instruction modal when page first loads
