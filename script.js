const inputSlider=document.querySelector("[slider]");
const inputLength=document.querySelector("[data-length]");
const passwordDisplay=document.querySelector("[password-display]");
const dataCopy=document.querySelector("[data-copy]");
const dataCopyMsg=document.querySelector("[data-copying-msg]");
const upperCase=document.querySelector("#uppercase");
const lowerCase=document.querySelector("#lowercase");
const numbers=document.querySelector("#numbers");
const symbols=document.querySelector("#symbols");
const strengthIndicator=document.querySelector("[strength-indicator]");
const generateBtn=document.querySelector(".generateBtn");
const checkBoxes=document.querySelector("input[type=checkbox]");
let checkCount=0;
let password="";
let passwordLength=10;
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function slider(){
    inputSlider.value=passwordLength;
    inputLength.innerText=passwordLength;
    const mini=inputSlider.min;
    const maxi=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-mini)*100/(maxi-mini))+"% 100%";
}
slider();
setIndicator("#ccc");
function setIndicator(color){
    strengthIndicator.style.backgroundColor=color;
    strengthIndicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}
function generateRandomInteger(max,min){
    return Math.floor(Math.random()*(max-min)+min);
}
function generateRandomNumber(){
    return generateRandomInteger(0,10);
}
function generateLowerCase(){
    return String.fromCharCode(generateRandomInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(generateRandomInteger(65,91));
}
function generateSymbol(){
let random=generateRandomInteger(0,symbol.length);
return symbol.charAt(random);
}
function strengthCalculator(){
    let hasLower=false;
    let hasUpper=false;
    let hasNum=false;
    let hasSymbol=false;
    if (upperCase.checked)
    hasUpper=true;
    if (lowerCase.checked)
    hasLower=true;
    if (numbers.checked)
    hasNum=true;
    if (symbols.checked)
    hasSymbol=true;
    if (hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } 
    else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSymbol) &&
        passwordLength >= 6)
     {
        setIndicator("#ff0");
    } 
    else {
        setIndicator("#f00");
    }
}
async function copyClipboard(){
    try{
      await navigator.clipboard.writeText(passwordDisplay.value);
      dataCopyMsg.innerText="copied";
    }
    catch{
        dataCopyMsg.innerText="Failed"
    }
    dataCopyMsg.classList.add("active");
    setTimeout(function(){
        dataCopyMsg.classList.remove("active");
    },2000);
}
inputSlider.addEventListener('input',function(e){
    passwordLength=e.target.value;
    slider();
});
dataCopy.addEventListener('onclick',function(){
    if(passwordDisplay.value)
    copyClipboard();
})
function handleChange(){
    checkCount=0;
    if (upperCase.checked)
    checkCount++;
    if (lowerCase.checked)
    checkCount++;
    if (numbers.checked)
    checkCount++;
    if (symbols.checked)
    checkCount++;
    if (checkCount > passwordLength){
        passwordLength=checkCount;
        slider();
    }
}
upperCase.addEventListener('change', handleChange);
lowerCase.addEventListener('change', handleChange);
numbers.addEventListener('change', handleChange);
symbols.addEventListener('change', handleChange);
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
generateBtn.addEventListener('click', () => {
    if (checkCount <= 0)
        return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        slider();
    }

    // Remove Previous Password 
    password = "";

    let arrayOfCheckedFunction = [];

    if (upperCase.checked) arrayOfCheckedFunction.push(generateUpperCase);
    if (lowerCase.checked) arrayOfCheckedFunction.push(generateLowerCase);
    if (numbers.checked) arrayOfCheckedFunction.push(generateRandomNumber);
    if (symbols.checked) arrayOfCheckedFunction.push(generateSymbol);

    // Compulsory Addition
    for (let i = 0; i < arrayOfCheckedFunction.length; i++) {
        password += arrayOfCheckedFunction[i]();
    }

    // console.log("Password: " + password);

    // Additional addition
    for (let i = 0; i < passwordLength - arrayOfCheckedFunction.length; i++) {
        let randIndex = generateRandomInteger(0, arrayOfCheckedFunction.length);
        password += arrayOfCheckedFunction[randIndex]();
    }
    // console.log("Password: " + password);
    // Shuffle Password 
    password = shuffle(Array.from(password));
    passwordDisplay.value = password;
    passwordDisplay.style.color="white";
    passwordDisplay.style.opacity="0.7";
    strengthCalculator(); 
});