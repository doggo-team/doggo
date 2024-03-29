import { NavLink, Link, useHistory, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { LoginInfoContext } from '../contexts/LoginInfoContextProvider';
import decode from 'jwt-decode';
import logo from '../img/dog-logo.gif';
const StyledPageHeader = styled.div`
  position: absolute;
  /* position: sticky; */
  max-width: 100vw;
  background: var(--main);
  width: 100%;
  z-index: 2;
  box-shadow: 0 10px 20px 50px var(--outline);

  /* margin: 0 0 auto 0 */
  /* background: gray; */
  /* display: flex; */
  /* height: 3.5rem; */
  /* ul {
    display: flex;
    list-style-type: none;
    li {
      margin: 0 1rem;
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
} */
  /* .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover */
  .navbar {
    width: calc(100vw - 1.7em);
    font-size: 1.1em;
    /* background: #545454; */

    a {
      /* color: var(--white); */
    }
    a.nav-link {
      color: var(--white);
      &:hover {
        color: var(--white);
      }
      .navbar-toggler-icon {
        color: var(--white);
      }
    }
    .link-login{
      color: var(--white);
    }
    .navbar-brand:hover {
      color: var(--white);
    }
    .container {
      /* display: flex; */
      a.navbar-brand {
        padding:0;
        display: flex;
        justify-content: center;
        align-items:center;
        margin-right: 3rem;
        p{
          margin-bottom:0.1em;
          font-size:1.1em;
          font-weight:600;
        }
        .nav-logo {
    /* width: 2rem; */
    height: 2.5rem;
    margin-right: 0.4rem;
  }
}
      }
    }
  }
  .selected {
    color: var(--white);
    font-weight: 600;
  }
  .selected.nav-link:focus {
    color: var(--white);
  }
  .dropdown-toggle.nav-link {
    color: var(--white);
  }
  .dropdown-item > a {
    //color: var(--main);
  color: var(--white);
  text-decoration: none;
  display: block;
  }

  .btn-missing {
    color: var(--white);
    margin: auto;
    padding: 0.5rem 0.8rem;
    background: var(--warning);
    /* color: var(--black); */
    border-radius: 0.2rem;
    font-weight: 600;
    /* font-size: 1.2rem; */
    cursor: pointer;
    border: none;
    text-decoration: none;
    &:hover{
      background: hsl(9.450381679389315, 49.778656126482204%, 47.6078431372549%);
    }
  }
  .link-login {
    color: #000;
    text-decoration: none;
    margin: auto;
    font-weight: 600;
  }
  .user-menu {
    display: flex;
    gap: 1.5rem;
  }
  .dropdown-menu{
    background: var(--main);
    *{
      color: var(--white);
      &:hover{
        background: var(--second);
      }
    }
    
  }

`;
function PageHeader() {
  const [user, setUser] = useContext(LoginInfoContext);

  const [expanded, setExpanded] = useState(false);
  const history = useHistory();
  const location = useLocation();
  function logout() {
    localStorage.clear();
    setUser(null);
    history.push('/');
  }

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken: any = decode(token);
      if (decodedToken?.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);

  return (
    <StyledPageHeader>
      <Navbar expand="lg" variant="dark" expanded={expanded}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img className="nav-logo" src={`${logo}`} alt="" />
            <p>Doggo</p>
          </Navbar.Brand>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                activeClassName="selected"
                to="/zaginiecia"
                onClick={() => setExpanded(false)}
              >
                Zaginięcia
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                activeClassName="selected"
                to="/adoptuj"
                onClick={() => setExpanded(false)}
              >
                Adoptuj
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                activeClassName="selected"
                to="/wesprzyj-schronisko"
                onClick={() => setExpanded(false)}
              >
                Wesprzyj schronisko
              </Nav.Link>
            </Nav>
            <div className="user-menu">
              <Link to={user ? '/zglaszanie-zaginiecia' : '/logowanie'} className="btn-missing">
                Zgłoś zaginięcie
              </Link>
              {user ? (
                <NavDropdown title={`${user && user.result.name}`} id="navbarScrollingDropdown">
                  

                  <NavDropdown.Item>
                    <Link to="/konto">Moje konto</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/moje-zaginiecia">Zgłoszone zaginięcia</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#action5"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Wyloguj
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/logowanie" className="link-login">
                  Zaloguj
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StyledPageHeader>
  );
}
export default PageHeader;
