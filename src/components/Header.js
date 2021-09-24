import React from "react";
import styled from "styled-components";
import { LocationMarkerIcon } from "@heroicons/react/solid";
const Header = () => {
  return (
    <div>
      <Nav>
        <LocationMarkerIcon style={{ height: "3rem", color: "#2E8BC0" }} />
        <Title>Get Locations</Title>
      </Nav>
    </div>
  );
};

export default Header;

const Nav = styled.nav`
  height: 70px;
  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;

const Title = styled.span`
  color: #b1d4e0;
  font-size: xx-large;
  font-weight: 600;
`;
