import { useContext, useState } from "react"
import { appContext } from "../App"



export default function CreateTaskForm(){

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [status,setStatus] = useState('')
    const [formErrors,setFormErrors] = useState({})
    const {taskDispatch,logTaskAction} = useContext(appContext)
    
    const errors = {}


    function runValidations() { 
        if(title===''){
            errors.title = 'Title cannot be empty.'
        }
        if(description===''){
            errors.description = 'Description cannot be empty.'
        }
        if(status===''){
            errors.status = 'Status is required.'
        }
    }
    

    function handleSubmit(e){
        e.preventDefault() 

        runValidations()

        if(Object.keys(errors).length===0){
            setFormErrors({})
            const formData = {  
                title, 
                description,
                status,
                id:Number(new Date()),
            }
    
            taskDispatch({type:'ADD_TASK',payload:formData})
            logTaskAction('Task added succesfully',formData)
            setTitle('')
            setDescription('')
            setStatus('')
        }
        else {
            setFormErrors(errors)
        }
        
        
    }


    return (
        <div className="form-container" data-testid='taskform-1'>
            <form onSubmit={handleSubmit}>  
                <fieldset>
                    <legend>Create task</legend>
                    <label htmlFor="title">Enter title</label><br/>
                    <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} id='title'/>
                    <span className="errorMessage">{formErrors.title && formErrors.title}</span><br/>
                    <label htmlFor="description">Enter description</label><br/>
                    <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} id='description' rows="4" cols="40"/>
                    <span className="errorMessage">{formErrors.description && formErrors.description}</span><br/>
                    <label> Status of task : </label>
                    <input type="radio" checked={status==='to do'} value='to do' name="status" id='toDo' onChange={(e)=>{setStatus(e.target.value)}}/>
                    <label htmlFor="toDo">To Do</label>
                    <input type="radio" checked={status==='in progress'} value='in progress' name="status" id='inProgress' onChange={(e)=>{setStatus(e.target.value)}}/>
                    <label htmlFor="inProgress">In progress</label><br/>
                    <span className="errorMessage">{formErrors.status && formErrors.status}</span><br/>
                    
                    <button type="submit" className="submit-button">CREATE</button>
                </fieldset>
            </form>
        </div>
    )

}
