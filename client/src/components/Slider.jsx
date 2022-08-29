import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { useState } from "react";
import SliderItems from "../data";
import { bigtablet, mobile, tablet } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "5%"};
  right: ${(props) => props.direction === "right" && "5%"};
  margin: auto;
  cursor: pointer;
  opacity: 0.4;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  ${bigtablet({ height: "50%" })}
  ${tablet({ height: "50%" })}
  ${mobile({ height: "30%" })}
`;

const ImgContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  height: 100%;
  align-items: center;
  justify-content: center;
  ${bigtablet({ height: "50%", width: "50%" })}
  ${tablet({ height: "60%", width: "60%" })}
  ${mobile({ height: "50%", width: "50%" })}
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const InfoContainer = styled.div`
  padding: 50px;
  ${bigtablet({ height: "50%", width: "50%" })}
  ${tablet({ height: "60%", width: "60%" })}
  ${mobile({ height: "50%", width: "50%", padding: "0" })}
`;

const Title = styled.h1`
  font-size: 70px;
  ${tablet({ fontSize: "48px" })}
  ${mobile({ fontSize: "20px" })}
`;

const Desc = styled.p`
  width: 80%;
  margin: 15px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${tablet({ fontSize: "16px", margin: "15px 0" })}
  ${mobile({ fontSize: "20px", margin: "10px 0" })}
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: black;
    color: white;
    transform: scale(1.01);
  }
  ${tablet({ fontSize: "14px", margin: "10px 15px" })}
  ${mobile({ fontSize: "8px", margin: "5px 10px", border: "1px solid black" })}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {SliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img}></Image>
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              {/* <Button disabled>SHOP NOW</Button> */}
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
