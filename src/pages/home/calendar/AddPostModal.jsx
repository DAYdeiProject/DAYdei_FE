import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CalendarPostModal from "./CalendarPostModal";

function AddPostModal({ isOpen, closeModal }) {
  const time = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const [isAllDay, setIsAllDay] = useState(getValues("allDay"));
  //console.log(isAllDay);

  const isAllDayChange = () => {
    setIsAllDay(!isAllDay);
  };

  // 저장 버튼 눌렀을때
  const addPost = (data) => {
    console.log("data", data);
  };

  return (
    <CalendarPostModal isOpen={isOpen} isCancle={"취소"} closeModal={closeModal}>
      <form onSubmit={handleSubmit(addPost)}>
        <section>
          <div>
            <span>일정 추가</span>
          </div>
          <div>
            <select {...register("range")}>
              <option value="all">전체공개</option>
              <option value="friend">친구공개</option>
              <option value="only">나만보기</option>
            </select>
          </div>
        </section>
        <section>
          <div>
            <label>제목</label>
            <input {...register("title")} />
          </div>
          <div>
            <label>일시</label>
            <div>
              <input type="date" {...register("startDate")}></input>
              <select {...register("startTime")} disabled={isAllDay}>
                {time.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <span>~</span>
            <div>
              <input type="date" {...register("endDate")}></input>
              <select {...register("endTime")} disabled={isAllDay}>
                {time.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <input type="checkbox" {...register("allDay")} onChange={isAllDayChange}></input>
          </div>
          <div>
            <label>친구태그</label>
            <input type="text" {...register("search")} />
          </div>
          <div>
            <label>색상선택</label>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <label>장소</label>
            <input type="text" {...register("place")} />
          </div>
          <div>
            <label>상세</label>
            <textarea {...register("intro")} />
          </div>
        </section>
        <section>
          <div>
            <button type="button">취소</button>
            <button>저장</button>
          </div>
        </section>
      </form>
    </CalendarPostModal>
  );
}

export default AddPostModal;
