import { useReducer,createContext, useEffect } from "react";
import taskReducer from "./reducers/taskReducer";
import TasksListing from "./components/TasksListing";
import CreateTaskForm from "./components/CreateTaskForm";
import TaskDetails from "./components/TaskDetails";
import withTaskLogging from "./components/withTaskLogging";


export const appContext = createContext()

 const App=({logTaskAction})=> {

  const [tasksState,taskDispatch] = useReducer(taskReducer,{tasks:[],modalOpen:false,currentTaskId:'',isEdit:false})
  
  useEffect(()=>{
    const data = localStorage.getItem('tasks')
    if(data) { 
      taskDispatch({type:'SET_TASKS',payload:JSON.parse(localStorage.getItem('tasks'))})
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasksState.tasks))
  },[tasksState.tasks])


  return (
    <appContext.Provider value={{tasksState,taskDispatch,logTaskAction}}>
      <div>
        <div className="container">
          <div className="formContainer">
            <h1>Task Manager</h1>
            <CreateTaskForm/>
          </div>
          <div className='listingContainer'>
            <h2>My tasks - {tasksState.tasks.length}</h2>
            <TasksListing />
          </div>
        </div>
          <TaskDetails/>
      </div>
    </appContext.Provider>
  );
}

export default withTaskLogging(App)
