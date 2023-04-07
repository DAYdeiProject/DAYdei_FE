import CryptoJS from "crypto-js";

export function encrypt(data) {
  const secretKey = `${process.env.REACT_APP_LOCAL_SECRETKEY}`;
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export function decrypt(data) {
  const secretKey = `${process.env.REACT_APP_LOCAL_SECRETKEY}`;

  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

  // // 디코딩된 문자열을 JSON.parse()에 전달하여 파싱
  const parsedData = JSON.parse(decryptedString);

  return parsedData;
}
