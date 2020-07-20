# Vue
## Vue Class Component + Nginx + Node.js(Express.js) + MongoDB
## Can be dockerize by runnning docker compose file. 
## Node and Mongo are required in Docker.


## Front End:
Employee Management system. Visualize each employee's ID, full name and email. 

Two components wrapped in App component mounted on index.html's root id=app tag. 

1. EmployeeForm -> form to add a new employee. Basic input validation check is implemented. Emits save event to its parent. 
2. EmployeeTable -> PrimativeUI table shows all employees' info, no paging has been implemented yet. Emits delete and edit/save event to its parent.
3. App -> Catches children's events and make API calls. All connections are short one-time request. No polling and socket. 

# 2. Back End:
Node.js Express server. Connected to MongoDB using Mongoose ORM. 

Collection Schema:
1. id: Number
2. name: String
3. email: String
4. deleted: Boolean (TBD)

API Documentations:

Nginx will redirect /api/* directl to /*
GET /employees LIST all employees
POST /employees CERATE employee by request body data
DELETE /employees?id= REMOVE employee by id given by query
PUT /employee?id= (PARTIAL) UPDATE employee found by ID with new data given by requested body data

#Subject to Change: 
1. Adopt VueX-class
2. Adopt Vue-property-decorator
3. Adopt Vue-model-decorator
4. Change to typescript
