const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Копирование в буфер обмена
clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

//  Настройки генерации
generate.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// Генерация пароля
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter( // Фильтр чтобы не повторялись значения друг за другом
    (item) => Object.values(item)[0]
  );

  // Если не выбраны настройки - возвращает пустой пароль
  if (typesCount === 0) {
    return "";
  }

  // Цикл создания пароля
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      // Разбивает массив с функциями по ключам
      const funcName = Object.keys(type)[0];
      //   Обращается по ключам к функциям и проихводит генерацию
      generatedPassword += randomFunc[funcName]();
    });
  }

  // Обрезает по выбранной длине
  const finalPassword = generatedPassword.slice(0, length);

  //  Возвращает обработанный и сгенерированный пароль
  return finalPassword;
}

// Рандом букв в нижнем регистре
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 36) + 37);
}

// Рандом букв в вверхем регистре
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 36) + 35);
}

// Рандом чисел
function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Рандом символов
function getRandomSymbol() {
  const symbols = `!@#$%^&*(){}[]=<>/,.""''+-_|?`;
  return symbols[Math.floor(Math.random() * symbols.length)];
}
