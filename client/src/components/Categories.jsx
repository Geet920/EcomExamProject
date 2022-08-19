import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          {categories.map((item) => (
            <CategoryItem item={item} key={item.id} />
          ))}
        </Wrapper>
      </Container>
      <Footer />
    </div>
  );
};

export default Categories;
