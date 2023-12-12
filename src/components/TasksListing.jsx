import { useContext, useState } from "react"
import { appContext } from "../App"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TasksListing(props){

    const {tasksState,taskDispatch} = useContext(appContext)
    const [filter,setFilter] = useState('')
    

    console.log('tasksState',tasksState.tasks)

    function handleCardClick(id){
        console.log('clicked card : ',id)
        taskDispatch({type:'MODAL-OPEN',payload:id})
    }

    function handleDelete(id){
        taskDispatch({type:'DELETE-TASK',payload:id})
    }

    const filteredTasks = tasksState.tasks.filter(ele=>ele.status===filter)
    console.log('filtered tasks',filteredTasks)

    return (
        <div>
            <label htmlFor="filter" style={{marginRight:"20px"}}>Filter by status</label>
            <select id="filter" value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
                <option value="">All</option>
                <option value="toDo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">completed</option>
            </select>
            <ul>
                {
                    (filter ? filteredTasks : tasksState.tasks).map(ele=>{
                        return <div key={ele.id} style={{display:'flex',alignItems:'center',gap:'20px'}}>
                                <Card  sx={{mb:'20px',width:'400px',backgroundColor:'rgb(181, 215, 252)'}} onClick={()=>{handleCardClick(ele.id)}}>
                                        <CardContent sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                            <Typography sx={{ fontSize: 16}} color="text.secondary">
                                                {ele.title}
                                            </Typography>
                                            <Typography sx={{ fontSize: 12}} color="text.secondary">
                                                {ele.status}
                                            </Typography>
                                        </CardContent>
                                        
                                </Card>
                                <DeleteIcon onClick={()=>{handleDelete(ele.id)}}/>
                            </div>
                    })
                }
            </ul>
        </div>
    )

}
