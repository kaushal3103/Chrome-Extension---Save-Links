const input = document.getElementById("input-btn");
input.addEventListener("click", inputclick);
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
let myLeads = [];
const deletebtn = document.getElementById("delete-btn");
deletebtn.addEventListener("dblclick",deleteall);
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click",savetab);

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if ( leadsFromLocalStorage){
myLeads = leadsFromLocalStorage;
render(myLeads);
}

function savetab(){
  // grab the url of current tabs
  //chrome.tabs.query({active: true, currentWindow: true},function(tabs){  
 // });

 chrome.tabs.query({active: true , currentWindow: true},function(tabs){

 console.log(tabs);
 myLeads.push(tabs[0].url);
 localStorage.setItem("myLeads",JSON.stringify(myLeads));
 render(myLeads);

 })


 
}

function render(leads){
let listItems = "";

for ( let i= 0 ; i < leads.length ; i++)
{

 listItems += `
 <li class="links">
    <a target = '_blank' href= '${leads[i]}'>
      ${leads[i]}
    </a>
 </li>`;
}
ulEl.innerHTML = listItems;

}

function deleteall(){
  localStorage.clear();
  myLeads = [];
  render(myLeads);
}

function inputclick(){
  myLeads.push(inputEl.value);
  inputEl.value ="";
  localStorage.setItem("myLeads",JSON.stringify(myLeads));
  render(myLeads);
 
}

