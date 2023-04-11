import format from "date-fns/format";

export default function ColorFromDB(data) {
  switch (data) {
    case "RED":
      return "#FFEBF5";
    case "YELLOW":
      return "#FDF2DE";
    case "GREEN":
      return "#EEF9F7";
    case "LIGHTBLUE":
      return "#DFF3FE";
    case "BLUE":
      return "#B8EEFF";
    case "PURPLE":
      return "#EFECFF";
    case "LIGHTGRAY":
      return "#e6ecd8ec";
    case "PINK":
      return "#edd1f0";
    default:
      return "rgb(238 238 238)";
  }
}

export function ColorDeepFromDB(data) {
  switch (data) {
    case "RED":
      return "#F6A89E";
    case "YELLOW":
      return "#FBDF96";
    case "GREEN":
      return "#CFF4F1";
    case "LIGHTBLUE":
      return "#A7EAFF";
    case "BLUE":
      return "#0EAFE1";
    case "PURPLE":
      return "#E2CCFB";
    case "LIGHTGRAY":
      return "#a8b393";
    case "PINK":
      return "#edd1f0";
    default:
      return "#adadad";
  }
}

export function ColorToDB(data) {
  switch (data) {
    case "#F6A89E":
      return "RED";
    case "#FBDF96":
      return "YELLOW";
    case "#CFF4F1":
      return "GREEN";
    case "#A7EAFF":
      return "LIGHTBLUE";
    case "#0EAFE1":
      return "BLUE";
    case "#E2CCFB":
      return "PURPLE";
    default:
      return "LIGHTGRAY";
  }
}

export function ColorList() {
  const colorList = ["#F6A89E", "#FBDF96", "#CFF4F1", "#A7EAFF", "#0EAFE1", "#E2CCFB", "#c5d1af"];
  return colorList;
}
export function TimeList() {
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
  ];
  return time;
}

export function DayCheck(day) {
  switch (day) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      return "일";
  }
}

export function DayAmPm(time) {
  let result = "";
  if (time.substr(0, 2) < 13) {
    result = `오전 ${time.substr(0, 5)}`;
  } else {
    result = `오후 ${time.substr(0, 5)}`;
  }
  return result;
}

export function CategoryText(data) {
  switch (data) {
    case "SPORTS":
      return "스포츠";
    case "EDUCATION":
      return "교육";
    case "ENTERTAINMENT":
      return "연예";
    case "OTT":
      return "OTT";
    case "GAME":
      return "게임";
    default:
      return "스포츠";
  }
}

export function TimeCheck(data) {
  const today = new Date();
  const timeValue = new Date(data);

  let result = "";
  const time = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (time < 1) result = "방금 전";
  if (time < 60) result = `${time}분 전`;

  const hour = Math.floor(time / 60);
  if (hour > 0 && hour < 24) result = `${hour}시간 전`;

  const day = Math.floor(time / 60 / 24);
  if (day > 0 && day < 365) result = `${day}일 전`;

  return result;
}

export function FormatTimeDot(data) {
  const date = format(new Date(data), "yy.MM.dd");

  return date;
}

// 이미지 크기 제한
export function MaxSizeFile(img) {
  // 1장당 10MB , 3장 20MB
  const maxSize = 10 * 1024 * 1024; // 10MB

  // 개별 사이즈
  for (let item of img) {
    if (Number(item.size) > maxSize) {
      console.log(item.size);
      return false;
    }
  }

  let totalSize = 0;
  for (let item of img) {
    totalSize += Number(item.size);
  }

  if (maxSize * 2 < totalSize) {
    return false;
  } else {
    return true;
  }
}
