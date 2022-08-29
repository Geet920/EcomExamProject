import React from "react";
import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { mobile, tablet } from "../responsive";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { UserModel } from "./Model/UserModel";
import { MenuList } from "./NavigationLinks";
import MobileNavbar from "./MobileNavbar";

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #110f12;
  color: white;
  ${tablet({ height: "53px" })};
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  margin: auto;
  max-width: 1290px;
  width: 90vw;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-content: center;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Model = styled.div``;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;

const Logo = styled.h1`
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;
  ${tablet({ fontSize: "28px" })}
  ${mobile({ fontSize: "24px" })}
`;

const Center = styled.div`
  position: relative;
  display: none;
  align-items: center;
  justify-content: center;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
  ${tablet({ margin: "5px", fontSize: "16px" })}
`;
const MenuLinks = styled.h3`
  font-size: 16px;
  cursor: pointer;
  margin: 0 10px;
  &:before {
    content: "";
    position: absolute;
    right: 0;
    bottom: -30%;
    width: 0;
    height: 3px;
    background-color: coral;
    transition: width 0.2s ease-out;
  }
  &:hover:before {
    width: 100%;
    left: 0%;
    right: auto;
  }
  ${tablet({ margin: "5px", fontSize: "16px" })}
`;

const Navbar = () => {
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const wish = useSelector((state) => state.wish.wishlist);
  console.log(wish);
  const handleHover = (e) => {
    let hovered = Number(e.target.id);
    setHover(hovered);
  };
  const handleMouseOut = (e) => {
    setHover(0);
  };

  return (
    <Container>
      <Wrapper>
        <Left onClick={() => navigate("/")}>
          <Logo>GEET_</Logo>
        </Left>
        {MenuList.map((menu, index) => {
          return (
            <Center key={index}>
              <MenuLinks
                id={menu.id}
                onMouseEnter={handleHover}
                value={menu.title}
                key={index}
                onClick={() => {
                  navigate(`${menu.path}`);
                }}
              >
                {menu.title}
              </MenuLinks>
            </Center>
          );
        })}
        <Right>
          <MenuItem onClick={() => navigate("/categories")}>Products</MenuItem>
          {user !== null && (
            <MenuItem>
              <Badge badgeContent={wish?.length} color="warning">
                <FavoriteBorderOutlinedIcon
                  onClick={() => {
                    navigate("/wishlist");
                  }}
                />
              </Badge>
            </MenuItem>
          )}
          {user !== null ? (
            <MenuItem>
              <UserModel />
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </MenuItem>
          )}
          <MenuItem>
            <Badge badgeContent={cartQuantity} color="warning">
              <ShoppingCartOutlined
                onClick={() => {
                  navigate("/cart");
                }}
              />
            </Badge>
          </MenuItem>
        </Right>
        <MobileNavbar />
      </Wrapper>
      <Model onMouseLeave={handleMouseOut}>
        {hover === 3 }
      </Model>
    </Container>
  );
};

export default Navbar;
