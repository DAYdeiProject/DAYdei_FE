import React from 'react';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Main from '../layout/Main';
import Sidebar from '../layout/Sidebar';
import styled from 'styled-components';


function HomePage() {
    return (
        <>
            <Header />
            <MainWrapper>
                <Sidebar />
                <Main />
            </MainWrapper>
            <Footer />
        </>
    );
}

export default HomePage;

const MainWrapper = styled.div`
    ${(props) => props.theme.FlexRow}
    width: 100%;
`;
