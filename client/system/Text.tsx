import styled from "styled-components";
import { TextColorProps, FontSizeProps, FontWeightProps, color, typography } from "styled-system";

interface Props extends TextColorProps, FontSizeProps, FontWeightProps {
}
export const Text = styled.span<Props>({}, color, typography);

export default Text;
