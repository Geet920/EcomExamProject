import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@mui/icons-material";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-content: center;
`;

const Input = styled.input`
  border: none;
`;
const Left = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>INVITATIONS</Logo>
        </Left>
        <Center>
          <SearchContainer>
            <Input />
            <SearchIcon style={{ color: "gray", fontSize: 16 }}></SearchIcon>
          </SearchContainer>
        </Center>
        <Right>
          <MenuItem>Products</MenuItem>
          <MenuItem>Template</MenuItem>
          <MenuItem>Sign In</MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
