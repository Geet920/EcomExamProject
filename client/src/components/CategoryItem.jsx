import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { bigtablet, mobile, tablet } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  height: 550px;
  display: flex;
  align-items: center;
  position: relative;
  ${bigtablet({ height: "500px", minWidth: "330px" })}
  ${tablet({ height: "400px", minWidth: "300px" })}
  ${mobile({ margin: "5px 0", height: "250px", minWidth: "220px" })}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  color: whitesmoke;
  margin-bottom: 20px;
`;
const Button = styled.button`
 padding: 10px 15px;
  cursor: pointer;
  font-weight: 600;
  background-color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    opacity: 0.9;
    color: black;
    transform: scale(1.01);
  }
`;


const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
