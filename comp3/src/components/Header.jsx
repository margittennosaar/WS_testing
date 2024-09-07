import rghLogo from "../../assets/logo/RGH logo-08.png"
import screens from "../screens"

export default function Header({setScreen}) {
    return (
        <nav>
            <img
                src={rghLogo}
                alt="Retro Game House"
                height="48px"
                className="clickable"
                onClick={() => setScreen(screens.HOME)}
            />
        </nav>
    )
}