 import "./Home_header.css";


function Hotel_header(){

    return(
        <>
          <header className="main-header">
            <a href="#" className="logo">Hotel</a>
            <nav className="main-nav">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Sign In</a></li>
                </ul>
            </nav>
            <a href="#" className="book-now">Book Now</a>
        </header> 
        
        </>
    
    )
}

export default Hotel_header;