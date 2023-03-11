import { css } from "styled-components";

export const FlexAttribute = (direction, align, justify) => css`
  display: flex;
  flex-direction: ${direction};
  align-items: ${align};
  justify-content: ${justify};
`;
