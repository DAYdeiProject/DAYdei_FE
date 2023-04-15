import React from "react";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalBox({ children, ...props }) {
  // 필요한 정보
  // isOpen : 모달 open state
  // width : 가로 길이
  // height : 세로 길이
  const outside = useRef();

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "100%", transition: { duration: 0.2 } },
    exit: { opacity: 0, y: "100%", transition: { duration: 0.2 } }, // 모달 닫힐 때 애니메이션 추가
  };

  // 모달창 열렸을때 스크롤 막기
  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.isOpen]);

  return (
    <AnimatePresence>
      {props.isOpen && (
        <CalendarPostModalWrapper variants={backdropVariants} initial="hidden" animate="visible" exit="hidden">
          <PostModalContainer ref={outside} variants={modalVariants} initial="hidden" animate={"visible"} exit={"exit"}>
            <PostContent isWidth={props.width} isHeight={props.height}>
              {children}
            </PostContent>
          </PostModalContainer>
        </CalendarPostModalWrapper>
      )}
    </AnimatePresence>
  );
}

const CalendarPostModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
  //background: rgba(0, 0, 0, 0.3);
`;

const PostModalContainer = styled(motion.div)`
  ${(props) => props.theme.BoxCustom};
  z-index: 900;
  background-color: white;
  border-radius: 1.25rem;
`;

const PostContent = styled.div`
  max-width: ${(props) => props.isWidth && props.isWidth};
  height: ${(props) => props.isHeight && props.isHeight};
  cursor: auto;
`;
