
function FailureMessageComponent(errorMessage){
    if(errorMessage){
        return(
            <div className="error">Authentication Failure.....Please Check Credentials</div>
        )
    }else{
        return null;
    }
    
}

export default FailureMessageComponent;