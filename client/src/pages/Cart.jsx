import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Processing from "../components/Model/Processing";
import Notification from "../components/Model/NotificationModel";
import { mobile, tablet, bigtablet } from "../responsive";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatAmount } from "../utility/formatAmount";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import StripeCheckout from "react-stripe-checkout";
import {
  addProductQuantity,
  subtractProductQuantity,
  removeProduct,
} from "../redux/cartRedux";
import { useDispatch } from "react-redux";

// const KEY =
//   "pk_test_51KG22qHIMcDpTdIvD1sKwUhCjIX3yqJjioiVXJlShoT6YpogyuyqE0hFCaoec1ebVcyqbIQQsLRAfuKNUueOYRgM007KHDRXp1";

const Container = styled.div``;

const Wrapper = styled.div`
  margin: auto;
  max-width: 1295px;
  width: 90vw;
  padding: 55px 0;
`;
const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  padding: 10px 0;
  min-width: 240px;
  ${tablet({ flex: "3" })}
  ${mobile({ padding: "0", flexWrap: "wrap", minWidth: "120px" })}
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px 0;
  ${tablet({ flex: "0.75" })}
  ${mobile({ flex: "1", padding: "0" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  padding: 10px 0;
  text-align: right;
  align-items: center;
  justify-content: flex-end;
  ${tablet({ flex: "0.75" })}
  ${mobile({ padding: "0" })}
`;

const Title = styled.h1`
  font-weight: 300;
  ${mobile({ fontSize: "24px" })}
`;

const TextContainer = styled.div`
  justify-content: center;
  margin: auto;
  align-items: center;
  display: flex;
`;
const Text = styled.span`
  text-align: center;
  ${mobile({ fontSize: "0.8rem" })};
`;
const Action = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  align-items: center;
  color: grey;
  font-size: 0.9rem;
  &:hover {
    color: black;
  }
  ${mobile({ paddingTop: "20px" })}
`;
const CartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column", paddingTop: "20px" })}
`;

const ProductContainer = styled.div`
  flex: 2.5;
  ${bigtablet({ flex: "2" })}
  ${tablet({ flex: "2" })}
`;

const Item = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  ${mobile({ paddingTop: "10px" })};
`;
const Info = styled.div`
  flex: 1;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "0" })}
`;
const Details = styled.div`
  margin: auto;
  display: flex;
  flex: 1;
`;
const ProductDetails = styled.div`
  min-width: 240px;
  padding: 0 10px;
  flex: 1;
  ${mobile({ minWidth: "120px" })}
`;
const ProductImage = styled.div`
  width: 140px;
  height: 110px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  background-color: #efefef;
  margin: auto;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  ${bigtablet({ width: "100px", flex: "1" })}
  ${mobile({ width: "70px", height: "100px" })}
`;

const Image = styled.img`
  width: 80%;
  margin: auto;
`;
const ProductName = styled.h3`
  font-size: 1rem;
  ${mobile({ fontSize: "0.85rem" })}
`;
const ProductInfo = styled.p`
  font-size: 0.85rem;
  margin: 2px 0;
  color: gray;
  ${mobile({ fontSize: "0.8rem" })}
`;

const ProductColor = styled.div`
  flex: 1;
`;
const ColorOutline = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  border: 1px solid black;
  ${mobile({
    width: "15px",
    height: "15px",
  })}
`;
const BoxColor = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  ${mobile({
    width: "13px",
    height: "13px",
  })}
`;
const RemoveContainer = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: 5px;
`;
const Remove = styled.p`
  color: grey;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Quantity = styled.span`
  width: 40px;
  height: 30px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({
    fontSize: "0.8rem",
    width: "30px",
    height: "25px",
    borderRadius: "8px",
    marginLeft: "3px",
  })}
`;
const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  margin: 0 5px;
  background-color: white;
  color: ${(prop) => prop.color};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: scale(1.2);
  ${mobile({
    transform: "scale(0.75)",
    margin: "0",
    width: "20px",
  })}
`;
const ProductPrice = styled.p`
  align-items: center;
  justify-content: center;
  font-weight: 200;
  flex: 1;
  font-size: 1rem;
  ${mobile({ fontSize: "0.9rem" })}
`;

const SummaryContainer = styled.div`
  flex: 1;
  padding-left: 40px;
  ${tablet({ padding: "0" })}
  ${mobile({ padding: "0" })}
`;
const Summary = styled.div``;

const Subtitle = styled.h2`
  font-weight: 200;
  padding: 10px 0;
  font-size: 20px;
  ${mobile({ fontSize: "18px", padding: "5px 0" })}
`;

const SummaryItem = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.font === "total" && "500"};
  font-size: ${(props) => props.font === "total" && "24px"};
  ${bigtablet({
    fontSize: (props) => (props.font === "total" ? "20px" : "16px"),
  })}
  ${tablet({ marginTop: "15px 0" })}
  ${mobile({ fontSize: (props) => (props.font === "total" ? "18px" : "14px") })}
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;
const CheckOut = styled.div`
  display: flex;
  margin-top: 20px;
  padding-left: 40px;
  justify-content: center;
  align-items: center;
  ${tablet({ padding: "0" })}
  ${mobile({ padding: "0" })}
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  text-align: center;
  font-size: 0.8rem;
  width: 120px;
  background-color: #110f12;
  color: white;
  cursor: pointer;
  padding: 10px;
  margin: auto;
  ${mobile({ margin: "10px" })}
`;
const Copy = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #c0c0c0;
  &:hover {
    color: #505050;
  }
`;
const Hr = styled.hr`
  background-color: #eee;
  margin-top: 5px;
  border: none;
  height: ${(props) => props.height};
  ${mobile({ margin: "10px 0" })}
`;
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [processing, setProcessing] = useState(false);
  // const [stripeToken, setStripeToken] = useState(null);
  const [copy, setCopy] = useState(false);
  const [remove, setRemove] = useState(false);
  const handleQuantity = (type, product) => {
    const price = product.price;
    if (type === "Add" && product.quantity < 10) {
      dispatch(addProductQuantity({ product, price }));
    } else if (type === "Subtract" && product.quantity > 1) {
      dispatch(subtractProductQuantity({ product, price }));
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText("4242 4242 4242 4242");
    setCopy(true);
  };
  const handleRemove = (product) => {
    setRemove(true);
    const price = product.price;
    const quantity = product.quantity;
    dispatch(removeProduct({ product, price, quantity }));
  };
  // const onToken = (token) => {
  //   setStripeToken(token);
  // };
  // useEffect(() => {
  //   const makeRequest = async () => {
  //     setProcessing(true);
  //     try {
  //       const res = await userRequest.post("checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: cart.total * 100,
  //       });
  //       const data = res.data;
  //       const cartState = { data, cart };
  //       navigate("/success", { state: cartState });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, navigate, cart.total, cart, dispatch]);
  const shipping = cart.total > 4999 ? 0 : 50;
  const totalAmount = cart.total + shipping;
  return (
    <Container>
      <Notification open={copy} setOpen={setCopy} type="copy" />
      <Notification open={remove} setOpen={setRemove} type="remove" />
      <Processing display={processing ? "flex" : "none"} />

      <Navbar />
      <Wrapper>
        <Title>Shopping cart</Title>
        <TextContainer>
          <Left>
            <Action
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
              <Text style={{ marginLeft: "5px" }}>back</Text>
            </Action>
          </Left>
        </TextContainer>
        <CartContainer>
          <ProductContainer>
            <Subtitle>Your choices</Subtitle>
            <TextContainer>
              <Left>
                <Text>Product</Text>
              </Left>
              <Center>
                <Text>Qty.</Text>
              </Center>
              <Right>
                <Text>Subtotal</Text>
              </Right>
            </TextContainer>
            <Hr height={"3px"} />
            {cart.quantity === 0 && (
              <TextContainer style={{ margin: "50px auto" }}>
                <Text>Your cart is empty</Text>
              </TextContainer>
            )}
            {cart.products.map((product) => (
              <Item key={product._id} id={product._id}>
                <Info>
                  <Product>
                    <Left>
                      <Details>
                        <ProductImage
                          onClick={() => {
                            navigate(`/product/${product._id}`);
                          }}
                        >
                          <Image src={product.img} />
                        </ProductImage>
                        <ProductDetails>
                          <ProductName>{product.name}</ProductName>

                          <RemoveContainer>
                            <Remove onClick={() => handleRemove(product)}>
                              Remove
                            </Remove>
                          </RemoveContainer>
                        </ProductDetails>
                      </Details>
                    </Left>
                    <Center>
                      <QuantityWrapper>
                        <QuantityButton
                          color={
                            product.quantity === 1 ? "lightgrey" : "#110f12"
                          }
                        >
                          <ArrowCircleLeftRoundedIcon
                            onClick={() => handleQuantity("Subtract", product)}
                          />
                        </QuantityButton>
                        <Quantity>{product.quantity}</Quantity>
                        <QuantityButton
                          color={
                            product.quantity === 10 ? "lightgrey" : "#110f12"
                          }
                        >
                          <ArrowCircleRightRoundedIcon
                            onClick={() => handleQuantity("Add", product)}
                          />
                        </QuantityButton>
                      </QuantityWrapper>
                    </Center>
                    <Right>
                      <ProductPrice>
                        {formatAmount(product.quantity * product.price)}
                      </ProductPrice>
                    </Right>
                  </Product>
                </Info>
              </Item>
            ))}
          </ProductContainer>
          <Hr height={"2px"} />
          <SummaryContainer>
            <Summary>
              <Subtitle>Order Summary</Subtitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>
                  {cart.quantity === 0 ? "--" : formatAmount(cart.total)}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>
                  {cart.quantity === 0
                    ? "--"
                    : cart.total > 4999
                    ? "free"
                    : formatAmount(50)}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>
                  {cart.quantity === 0
                    ? "--"
                    : cart.total > 4999
                    ? "--"
                    : formatAmount(0)}
                </SummaryItemPrice>
              </SummaryItem>
              <Hr height={"3px"} />
              <SummaryItem font="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>
                  {cart.quantity !== 0 && cart.total < 4999
                    ? formatAmount(totalAmount)
                    : cart.quantity === 0
                    ? formatAmount(0)
                    : formatAmount(totalAmount)}
                </SummaryItemPrice>
              </SummaryItem>
            </Summary>
            <CheckOut>
              {/* <StripeCheckout
                name="GEET_"
                image="https://i.ibb.co/7gnqD5j/aylo.png"
                billingAddress
                shippingAddress
                description={`Your total is ${formatAmount(totalAmount)}`}
                amount={totalAmount * 100}
                token={onToken}
                stripeKey={KEY}
              >
            </StripeCheckout> */}
              <Button>Checkout</Button>
            </CheckOut>
            <TextContainer style={{ paddingTop: "20px" }}>
              <Text
                style={{
                  fontSize: "0.8rem",
                  color: "#C0C0C0",
                }}
              >
                Please use{" "}
                <Copy onClick={() => handleCopy()}>4242 4242 4242 4242</Copy> as
                your card number with any CVC and future date
              </Text>
            </TextContainer>
          </SummaryContainer>
        </CartContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
