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
  BackgroundColorProps,
  BordersProps,
  LayoutProps,
  FlexboxProps,
  SpaceProps,
  BorderRadiusProps,
  BoxShadowProps,
  GridProps,
  PositionProps,
} from "styled-system";

interface BoxProps extends PositionProps, BackgroundColorProps, BordersProps, FlexboxProps, SpaceProps, BorderRadiusProps, BoxShadowProps, GridProps, LayoutProps {}

export const Box = styled.div<BoxProps>(
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
