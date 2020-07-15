import styled from "styled-components";
import Box from "./Box";

const Card = styled(Box)``;
Card.defaultProps = {
  padding: 4,
  borderRadius: "3px",
  boxShadow: "0px 1px 2px 0px rgba(90, 90, 90, 0.4)"
};

export default Card;
