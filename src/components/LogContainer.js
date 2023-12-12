
function LogContainer(OriginalComponent){

    function NewComponent(){ 
        const msg = 'Created new task'
        return <OriginalComponent msg={msg} />
    }

    return NewComponent
    
}

export default LogContainer




