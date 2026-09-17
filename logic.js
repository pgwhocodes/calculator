let nums = document.querySelectorAll(".nums");
let btns = document.querySelectorAll("button");
let display = document.querySelector("#display");
let ac = document.querySelector("#clear");
let back = document.querySelector("#backspace");
let opers = document.querySelectorAll(".opers");
let equal = document.querySelector("#equal");

display.style.fontFamily = "Digital-7";

nums.forEach((num) => {
    num.addEventListener("click", () => {
        if(display.textContent==0)  {
            display.textContent = "";
        }
        display.textContent = display.textContent + num.innerText;
        display.scrollLeft = display.scrollWidth;
    });
});

opers.forEach((oper) => {
    oper.addEventListener("click", () => {
        display.style.textAlign = "right";
        display.style.direction = "ltr";
        globalThis.op = oper.innerText;
        display.textContent = display.textContent + op;
        display.scrollLeft = display.scrollWidth;
    });
});

back.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0,-1);
    if(display.textContent == "")  {
        display.textContent = 0;
    }
});

ac.addEventListener("click", () =>  {
    display.textContent = 0;
});

const calculation = () =>   {
    let parts = display.textContent.split(/([+\-*/%])/); 
    parts = parts.map(no => !isNaN(no) ? Number(no) : no);
    let i;
    for(i=1; i<parts.length; i+=2) {
        if(parts[i] === "%")    {
            globalThis.ans = parts[i-1]/100;
            parts.splice(i-1, 3, ans);
        } 
    }
    for(i=1; i<parts.length; i+=2) {
        if(parts[i] === "/")    {
            globalThis.ans = parts[i-1]/parts[i+1];
            parts.splice(i-1, 3, ans);
        } 
    }
    for(i=1; i<parts.length; i+=2) {
        if(parts[i] === "*")    {
            globalThis.ans = parts[i-1]*parts[i+1];
            parts.splice(i-1, 3, ans);
        } 
    }
    for(i=1; i<parts.length; i+=2) {
        if(parts[i] === "-")    {
            globalThis.ans = parts[i-1]-parts[i+1];
            parts.splice(i-1, 3, ans);
        }
    }
    for(i=1; i<parts.length; i+=2) {
        if(parts[i] === "+")    {
            globalThis.ans = parts[i-1]+parts[i+1];
            parts.splice(i-1, 3, ans);
        } 
    }
}

equal.addEventListener("click", () => {
    calculation();    
    display.textContent = ans;
});