const amount = document.querySelector("#amount");
const btnAdd = document.querySelector("#credit");
const btnSubtract = document.querySelector("#debit") 
const totalExpense = document.querySelector("#total");
const desc = document.querySelector("#inputdesc");
const output = document.querySelector("#output");

let counter = 0;
let total = 0;
totalExpense.textContent = total;
let headText = parseInt(0,10);

let year = [];


/***  function for debit */

function decrement(){
    let allExpense = [];
    let detailExpense = {};
    let expense = -amount.value;
    let amountDesc = desc.value;
    // console.log({ expense, amountDesc });

    // expense = expense + expense + 'Shubham';
    detailExpense.amount = expense;
    detailExpense.desc = amountDesc;

    let currentDate = new Date();
    detailExpense.moment = currentDate;
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    allExpense.push(detailExpense);
    // console.table(allExpense);

    expense = parseInt(expense, 10);
    // console.log(expense); 
    
    if(expense){
        total = total + expense;
        year = updateMonthAndYear(currentYear, currentMonth, allExpense, detailExpense, expense);
    }
    // console.log(total);
    let [i, j] = getIndex(currentYear, currentMonth);
    // const headText="Total:"+total;
    headText = `Total = ${year[i].monthDesc[j].balance}`;

    // const data1 = allExpense[0];
    // const data2 = allExpense[1];
    // const dataText1 = `${data1.amount} :: ${data1.desc}`;
    // const dataText2 = `${data2.amount} :: ${data2.desc}`;
    // const combine = `
    //     <div>${dataText1}</div>
    //     <div>${dataText2}</div>
    // `;

    display();
    amount.value = '';
    desc.value = '';
    localStorage.setItem('Expense', JSON.stringify(year));

}

function increment(){
    let allExpense = [];
    let detailExpense = {};
    let expense = amount.value;
    let amountDesc = desc.value;
    // console.log({ expense, amountDesc });

    // expense = expense + expense + 'Shubham';
    expense = parseInt(expense, 10);
    detailExpense.amount = expense;
    detailExpense.desc = amountDesc;

    let currentDate = new Date();
    detailExpense.moment = currentDate;
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    allExpense.push(detailExpense);
    // console.table(allExpense);

    
    // console.log(expense); 
    if(expense){
        total = total + expense;
        year = updateMonthAndYear(currentYear, currentMonth, allExpense, detailExpense, expense);
    }
    
    // console.log(total);
    
    let [i, j] = getIndex(currentYear, currentMonth);
    // const headText="Total:"+total;
    headText = `Total = ${year[i].monthDesc[j].balance}`;

    // const data1 = allExpense[0];
    // const data2 = allExpense[1];
    // const dataText1 = `${data1.amount} :: ${data1.desc}`;
    // const dataText2 = `${data2.amount} :: ${data2.desc}`;
    // const combine = `
    //     <div>${dataText1}</div>
    //     <div>${dataText2}</div>
    // `;
    display();
    amount.value = '';
    desc.value = '';
    localStorage.setItem('Expense', JSON.stringify(year));
    

}

function getArray(){
    let allExpenseJSON = localStorage.getItem('Expense');
    year = JSON.parse(allExpenseJSON);
    // console.log(year);
    total = year.reduce(function (sum, detailExpense){ return sum = sum + parseInt(detailExpense.balance,10)}, 0);
    headText = `Total = ${total}`;
    if(total){
        display();
    }
}



function showDate(currentDate) {
    let options = {year : 'numeric', month : 'long', day : 'numeric'};
    
    // Below step is done to convert from 2020-12-16T13:40:50.236Z format(JSON) to December 16, 2020
    // Using new Date() 2020-12-16T13:40:50.236Z was converted to Wed Dec 16 2020 19:10:50 GMT+0530 (India Standard Time)
    // toLocaleString was used to reduce it to December 16, 2020
    let momento = new Date(currentDate).toLocaleString('en-US', options);
    return momento;
}

function removeItem(itemDate) {
    // console.log(itemDate);
    let newAllExpense = [];
    let itemValue, itemMonth, itemYear;
    itemMonth = (new Date(itemDate)).getMonth();
    itemYear = (new Date(itemDate)).getFullYear();
    let [x, y] = getIndex(itemYear, itemMonth);
    let monthlyExpense = year[x].monthDesc[y].description;
    for(let i = 0; i < monthlyExpense.length; i++) {
        if(itemDate != new Date(monthlyExpense[i].moment).valueOf()) {
            newAllExpense.push(monthlyExpense[i]);
        }

        else {
            if(monthlyExpense[i]){
                year[x].monthDesc[y].balance -= parseInt(monthlyExpense[i].amount,10);
                year[x].balance -= parseInt(monthlyExpense[i].amount,10);
                itemValue = parseInt(year[x].monthDesc[y].description[i].amount,10);
                if(itemValue <= 0){
                    year[x].monthDesc[y].debit += itemValue;
                    year[x].debit += itemValue;
                }
                else{
                    year[x].monthDesc[y].credit -= itemValue;
                    year[x].credit -= itemValue;
                }
            }
        }
    }
    year[x].monthDesc[y].description = newAllExpense;
    display();
    year = removeHistory(itemYear, itemMonth);
    localStorage.setItem('Expense', JSON.stringify(year));
    if(year.length != 0){
        total = year[x].monthDesc[y].balance;
    }
    else{
        total = 0;
        headText = `Total = ${total}`;
        totalExpense.innerHTML = headText;
        console.log(total);
    }
    headText=`Total = ${total}`;
    display();
}

function display() {
    // Iterate through different objects of allExpense. allExpenseHTML is an
    // array of strings
    if(year.length != 0){
        const allExpenseHTML = year[0].monthDesc[0].description.map(detailExpense => render(detailExpense));
        
        // convert array of string to normal string
        const allExpenseString = allExpenseHTML.join("");
        totalExpense.innerHTML = headText;
        output.innerHTML = allExpenseString;
    }
}




// Year -> Savings, Debit, Credit, Month
// Month -> Name, Savings, Debit, Credit, allExpense
// allExpense -> Amount, Description, Date

function updateMonthAndYear(currentYear, month, allExpense, detailExpense, expense){
    let yer = [];
    let yearDetail = {};
    let monthDetail = {};
    let monthExpense = [];
    if(year.length == 0){
        monthDetail.debit = 0;
        monthDetail.credit = 0;
        yearDetail.debit = 0;
        yearDetail.credit = 0;

        monthDetail.monthNo = month;
        monthDetail.description = allExpense;
        monthDetail.balance = expense;
        
        if(expense <= 0){
            monthDetail.debit -= expense; 
            yearDetail.debit -= expense;
        }
        else{
            monthDetail.credit += expense; 
            yearDetail.credit += expense;
        }

        monthExpense.push(monthDetail);

        yearDetail.yearNo = currentYear;
        yearDetail.monthDesc = monthExpense;
        yearDetail.balance = expense;
        
        // console.log("First Entry");
        yer.push(yearDetail);
        return yer;
    } 
    else{
        yer = year;
        for(let i = 0 ; i < yer.length ; i++){
            if(currentYear == yer[i].yearNo){
                // checkMonth(month);
                for(let j = 0 ; j < yer[i].monthDesc.length ; j++){
                    if(month == yer[i].monthDesc[j].monthNo){
                        yer[i].monthDesc[j].description.push(detailExpense);
                        yer[i].monthDesc[j].balance += expense;
                        yer[i].balance += expense;
                        if(expense <= 0){
                            yer[i].monthDesc[j].debit -= expense; 
                            yer[i].debit -= expense;
                        }
                        else{
                            yer[i].monthDesc[j].credit += expense; 
                            yer[i].credit += expense;
                        }
                        // Update Debit, credit, and total
                        return yer;
                    }
                }
                monthDetail.monthNo = month;
                monthDetail.description = allExpense;
                monthDetail.balance += expense;
                yer[i].monthDesc.push(monthDetail);
                return yer;
            }            
        }
    }
}

function removeHistory(itemYear, itemMonth){
                    
    // If no element in description then remove that month 
    let [i, j] = getIndex(itemYear, itemMonth);
    if(year[i].monthDesc[j].description.length == 0){
        year[i].monthDesc.splice(j,1);
                        
        // If no elemnt in array monthDesc then remove that year
        if(year[i].monthDesc.length == 0){
            year.splice(i,1);
        }
    }
    return year;
}

function getIndex(currentYear, currentMonth){
    for(let i = 0 ; i < year.length ; i++){
        if(year[i].yearNo == currentYear){
            for(let j = 0; j < year[i].monthDesc.length ; j++){
                if(year[i].monthDesc[j].monthNo == currentMonth){
                    return [i, j];
                }
            }
        }
    }
}

function displayYears(){
    if(year.length != 0){
        const allExpenseHTML = year.map(detailExpense => renderYears(detailExpense));
        
        // convert array of string to normal string
        const allExpenseString = allExpenseHTML.join("");
        headText = year.reduce(function (sum, detailExpense){ return sum = sum + parseInt(detailExpense.balance,10)}, 0);
        totalExpense.innerHTML = headText;
        output.innerHTML = allExpenseString;
    }
}

function renderYears({yearNo, balance, credit, debit}){
    return `<li class="list-group-item d-flex justify-content-between">
        <div class="d-flex flex-column align-self-center">
            <h5 class="text-success">${yearNo}</h5>                    
        </div>
        
        <div class="text-center d-flex flex-column align-self-center">
            <small class="text-secondary">Total Savings</small>
            <h5 class="text-primary">${balance}</h5>                    
        </div>
        
        <small class="text-center align-self-center">
            <span class="text-success">Credit : ${credit} </span><br>
            <span class="text-danger">Debit : ${debit}</span>
        </small>
    </li>`;
}

//To keep the logic(controller) seperate from HTML(view) made the function below
//Known as Templating
//also used in destructuring assignment means you will pass only the object while function calling 
//but you can use its attributes directly by writing as given below

function render({amount, desc, moment}) {
    return `<li class="list-group-item d-flex justify-content-between">
        <div class="d-flex flex-column">
            <h5 class="text-primary">${desc}</h5>
            <small class="text-secondary">${showDate(moment)}</small>
        </div>
        <div>
            <h5 class="text-success">
                <span class="px-5">${amount}</span>
                <button  class="btn btn-outline-danger btn-sm" onclick="removeItem(${new Date(moment).valueOf()})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </h5>
        </div>
    </li>`;
}

btnAdd.addEventListener("click", increment, false);
btnSubtract.addEventListener("click", decrement, false);
window.addEventListener("load", getArray, false);
