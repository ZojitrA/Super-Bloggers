import { useState } from 'react';
import {APP_NAME} from '../config.js'
import Link from 'next/link'
import "./Header.scss"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';


class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this)
    }
  

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        })
        
    }

  render() {
      
    return(
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/"><a className='x'>X</a></Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto navbar">
            <NavItem>
            <Link href="/signup"><a className="NavLink">Signup</a></Link>
            </NavItem>
            <NavItem>
              <Link href="/signin"><a className="NavLink">Signin</a></Link>
            </NavItem>
          </Nav>
          <NavbarText>{APP_NAME}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
    );
}
}

export default Header;