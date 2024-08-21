const Base_URL = "https://latest.currency-api.pages.dev/v1/currencies/";

const dropdowns = document.querySelectorAll(".select-container select");
const img = document.querySelectorAll(".select-container img");
const input = document.querySelector("form input");
const btn = document.querySelector("form button");
const value = document.querySelector(".value h3");
const error = document.querySelector("form .error-msg");
for(let select of dropdowns){
    for(let currency in countryList){
        let newOption  = document.createElement("option");
        newOption.value = currency;
        newOption.innerText = currency;
        select.append(newOption);   
        if(select.name === "From" && currency === "USD" ){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currency === "INR"){
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change",(res) =>{
        updateFlag(res.target);
    })

}

// update flag
let updateFlag = (selectedValue) =>{
    let currCode = countryList[selectedValue.value];
    if(selectedValue.name === "From"){
        img[0].src = `https://flagsapi.com/${currCode}/shiny/64.png`;
    }   
    else{
        img[1].src = `https://flagsapi.com/${currCode}/shiny/64.png`;
    }
}

// eventlistener to button
btn.addEventListener("click",(res) =>{
    res.preventDefault(); //removes the deafault event that is created by the form
    convert(dropdowns[0].value.toLowerCase(),dropdowns[1].value.toLowerCase());
})

// currency convert
let convert = async (fromCurr,toCurr) =>{
    // input fetching part
    let amtval = input.value;
    input.value = "";
    
    // user input error handling part
    if(amtval < 1 || isNaN(Number(amtval))){
        error.classList.remove("hidden");
        return;
    }
    else{
        error.classList.add("hidden");
    }
    
    // converting part
    let url =  `${Base_URL}${fromCurr}.json`
    let response = await fetch(url);
    let jso = await response.json();//converting into readable form
    let baseAmt = jso[fromCurr][toCurr];
    
    let amtval2 = amtval*baseAmt;
    
    value.innerText = `${amtval}${fromCurr.toUpperCase()} = ${amtval2}${toCurr.toUpperCase()}`;

}

window.addEventListener("load", async () =>{
    //onload
    let fromCurr = dropdowns[0].value.toLowerCase();
    let toCurr = dropdowns[1].value.toLowerCase();

    //converting part
    let url =  `${Base_URL}${fromCurr}.json`
    let response = await fetch(url);
    let jso = await response.json();//converting into readable form
    let baseAmt = jso[fromCurr][toCurr];
    
    let amtval2 = 1*baseAmt;
    
    value.innerText = `1${fromCurr.toUpperCase()} = ${amtval2}${toCurr.toUpperCase()}`;
});