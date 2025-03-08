// const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json";
// ya hai origianl api esa mai exchnage rat nahi nekaal pa raha hu 

//we are using the reduced form of url having no following endpoints 
// const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies";

//ya necha bahil apikey hai jiska maina use kiya hai 
const apiKey = "00f6c95f95f047d49f68ca762e8d3c52";
const url = "https://api.exchangerate-api.com/v4/latest/USD?apikey=${apiKey}";

const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

/* check wheather the countryList is working or not
for(code in countryList){
    console.log(code, countryList[code]);
}
    */

for(select of dropdown){ // it will add both select of dropdown from and to 
    for(currCode in countryList){ /*currcode is currency code*/
        // console.log(code);
        //we are going to add options for each country code
        let newOption = document.createElement("option"); 
        // option here is tag
        newOption.innerText=currCode;
        newOption.value=currCode;

        if (select.name === 'from' && currCode === 'USD'){
            newOption.selected = "selected";
        } else if(select.name === 'to' && currCode === 'INR'){
            newOption.selected = "selected";
        }
        select.append(newOption);       
}

select.addEventListener("change",(evt) => {
    updateFlag(evt.target);
})
};
// In essence, this code ensures that whenever the user changes the 
// selection in either dropdown (from or to), the updateFlag function
//  is called with the changed select element as its argument. 
// This allows the application to respond to user input and update the UI 
// accordingly, likely changing the displayed flag to match the selected 
// country or currency.

const updateFlag = (element) => {
    // console.log(element);
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    // console.log(countryCode);
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector('img');
    img.src = newSrc;
}

// now while pressing the button in URL the changes of from and to will be visible and there will be the refresh in the page
// but we don't want to do that even we want to remove that and need to add things which we wand 
//means to say we have to use evt.parentDeault() to stoping the default changes


btn.addEventListener("click", async (evt) => {
    evt.preventDefault(); // Prevent default form submission behavior
    
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value,toCurr.value);
    // const URL = `${BASE_URL}/${fromCurr.value}`;

// }); 
    // Construct the API request URL
    const URL = `${BASE_URL}/${fromCurr.value}`;
    
    try {
        let response = await fetch(URL);
        let data = await response.json();
        
        if (!response.ok) {
            throw new Error("Failed to fetch exchange rate.");
        }
        
        let exchangeRate = data.conversion_rates[toCurr.value]; // Get exchange rate
        let convertedAmount = (amtVal * exchangeRate).toFixed(2);

        // Display the result
        document.querySelector(".result").innerText = 
            `${amtVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;

    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        document.querySelector(".result").innerText = "Error fetching exchange rate.";
    }
});
