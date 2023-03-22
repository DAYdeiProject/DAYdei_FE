export default function ColorFromDB(data) {
  //console.log("-------------", data);
  switch (data) {
    case "RED":
      return "#EC899F";
    case "ORANGE":
      return "#EB8E54";
    case "YELLOW":
      return "#FCE0A4";
    case "GREEN":
      return "#94DD8E";
    case "BLUE":
      return "#95DFFF";
    case "NAVY":
      return "#4C7EA0";
    default:
      return "#9747FF";
  }
}

export function ColorToDB(data) {
  switch (data) {
    case "#EC899F":
      return "RED";
    case "#EB8E54":
      return "ORANGE";
    case "#FCE0A4":
      return "YELLOW";
    case "#94DD8E":
      return "GREEN";
    case "#95DFFF":
      return "BLUE";
    case "#4C7EA0":
      return "NAVY";
    default:
      return "PURPLE";
  }
}

export function ColorList() {
  const colorList = ["#EC899F", "#EB8E54", "#FCE0A4", "#94DD8E", "#95DFFF", "#4C7EA0", "#9747FF"];
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
