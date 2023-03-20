import { React, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import FriendList from "./FriendList";
import SubscribeList from "./SubscribeList";
import { __getFriendsList, __getRequestedUsersList } from "../../../redux/modules/friendsSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import { RxTextAlignMiddle } from "react-icons/rx";
import ApproveRequestModal from "./ApproveRequestModal";
import useOutSideClick from "../../../hooks/useOutsideClick";
import Cookies from "js-cookie";

function FriendsListMain() {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  const statusCodeFriend = useSelector((state) => state.friends.statusCode);
  const statusCodeSubscribe = useSelector((state) => state.subscribe.statusCode);
  const acceptStatusCode = useSelector((state) => state.friends.acceptStatusCode);
  const RequestedUsersList = useSelector((state) => state.friends.RequestedUsersList);

  // 친구요청 수락 모달 열고닫기 상태관리

  const [isApproveRequestModalOpen, setIsApproveRequestModalOpen] = useState(false);

  // 친구추가 아이콘 클릭하는 순간 친구신청한 유저 불러오는 GET요청 함수 dispatch

  const approveRequestModalHandler = () => {
    setIsApproveRequestModalOpen(true);
    dispatch(__getRequestedUsersList({ token }));
  };

  const handleCategoryModalClose = () => {
    setIsApproveRequestModalOpen(false);
  };

  const ApproveRequestModalRef = useRef(null);
  useOutSideClick(ApproveRequestModalRef, handleCategoryModalClose);

  useEffect(() => {
    dispatch(__getRequestedUsersList({ token }));
  }, [acceptStatusCode]);

  // 버튼을 누를 때 마다 친구/구독 리스트를 새로 가져오도록 조치함.

  useEffect(() => {
    dispatch(__getFriendsList());
  }, [dispatch, statusCodeFriend, statusCodeSubscribe]);
  const { FriendsList, isLoading } = useSelector((state) => state.friends);

  if (isLoading) {
    return <LoadingWrapper>로딩중...</LoadingWrapper>;
  }

  const friendsList = FriendsList?.friendResponseList || [];
  const subscribeList = FriendsList?.userSubscribeResponseList || [];

  return (
    <>
      <CalendarWrapper>
        <WholeAreaWrapper>
          <ListFrameBig>
            <ListFrame>
              <ContentWrapper>
                <TopText>
                  <TopLeft>친구 {friendsList.length}</TopLeft>
                  <TopRight>
                    <SearchIcon />
                    <PersonAddIcon onClick={approveRequestModalHandler} />
                    {isApproveRequestModalOpen && (
                      <ApproveRequestModal
                        ApproveRequestModalRef={ApproveRequestModalRef}
                        RequestedUsersList={RequestedUsersList}
                        setIsApproveRequestModalOpen={setIsApproveRequestModalOpen}
                      />
                    )}
                    <AlignIcon />
                  </TopRight>
                </TopText>
                <ListWrap>
                  <FriendList friendsList={friendsList} />
                </ListWrap>
              </ContentWrapper>
            </ListFrame>
          </ListFrameBig>
          <ListFrameBig>
            <ListFrame>
              <ContentWrapper>
                <TopText>
                  <TopLeft>구독 {subscribeList.length}</TopLeft>
                </TopText>
                <ListWrap>
                  <SubscribeList subscribeList={subscribeList} />
                </ListWrap>
              </ContentWrapper>
            </ListFrame>
          </ListFrameBig>
        </WholeAreaWrapper>
      </CalendarWrapper>
    </>
  );
}

const LoadingWrapper = styled.div`
  width: 1570px;
  height: 100%;
`;

const CalendarWrapper = styled.div`
  width: 1570px;
  height: 100%;
`;
export const WholeAreaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  /* position: absolute; */
  width: 1570px;
  height: 980px;
  left: 350px;
  top: 100px;
  /* background-color: skyblue; */
`;
const ListFrameBig = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 40px 71px;
  gap: 16px;
  width: 783px;
  height: 980px;
  /* background-color: pink; */
`;
const ListFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 698px;
  height: 835px;
  /* background-color: gray; */
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 678px;
  height: 835px;
  /* background-color: ${(props) => props.theme.Bg.lightColor}; */
`;
const TopText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 0px 0px;
  gap: 467px;
  width: 678px;
  height: 44px;
  /* background-color: pink; */
`;

const TopLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;

  /* width: 85px; */
  height: 44px;
  /* background-color: skyblue; */

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;

const TopRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 16px;

  width: 92px;
  height: 20px;
  /* background-color: pink; */
  :hover {
    cursor: pointer;
  }
`;

const SearchIcon = styled(AiOutlineSearch)`
  color: gray;
  width: 20px;
  height: 20px;
`;

const PersonAddIcon = styled(BsPersonAdd)`
  color: gray;
  width: 20px;
  height: 20px;
`;

const AlignIcon = styled(RxTextAlignMiddle)`
  color: gray;
  width: 20px;
  height: 20px;
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 678px;
  height: 770px;
  background: #fbfbfb;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default FriendsListMain;
