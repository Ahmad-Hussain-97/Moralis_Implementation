Moralis.initialize("3ovMTV6aZewIwRAza4nV0dYV3aF2Ag1vwjO8ye6F"); // Application id from moralis.io
Moralis.serverURL = "https://xe9ldqq0tzst.moralis.io:2053/server"; //Server url from moralis.io



// add from here down
async function login() {
    console.log("login clicked!")
var user = Moralis.User.current();
if (!user) {
    user = await Moralis.Web3.authenticate();
}
if (user){
    user.set("Name","Ahmad human");
    user.set("Color","Red");
    user.save();
}

console.log("logged in user:", user);
getStats();
}

//merge multiple accounts
Moralis.Web3.onAccountsChanged(async ([account])=>{
    alert("Do you want to merge?");
    var user=await Moralis.Web3.link(account)
})

// user signup

signup= async(email, password)=>{
    const user = new Moralis.User();
    user.set("username", email);
    user.set("password", password);
    user.set("email", email);

   
    try {
    await user.signUp();
    console.log("logged in user:", user);
    } catch (error) {

    alert("Error: " + error.code + " " + error.message);
    }
}

// user login

mlogin= async(email, password)=>{
    try {
    const user = await Moralis.User.logIn(email, password);
    console.log("logged in user:", user);
    // if (user){
    //     user.set("Name","Ahmad human");
    //     user.set("Color","Red");
    //     user.save();}
    } catch (error) {

    alert("Error: " + error.code + " " + error.message);
    }
}


//

async function logOut() {
await Moralis.User.logOut();
console.log("logged out");
}


function getStats() {
const user = Moralis.User.current();
    if (user) {
        getUserTransactions(user);
    }
}

async function getUserTransactions(user) {
// create query
const query = new Moralis.Query("EthTransactions");
query.equalTo("0x6846FD5a196A73C69e72fa0529A246683945c33A", user.get("ethAddress"));

// run query
const results = await query.find();
console.log("user transactions:", results);
}

// get stats on page load
getStats();

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-get-stats").onclick = getStats;
document.getElementById("signup").onclick = ()=> signup(document.getElementById("email").value, document.getElementById("password").value);
document.getElementById("login").onclick = ()=> mlogin(document.getElementById("email").value, document.getElementById("password").value);


