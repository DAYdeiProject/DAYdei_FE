import React from 'react';
import styled from 'styled-components';
import { FlexRow } from '../shared/style/Theme';
import { Link } from 'react-router-dom';

function IntroPage() {
  return (
    <IntroWrapper>
      <button>
        <Link to="/login">로그인으로 이동</Link>
      </button>
    </IntroWrapper>
  );
}

const IntroWrapper = styled.div`
  ${FlexRow}
`;

export default IntroPage;
