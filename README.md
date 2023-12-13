Instructions to run the app locally. 

git clone https://github.com/nikhilar98/taskManager <br/>
cd taskManager <br/>
npm install <br/>
npm start <br/>

Live Link  : https://task-manager-self-sigma.vercel.app/ 

Assumptions : 
User can set the status of a task as 'to do' or 'in progress' while he/she creates the task. Once created, User can click on the task to update it to completed status. 


Decisions: 
The state of the application is managed using React's useReducer Hook as it's better suited for managing complex data types. The state and dispatch functions are passed down to all the child components using React's useContext API, so they can directly access the state.

