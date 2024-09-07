import { Outlet, Link } from "react-router-dom";
import rghLogo from "../../assets/logo/RGH logo-08.png"

const Layout = () => {
  return (
    <>
      <Link to="/">
        <nav>
          <img src={rghLogo} alt="Retro Game House" height="48px"/>
        </nav>
      </Link>
      <main>
        <Outlet />
      </main>
    </>
  )
};

export default Layout;