const Base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const dropdowns= document.querySelectorAll(".dropdown select");
const val = document.querySelector("form input");
const btn = document.querySelector("#btn");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const ratemsg = document.querySelector(".exrate");

window.addEventListener("load", ()=> {
    updateexrate();
})

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected = currcode;
        }
        if(select.name === "to" && currcode === "INR"){
            newOption.selected = currcode;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}


const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateexrate();
   
})

const updateexrate = async ()=> {
    let amountval = val.value;
    if(amountval === "" || amountval < 1){
        amountval = 1;
        val.value = 1;
    }
    const URL = `${Base_url}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = await data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let exrate = rate*amountval;
    let msg = `${amountval} ${fromcurr.value} = ${exrate} ${tocurr.value}`;
    ratemsg.innerText = msg;
}