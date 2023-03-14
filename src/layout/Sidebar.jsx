import React from "react";
import styled from "styled-components";

function Sidebar() {
  return (
    <SidebarWrapper>
      <SidebarContainer>
        <NickNameBox>
          <SideTitle>안녕하세요. 다정님</SideTitle>
        </NickNameBox>
        <TodaySchedule>
          <SideTitle>오늘의 일정</SideTitle>
          <div>
            <div>
              <span></span>
              <span></span>
            </div>
            <div>
              <span></span>
              <span></span>
            </div>
          </div>
        </TodaySchedule>
        <section>
          <SideTitle>친구 목록</SideTitle>
          <div>
            <div>
              <img></img>
              <div>
                <span></span>
                <span></span>
              </div>
              <button>캘린더</button>
            </div>
          </div>
        </section>
      </SidebarContainer>
    </SidebarWrapper>
  );
}

export default Sidebar;

const SidebarWrapper = styled.div`
  background-color: ${(props) => props.theme.Bg.lightColor};
  min-width: 350px;
  height: 100%;
`;

const SidebarContainer = styled.div`
  ${(props) => props.theme.FlexCol};
  margin: 20px;
`;

const SideTitle = styled.span`
  font-size: ${(props) => props.theme.Fs.title};
`;
const NickNameBox = styled.div`
  ${(props) => props.theme.FlexCol};
`;

const TodaySchedule = styled.div`
  font-size: ${(props) => props.theme.Fs.title};
`;
