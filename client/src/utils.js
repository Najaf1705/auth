import { toast } from 'react-toastify';

const handleWarning=(msg)=>{
    toast.warning(msg);
}

const handleSuccess=(msg)=>{
    toast.success(msg);
}

const handleError=(msg)=>{
    toast.error(msg);
}

export {handleError, handleSuccess, handleWarning};