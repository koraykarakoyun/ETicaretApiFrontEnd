import * as React from "react";
import { Link } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const Navbar = () => {
  return (
    <SideNav>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="Products">

        <NavItem eventKey="Products">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            <Link to="/products">Products</Link>
          </NavText>
        </NavItem>

        <NavItem eventKey="Orders">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            <Link to="/orders">Orders</Link>
          </NavText>
        </NavItem>

        <NavItem eventKey="">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            <Link to="/customers">Customers</Link>
          </NavText>
        </NavItem>

      </SideNav.Nav>
    </SideNav>
  )
}

export default Navbar