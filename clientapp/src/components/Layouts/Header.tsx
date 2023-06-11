import React from 'react'
import { Link } from 'react-router-dom'
import Register from '../Auth/Register'
import Login from '../Auth/Login'

function Header() {

    let username = sessionStorage.getItem('USERNAME');
    let profilepic = sessionStorage.getItem('USERPIC');

    const logout = () => {
        sessionStorage.removeItem('USERID');
        sessionStorage.removeItem('USERNAME');
        sessionStorage.removeItem('TOKEN');
        sessionStorage.removeItem('USERPIC');
        sessionStorage.clear();
        window.location.href="/";
    }

  return (
    <>
    <Register/>
    <Login/>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <a className="navbar-brand" href="/"><img className="logo" src="http://localhost:5073/resources/images/logo.png" alt="QATAR FOUNDATION" /></a>
        <button className="navbar-toggler" type="button"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasWithBothOptions">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/aboutus">About Us</Link>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Products
                </a>
            <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/list">Product List</Link></li>
                <li><Link className="dropdown-item" to="/catalogs">Product Catalogs</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Link className="dropdown-item" to="/search">Product Search</Link></li>
            </ul>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/locateus">Locate Us</Link>
            </li>

        </ul>

        <ul className="navbar-nav mr-auto">

            { username === null ?
                <>            
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/#"  data-bs-toggle="modal" data-bs-target="#staticLogin">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/#"  data-bs-toggle="modal" data-bs-target="#staticRegister">Register</a>
                </li>
                </>
            :
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {
                    profilepic != null ?
                        <img src={profilepic} id="userpic1" className="user" alt='' />
                    : null
                }
                {username}
                </a>
                <ul className="dropdown-menu">
                <li><a onClick={logout} className="dropdown-item" href="/#">Logout</a></li>
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Link className="dropdown-item" to="/#">Messager</Link></li>
                </ul>
            </li>            

            }

        </ul>

        </div>
    </div>
    </nav>

    {/* OFFCANVAS MENU */}
    <div className="offcanvas offcanvas-end" data-bs-scroll="true" id="offcanvasMenu" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div className="offcanvas-header bg-primary">
        <h5 className="offcanvas-title text-white" id="offcanvasWithBothOptionsLabel">Drawer Menu</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">

        <ul className="nav flex-column">
          <li className="nav-item" data-bs-dismiss="offcanvas">
            <Link className="nav-link active" to="/aboutus">About Us</Link> 
          </li>
          <li className="nav-item"><hr/></li>
          <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </a>
                <ul className="dropdown-menu">
                  <li data-bs-dismiss="offcanvas">
                    <Link className="dropdown-item" to="/list">Product List</Link>                
                </li>
                  <li data-bs-dismiss="offcanvas">
                    <Link className="dropdown-item" to="/catalogs">Catalogs</Link>                
                </li>
                  <li><hr className="dropdown-divider"/></li>
                  <li data-bs-dismiss="offcanvas">
                    <Link className="dropdown-item" to="/search">Search Product</Link>                
                </li>
                </ul>
              </li>
              <li className="nav-item"><hr/></li>

              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link active" to="/locateus">Locate Us</Link>                
              </li>
              <li className="nav-item"><hr/></li>

            </ul>
            { username === null ?

              <ul className="nav flex-column">
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <a className="nav-link active" href="/#" data-bs-toggle="modal" data-bs-target="#staticLogin">Login</a>
                </li>
                <li className="nav-item"><hr/></li>

                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <a className="nav-link active" href="/#" data-bs-toggle="modal" data-bs-target="#staticRegister">Register</a>
                </li>            
              </ul>
            :

            <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle active" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {
                        profilepic != null ?
                            <img src={profilepic} id="userpic1" className="user" alt='' />
                        : null
                    }
                    {username}
                    </a>
                    <ul className="dropdown-menu">
                      <li data-bs-dismiss="offcanvas">
                        <a onClick={logout} className="dropdown-item" href="/#">LogOut</a>
                      </li>
                      <li className="nav-item"><hr/></li>
                      <li data-bs-dismiss="offcanvas">
                        <a className="dropdown-item" href="/profile">Profile</a>                
                      </li>
                      <li><hr className="dropdown-divider"/></li>
                      <li data-bs-dismiss="offcanvas">
                        <a className="dropdown-item" href="/#">Messenger</a>                
                      </li>
                    </ul>
                  </li>              
        </ul>        
        }


      </div>
    </div>


    </>
  )
}

export default Header