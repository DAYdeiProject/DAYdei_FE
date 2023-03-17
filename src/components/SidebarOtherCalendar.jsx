import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function SidebarOtherCalendar() {
  // /api/home/profile/{userId} == get

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch();
  }, []);
  return (
    <>
      <ProfileWrapper>
        <img src="" />
      </ProfileWrapper>
      <span></span>
      <span></span>
      <textarea></textarea>
      <div>
        <button></button>
        <button></button>
      </div>
    </>
  );
}

const ProfileWrapper = styled.div`
  background-color: #e08868;
  width: 250px;
  height: 250px;
  border-radius: 50%;
`;
