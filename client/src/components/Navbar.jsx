import React from "react";
import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import { useState } from "react";
import { UserModel } from "./Model/UserModel";

const Container = styled.div`
  height: 60px;
  background-color: #d3ebcd;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
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
const Left = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  cursor: pointer;
  align-items: flex-end;
`;


const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const wish = useSelector((state) => state.wish.wishlist);
  console.log(wish)
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
        
        <Right>
          <MenuItem onClick={() => navigate("/categories")}>
            Products
          </MenuItem>
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
      </Wrapper>
    </Container>
  );
};

export default Navbar;
