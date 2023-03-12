import React from 'react';
import styled from 'styled-components';

function Header() {
    return <HeaderWrapper>Header</HeaderWrapper>;
}

export default Header;

const HeaderWrapper = styled.div`
    ${(props) => props.theme.FlexCol}
`;
