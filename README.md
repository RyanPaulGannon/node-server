# Node-Server

https://www.freecodecamp.org/learn/back-end-development-and-apis/ <br />
Active Challenge: Exercise Tracker

|Status |Description|
|-----|--------|
|✅|You should provide your own project, not the example URL.|
|✅|You can POST to /api/users with form data username to create a new user.|
|❌|The returned response from POST /api/users with form data username will be an object with username and _id properties.|
|✅|You can make a GET request to /api/users to get a list of all users.|
|✅|The GET request to /api/users returns an array.|
|❌|Waiting:Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.|
|❌|You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.|
|❌|The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.|
|❌|You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.|
|❌|A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.|
|❌|Waiting:A GET request to /api/users/:_id/logs will return the user object with a log array of all the exercises added.|
|❌|Each item in the log array that is returned from GET /api/users/:_id/logs is an object that should have a description, duration, and date properties.|
|❌|The description property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string.|
|❌|The duration property of any object in the log array that is returned from GET /api/users/:_id/logs should be a number.|
|❌|Waiting:The date property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string. Use the dateString format of the Date API.|
|❌|Waiting:The date property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string. Use the dateString format of the Date API.|
