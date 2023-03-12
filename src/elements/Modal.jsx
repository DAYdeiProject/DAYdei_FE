import React from 'react';
import styled from 'styled-components';

function Modal() {
    return (
        <ModalWrapper>
            <ModalContainer></ModalContainer>
        </ModalWrapper>
    );
}

export default Modal;

const ModalWrapper = styled.div`
    display: ${(props) => props.isOpen};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.8);
`;

const ModalContainer = styled.div`
    z-index: 999;
    // 중앙배치
    // absolute : 상위요소 비례해서..
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 300px;
    height: 300px;
`;
