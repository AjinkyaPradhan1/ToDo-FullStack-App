function FooterComponent(){

    return(
        <footer className="footer">
        <div className="container">
            &copy; TheBlueMoonDevelopers {new Date().getFullYear()}-{new Date().getFullYear()+1} ToDo App. All rights reserved.<br />
        </div>
        </footer>
    )
}

export default FooterComponent;