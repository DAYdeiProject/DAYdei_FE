export default function ColorFromDB(data) {
  //console.log("-------------", data);
  switch (data) {
    case "RED":
      return "#FFEBF5";
    case "ORANGE":
      return "#FDF2DE";
    case "YELLOW":
      return "#EEF9F7";
    case "GREEN":
      return "#DFF3FE";
    case "BLUE":
      return "#B8EEFF";
    case "NAVY":
      return "#EFECFF";
    case "GRAY":
      return "#AFB4BF";
    case "PINK":
      return "#F6A89E";
    default:
      return "#F2F4F6";
  }
}

export function ColorToDB(data) {
  switch (data) {
    case "#FFEBF5":
      return "RED";
    case "#FDF2DE":
      return "ORANGE";
    case "#EEF9F7":
      return "YELLOW";
    case "#DFF3FE":
      return "GREEN";
    case "#B8EEFF":
      return "BLUE";
    case "#EFECFF":
      return "NAVY";
    default:
      return "PURPLE";
  }
}

export function ColorList() {
  const colorList = ["#FFEBF5", "#FDF2DE", "#EEF9F7", "#DFF3FE", "#B8EEFF", "#EFECFF", "#F2F4F6"];
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
