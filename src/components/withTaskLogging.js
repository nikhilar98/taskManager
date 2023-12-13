import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const withTaskLogging = (WrappedComponent) => {

    function WithTaskLogging(props) {

      const logTaskAction = (action, task) => {
        toast.success(`${action}: ${task?.title}`)
      };
  
      return (
       
          <WrappedComponent {...props} logTaskAction={logTaskAction} />
        
      );
    };

    return WithTaskLogging
  };
  
  export default withTaskLogging;



