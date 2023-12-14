export default function taskReducer(state,action) {  
    switch(action.type){
        case 'SET_TASKS' : { 
            return {...state,tasks:action.payload}
        }
        case 'ADD_TASK' : { 
            return {...state,tasks:[...state.tasks,action.payload]}
        }
        case 'UPDATE_TASK' : { 
            const newTasks = state.tasks.map(ele=>{
                if(ele.id===state.currentTaskId){
                    return {...ele,...action.payload}
                }   
                else { 
                    return {...ele}
                }
            })
            return {...state,tasks:newTasks,modalOpen:false,currentTaskId:'',isEdit:false}
        }
        case 'DELETE-TASK' : { 
            const newTasks = state.tasks.filter(ele=>{
                return ele.id!==action.payload
            })
            return {...state,tasks:newTasks} 
        }
        case 'MODAL-OPEN':{
            return {...state,modalOpen:true,currentTaskId:action.payload} 
        }
        case 'MODAL-CLOSE':{
            return {...state,modalOpen:false,currentTaskId:'',isEdit:false} 
        }
        case 'IS_EDIT_ON':{ 
            return {...state,isEdit:true} 
        }
        case 'IS_EDIT_OFF':{
            return {...state,isEdit:false} 
        }
        default : return {...state}
    }
}