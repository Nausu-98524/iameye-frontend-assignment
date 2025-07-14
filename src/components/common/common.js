export const setFocus = (ID) => {
  const element = document.getElementById(ID);
  if (element) {
    element.focus();
  }
};

export const handleDateChange = (e, setFormData, formData, key) => {
  let dateArr = (e?.toString() || "").split(" ");
  if (dateArr.length >= 4) {
    dateArr = `${dateArr[2]}-${dateArr[1]}-${dateArr[3]}`;
    setFormData({ ...formData, [key]: dateArr });
  } else {
    setFormData({ ...formData, [key]: "" });
  }
};

export const dateFormate = (e) => {
  let dateArr = (e?.toString() || "").split(" ");
  if (dateArr.length >= 4) {
    dateArr = `${dateArr[2]}-${dateArr[1]}-${dateArr[3]}`;
    return dateArr;
  } else {
    return (dateArr = "");
  }
};

export const getCurrentDate = () => {
  const forBeforeDays = new Date();
  return dateFormate(forBeforeDays);
};

export const getBeforeDate = (lastDay = 7, today = new Date()) => {
  const forBeforeDays = new Date();
  forBeforeDays.setDate(today.getDate() - lastDay);
  return dateFormate(forBeforeDays);
};

export const getAfterDate = (afterDay = 7, today = new Date()) => {
  const forBeforeDays = new Date();
  forBeforeDays.setDate(today.getDate() + afterDay);
  return dateFormate(forBeforeDays);
};

export const validatePAN = (pan) => {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan);
};

export const validateAadhaar = (aadhaar) => {
  const regex = /^[2-9]{1}[0-9]{11}$/;
  return regex.test(aadhaar);
};

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validateMobile = (mobile) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile);
};

export const convertToNumeric = (value, maxLength = null) => {
  const numericValue = value.replace(/\D/g, "");

  if (maxLength) {
    return numericValue.slice(0, maxLength);
  }
  return numericValue;
};

// src/utils/validators.js

export const validateDate_ddMmmYYYY = (dateStr) => {
  const regex =
    /^(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/;

  if (!regex.test(dateStr)) return false;

  const [day, monthStr, year] = dateStr.split("-");
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const month = months[monthStr];
  const date = new Date(year, month, day);

  return (
    date.getDate() === parseInt(day, 10) &&
    date.getMonth() === month &&
    date.getFullYear() === parseInt(year, 10)
  );
};
