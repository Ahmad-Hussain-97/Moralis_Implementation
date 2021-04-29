Moralis.initialize("3ovMTV6aZewIwRAza4nV0dYV3aF2Ag1vwjO8ye6F"); // Application id from moralis.io
Moralis.serverURL = "https://xe9ldqq0tzst.moralis.io:2053/server"; //Server url from moralis.io



init = async() =>{
    const first = await getFirstObject();
    console.log(first);

}

makeRelations = async() =>{
    const ahmad=await defineNewObject("Ahmad","RWP","PK","red");
    const sham = await defineNewObject("sham","RWP","PK","blue");
    ahmad.set("buddy", sham)
    await ahmad.save();
}
defineNewObject = async(name, city, country, color) =>{
    const object = Moralis.Object.extend("Human");
    const dev=new object();
    dev.set("Name",name);
    dev.set("Location",city);
    dev.set("country",country);
    dev.set("color",color);
    await dev.save();
    
    console.log("intialized an object")
    return dev;
}

getFirstObject =async()=>{
    const query=new Moralis.Query('Human');
    const dev=query.first();
    console.log(dev)
    return dev;   
}

savingObject =async(score, playerName )=>{
    const GameScore = Moralis.Object.extend("GameScore");
    const gameScore = new GameScore();

    gameScore.set("score", score);
    gameScore.set("playerName", playerName);
    gameScore.save()
    .then((gameScore) => {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + gameScore.id);
    }, (error) => {
    // Execute any logic that should take place if the save fails.
    // error is a Moralis.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
    });
}
 

//retreiving 
retrieveObject = async()=>{
    const GameScore = Moralis.Object.extend("GameScore");
    const query = new Moralis.Query(GameScore);
    query.get("TcexbfjTLM")
    .then((gameScore) => {
    console.log("The object was retrieved successfully"+query);
    }, (error) => {
        console.log("error occured!")
    // The object was not retrieved successfully.
    // error is a Moralis.Error with an error code and message.
    });
}


document.getElementById("btn-init-object").onclick = ()=> defineNewObject();
document.getElementById("btn-get-object").onclick = ()=> getFirstObject();
document.getElementById("btn-save-object").onclick = ()=> savingObject(document.getElementById(score),document.getElementById("name").value);
document.getElementById("btn-ret-object").onclick = ()=> retrieveObject();

init();