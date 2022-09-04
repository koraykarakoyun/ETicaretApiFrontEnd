import * as React from "react";
import { Link } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import ProductAdd from "./Pages/ProductAdd";

const Navbar = (props) => {
  return (
    <SideNav>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="Home">
        <NavItem eventKey="Home">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            <Link to="/">Home</Link>
          </NavText>
        </NavItem>

        <NavItem eventKey="products">
          <NavIcon>
            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            <Link to="/products">Products</Link>
          </NavText>
          <NavItem eventKey="AddProduct">
            <NavText>
            <Link to="/productadd">Add Product</Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="UpdateProduct">
            <NavText>
              Update Product
            </NavText>
          </NavItem>
          <NavItem eventKey="DeleteProduct">
            <NavText>
              Delete Product
            </NavText>
          </NavItem>
        </NavItem>

        <NavItem eventKey="orders">
          <NavIcon>
            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            Orders
          </NavText>
          <NavItem eventKey="charts/linechart">
            <NavText>
              Add Order
            </NavText>
          </NavItem>
          <NavItem eventKey="charts/linechart">
            <NavText>
              Update Order
            </NavText>
          </NavItem>
          <NavItem eventKey="charts/barchart">
            <NavText>
              DeleteOrder
            </NavText>
          </NavItem>
        </NavItem>

      </SideNav.Nav>
    </SideNav>
  )
}

export default Navbar