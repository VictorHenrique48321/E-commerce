import React from 'react'
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import "./header.css"

const Header = () => {

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    height: 50,
    boxShadow: "0 0 5px 0 black",
    paddingLeft: {"xs": "0", "md": "5rem"},
    justifyContent: {"xs": "center", "md": "start"}
  }

  const navLinkStyle = {
    height: 25,
    textDecoration: "none",
    margin: "0 15px"
  }

  return (
    <Box sx={headerStyle}>
      <NavLink to="/" style={navLinkStyle} className={({isActive}) => isActive ? "currentLink" : "deactivatedLink"} reloadDocument>
          Store
      </NavLink>
      <NavLink to="/Cart" style={navLinkStyle} className={({isActive}) => isActive ? "currentLink" : "deactivatedLink"} >
          Cart
      </NavLink>
    </Box>
  )
}

export default Header