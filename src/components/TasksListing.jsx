import { useContext, useMemo, useState } from "react"
import { appContext } from "../App"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import color from "../helpers/color";
import { Box, LinearProgress } from "@mui/material";


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

    const completionPercentage=useMemo(()=>{
        return Math.round(tasksState.tasks.filter(ele=>ele.status=='completed').length*100/tasksState.tasks.length)
    },[tasksState.tasks])
       
    const filteredTasks=useMemo(()=>{
        return tasksState.tasks.filter(ele=>ele.status===filter)
    },[filter,tasksState.tasks])

    return (
        <div>
            { !isNaN(completionPercentage) && <Box sx={{ display: 'flex', alignItems: 'center',mb:2 }}>
                <Box sx={{ width: '30%', mr: 1 }}>
                    <LinearProgress variant="determinate" value={completionPercentage} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${completionPercentage}%`} completed</Typography>
                </Box>
            </Box>}
            <label htmlFor="filter" style={{marginRight:"20px"}}>Filter by status</label>
            <select id="filter" value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
                <option value="">All</option>
                <option value="to do">To Do</option>
                <option value="in progress">In Progress</option>
                <option value="completed">completed</option>
            </select>
            <ul>
                {
                    (filter ? filteredTasks : tasksState.tasks).map(ele=>{
                        return <div key={ele.id} style={{display:'flex',alignItems:'center',gap:'20px'}} className="taskBox">
                                <Card  sx={{mb:'20px',width:'400px',backgroundColor:'rgb(181, 215, 252)'}} onClick={()=>{handleCardClick(ele.id)}}>
                                        <CardContent sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                            <Typography sx={{ fontSize: 16}}>
                                                {ele.title}
                                            </Typography>
                                            <Typography sx={{ fontSize: 12}} color={color(ele.status)}>
                                                {ele.status.toUpperCase()}
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
