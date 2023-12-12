import { useReducer,createContext, useEffect } from "react";
import taskReducer from "./reducers/taskReducer";
import TasksListing from "./components/TasksListing";
import CreateTaskForm from "./components/CreateTaskForm";
import TaskDetails from "./components/TaskDetails";
import ToastContainer from "./components/ToastContainer";


export const appContext = createContext()

export function App() {

  const [tasksState,taskDispatch] = useReducer(taskReducer,{tasks:[],modalOpen:false,currentTaskId:'',isEdit:false})
  
  console.log(tasksState)


  useEffect(()=>{
    const data = localStorage.getItem('tasks')
    console.log('data',data)
    if(data) { 
      taskDispatch({type:'SET_TASKS',payload:JSON.parse(localStorage.getItem('tasks'))})
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasksState.tasks))
  },[tasksState.tasks])


  return (
    <appContext.Provider value={{tasksState,taskDispatch}}>
      <div>
          <h1>Title</h1>
          <CreateTaskForm/>
          <h2>Your tasks - ( {tasksState.tasks.length} )</h2>
          <TasksListing/>
          <TaskDetails/>
          <ToastContainer/>
      </div>
    </appContext.Provider>
  );
}

