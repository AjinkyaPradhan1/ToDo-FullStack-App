
function SuccessMessageComponent(successMessage){
    if(successMessage){
        return(
            <div className="success">Authentication Successful</div>
        )
    }else{
        return null;
    }
    
}

export default SuccessMessageComponent;