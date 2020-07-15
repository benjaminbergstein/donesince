import styled from "styled-components";
import {
  space,
  layout,
  position,
  flexbox,
  background,
  border,
  shadow,
  color,
  grid,
  SpaceProps,
  BorderRadiusProps,
  BoxShadowProps,
  GridProps,
} from "styled-system";

export const Box = styled.div<SpaceProps & BorderRadiusProps & BoxShadowProps & GridProps>(
  {},
  space,
  layout,
  position,
  flexbox,
  background,
  border,
  shadow,
  grid,
  color
)

export default Box;
