export default function color(str){
    if(str==='to do'){
        return 'red'
    }
    else if(str==='completed'){
        return 'green'
    }
    else {
        return 'blue'
    }
}