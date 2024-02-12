let cardHolderInput = document.querySelector(".card_holder_input");
let cardNumberInput = document.querySelector(".card_number_input");
let monthInput = document.querySelector(".month_input");
let yearInput = document.querySelector(".year_input");
let cvcInput = document.querySelector(".cvc_code_input");
let confirmBtn = document.querySelector(".confirm_btn");
let nameErrorMessage = document.querySelector(".name_error_message");
let numberErrorMessage = document.querySelector(".number_error_message");
let expireErrorMessage = document.querySelector(".expire_error_message");
let cvcErrorMessage = document.querySelector(".cvc_error_message");
let cardName = document.querySelector(".card_holder");
let cardNumber = document.querySelector(".card_numbers");
let expireMonth = document.querySelector(".expire_month");
let expireYear = document.querySelector(".expire_year");
let cvcItem = document.querySelector(".cvc_code");

const regex = /^[0-9]+$/;

cardHolderInput.addEventListener("input", function () {
  validateCardHolderName();
});

cardNumberInput.addEventListener("input", function () {
  validateCardNumbers();
});

monthInput.addEventListener("input", function (e) {
  expireMonthFunction();
  const inputValue = e.target.value.trim();
  if (inputValue.length > 2) {
    e.target.value = inputValue.slice(0, 2);
  }
});

yearInput.addEventListener("input", function (e) {
  expireYearFunction();
  const yearInputValue = e.target.value.trim();
  if (yearInputValue.length > 2) {
    e.target.value = yearInputValue.slice(0, 2);
  }
});

cvcInput.addEventListener("input", function (e) {
  cvcCodeFunction();
  const cvcInputValue = e.target.value.trim();
  if (cvcInputValue.length > 3) {
    e.target.value = cvcInputValue.slice(0, 3);
  }
});

function validateCardHolderName() {
  const regex = /^[a-zA-Z\s-]+$/;
  let cardHolderName = cardHolderInput.value.trim();
  let cardHolderSplitName = cardHolderName.split(" ").length;
  if (cardHolderName === "" || cardHolderSplitName < 2) {
    nameErrorMessage.textContent = "Please enter the cardholder name";
    cardName.innerHTML = "JANE APPLESEED";
  } else if (!regex.test(cardHolderName)) {
    nameErrorMessage.textContent =
      "Invalid cardholder name. Only alphabetic characters.";
  } else {
    nameErrorMessage.textContent = "";
    cardName.innerHTML = cardHolderName;
  }
}

function validateCardNumbers() {
  let cardNumbers = cardNumberInput.value.trim().replace(/\s/g, "");
  cardNumbers = cardNumbers.slice(0, 16);
  if (cardNumbers.length !== 16) {
    numberErrorMessage.textContent = "Wrong format, numbers must be 16!";
    cardNumber.innerHTML = "0000 0000 0000 0000";
  } else if (!regex.test(cardNumbers)) {
    numberErrorMessage.textContent = "Wrong format, numbers only";
    cardNumber.innerHTML = "0000 0000 0000 0000";
  } else {
    numberErrorMessage.textContent = "";
  }

  let numbers = "";
  for (let i = 0; i < cardNumbers.length; i++) {
    if (i > 0 && i % 4 === 0) {
      numbers += " " + cardNumbers[i];
      cardNumberInput.value = numbers;
    } else {
      numbers += cardNumbers[i];
      cardNumberInput.value = numbers;
    }
  }
  cardNumber.innerHTML = numbers || "0000 0000 0000 0000";
}

function expireMonthFunction() {
  let expMonth = monthInput.value.trim();
  expMonth = expMonth.slice(0, 2);

  if (expMonth === "") {
    expireErrorMessage.textContent = "Can’t be blank";
    expireMonth.textContent = "00";
  } else if (!regex.test(expMonth)) {
    expireErrorMessage.textContent = "Can’t be blank";
    expireMonth.textContent = "00";
  } else if (expMonth.length > 2) {
    expMonth = expMonth.slice(0, 2);
  } else {
    expireErrorMessage.textContent = "";
    expireMonth.textContent = expMonth;
  }
}

function expireYearFunction() {
  let expYear = yearInput.value.trim();
  expYear = expYear.slice(0, 2);
  if (expYear === "") {
    expireErrorMessage.textContent = "Can’t be blank";
    expYear.textContent = "00";
  } else if (!regex.test(expYear)) {
    expireErrorMessage.textContent = "Can’t be blank";
    expYear.textContent = "00";
  } else {
    expireErrorMessage.textContent = "";
    expireYear.textContent = expYear;
  }
}

function cvcCodeFunction() {
  let cvcValue = cvcInput.value.trim();
  cvcValue = cvcValue.slice(0, 3);
  if (cvcValue.length !== 3) {
    cvcErrorMessage.textContent = "CVC code must be 3 digits";
    cvcItem.innerHTML = "e.g 123";
  } else if (!regex.test(cvcValue)) {
    cvcErrorMessage.textContent = "CVC code must contain only digits";
    cvcItem.textContent = "e.g 123";
  } else {
    cvcErrorMessage.textContent = "";
    cvcItem.textContent = cvcValue;
  }
}

confirmBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  validateCardHolderName();
  validateCardNumbers();
  expireMonthFunction();
  expireYearFunction();
  cvcCodeFunction();
});
