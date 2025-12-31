import "./MainBody.css";

function MainBody() {
    return (
        <main className="main-body">
            <section className="welcome-section">
                <h1>Welcome to Our Luxury Hotel</h1>
                <p>
                    Experience unmatched comfort, breathtaking views, and
                    world-class hospitality. Whether you're here for a
                    relaxing vacation or a business trip, we have everything
                    you need.
                </p>
                <button className="explore-btn">Explore Rooms</button>
            </section>

            <section className="features-section">
                <div className="feature">
                    <h3>🏨 Elegant Rooms</h3>
                    <p>Beautifully designed rooms for your comfort.</p>
                </div>
                <div className="feature">
                    <h3>🍽 Fine Dining</h3>
                    <p>Enjoy gourmet meals from top chefs.</p>
                </div>
                <div className="feature">
                    <h3>🏊 Relax & Refresh</h3>
                    <p>Swimming pool, spa, and wellness center.</p>
                </div>
            </section>
        </main>
    );
}

export default MainBody;
