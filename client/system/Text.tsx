import styled from "styled-components";
import { TypographyProps, TextColorProps, FontSizeProps, FontWeightProps, color, typography } from "styled-system";

interface Props extends TypographyProps, TextColorProps, FontSizeProps, FontWeightProps {
}
export const Text = styled.span<Props>({}, color, typography);

export default Text;
