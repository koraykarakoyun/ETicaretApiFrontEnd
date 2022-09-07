import * as React from "react";
import { Link } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import ProductAdd from "./Pages/Products/ProductAddPage";
import { color } from "@mui/system";

const Navbar = (props) => {

  const nav_height = {
    "height": "100%"
  }

  return (
    <SideNav style={nav_height}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="Home">
        <NavItem eventKey="Home">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">Dashboard</Link>
          </NavText>
        </NavItem>

        <NavItem eventKey="products">
          <NavIcon>
            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            <Link style={{ textDecoration: "none", color: "white" }} to="/products">Products</Link>
          </NavText>
          <NavItem eventKey="AddProduct">
            <NavText>
              <Link style={{ textDecoration: "none", color: "white" }} to="/addproduct">Add Product</Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="UpdateProduct">
            <NavText>
              <Link style={{ textDecoration: "none", color: "white" }} to="/updateproduct">Update Product</Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="DeleteProduct">
            <NavText>
              <Link style={{ textDecoration: "none", color: "white" }} to="/deleteproduct">Delete Product</Link>
            </NavText>
          </NavItem>
        </NavItem>

        <NavItem eventKey="orders">
          <NavIcon>
            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            <Link style={{ textDecoration: "none", color: "white" }} to="/orders">Orders</Link>
          </NavText>
          <NavItem eventKey="AddOrder">
            <NavText>
              <Link style={{ textDecoration: "none", color: "white" }} to="/addorder">Add Orders</Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="UpdateOrder">
            <NavText>
              <Link style={{ textDecoration: "none", color: "white" }} to="/updateorder">Update Orders</Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="charts/DeleteOrder">
            <NavText>
              <Link style={{ textDecoration: "none", color: "white" }} to="/deleteorder">Delete Orders</Link>
            </NavText>
          </NavItem>
        </NavItem>
      </SideNav.Nav>
    </SideNav >
  )
}

export default Navbar