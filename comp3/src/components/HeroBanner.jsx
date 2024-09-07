import background from '../../assets/images/lorenzo-herrera-p0j-mE6mGo4-unsplash.jpeg';

export default function HeroBanner({}) {
    return (
        <header>
            <div className="hero" style={{ backgroundImage: `url(${background})` }}>
                <div className="heroText">
                    <h1>High Score Hall of Fame</h1>
                    <p>fsdfsd</p>
                </div>
            </div>
        </header>
    )
}