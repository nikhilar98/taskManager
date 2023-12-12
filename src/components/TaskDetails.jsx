import { Box, Button, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../App';
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '0px',
    boxShadow: 24,
    p: 4,
    borderRadius:'20px'
  };

export default function TaskDetails(){

    const {tasksState,taskDispatch} = useContext(appContext)

    const task = tasksState.tasks.find(ele=>ele.id===tasksState.currentTaskId)
    console.log('selected task',task)

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [status,setStatus] = useState('')
    const [formErrors,setFormErrors] = useState({})

    const errors = {} 

    useEffect(()=>{
        if(task) { 
            setTitle(task.title)
            setDescription(task.description)
            setStatus(task.status)
        }
    },[task])

    
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

    const handleClose = () => {
        setFormErrors({})
        taskDispatch({type:'MODAL-CLOSE'})
    }

    function handleUpdate(e){
        e.preventDefault() 

        runValidations() 

        if(Object.keys(errors).length===0){
            setFormErrors({})
            const formData=  {
                title,
                description,
                status,
            }
            
            taskDispatch({type:'UPDATE_TASK',payload:formData})
        }
        else 
        { 
            setFormErrors(errors)
        }
        
        
    }

    return (
        <div>
                <Modal
                    open={tasksState.modalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} component={tasksState.isEdit ? 'form' : 'div'} onSubmit={handleUpdate}>
                        {
                            tasksState.isEdit ? 
                            <>
                            <label htmlFor="edit-title">Enter title</label><br/>
                            <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} id='edit-title'/>
                            <span className="errorMessage">{formErrors.title && formErrors.title}</span><br/>

                            <label htmlFor="edit-description">Enter description</label><br/>
                            <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} id='edit-description'/>
                            <span className="errorMessage">{formErrors.description && formErrors.description}</span><br/>

                            <label> Select the current status of your task : </label>
                            <input type="radio" checked={status==='toDo'} value='toDo' name="status" id='edit-toDo' onChange={(e)=>{setStatus(e.target.value)}}/>
                            <label htmlFor="edit-toDo">To Do</label>

                            <input type="radio" checked={status==='inProgress'} value='inProgress' name="status" id='edit-inProgress' onChange={(e)=>{setStatus(e.target.value)}}/>
                            <label htmlFor="edit-inProgress">In progress</label>

                            <input type="radio" checked={status==='completed'} value='completed' name="status" id='edit-completed' onChange={(e)=>{setStatus(e.target.value)}}/>
                            <label htmlFor="edit-completed">Completed</label><br/>
                            <span className="errorMessage">{formErrors.status && formErrors.status}</span>

                            <input type="submit" value="Update Task" />
                            </> 

                            :

                            <>
                                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                    <Typography id="modal-modal-title" variant="h2" component="h2">
                                        {task?.title}
                                    </Typography>
                                    <Button sx={{color:task?.status==='toDo'?'orange':'green'}}> {task?.status}</Button>
                                </div>
                                    <Typography id="modal-modal-description" sx={{ m: 10 }}>
                                        {task?.description}
                                    </Typography>
                            </> 
                        }
                        { !tasksState.isEdit && <Button type='button' onClick={()=>{taskDispatch({type:'IS_EDIT_ON'})}}>Edit</Button>}
                    </Box>
                </Modal>
        </div>
    )

}
