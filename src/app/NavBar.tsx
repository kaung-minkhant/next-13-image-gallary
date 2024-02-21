"use client"

import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import { Container, Nav, NavLink, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "react-bootstrap"

export default function NavBar() {
  // const router = useRouter();
  const pathName = usePathname();
  // const searchParams = useParams();
  return (
    <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Container>
        <NavbarBrand as={Link} href="/">
          NextJS 13.4 Image Gallery
        </NavbarBrand>
        <NavbarToggle aria-controls="main-navbar" />
        <NavbarCollapse id="main-navbar">
          <Nav>
            <NavLink as={Link} href="/static" active={pathName==="/static"}>Static</NavLink>
          </Nav>
          <Nav>
            <NavLink as={Link} href="/dynamic" active={pathName==="/dynamic"}>Dynamic</NavLink>
          </Nav>
          <Nav>
            <NavLink as={Link} href="/isr" active={pathName==="/isr"}>ISR</NavLink>
          </Nav>
          <Nav>
            <NavLink as={Link} href="/search" active={pathName==="/search"}>Search</NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
}