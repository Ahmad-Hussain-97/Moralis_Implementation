Moralis.initialize("3ovMTV6aZewIwRAza4nV0dYV3aF2Ag1vwjO8ye6F"); // Application id from moralis.io
Moralis.serverURL = "https://xe9ldqq0tzst.moralis.io:2053/server"; //Server url from moralis.io

defineNewMonster = async (name, health, strength) => {
    const MonsterCreature = Moralis.Object.extend("Monster");
    const monster = new MonsterCreature();
    monster.set("name", name);
    monster.set('health',health);
    monster.set('strength',strength);
    await monster.save();
    return monster;
}
//await defineNewMonster("kain",23,43);

getAllMonsters = async () =>{
    const MonsterCreature = Moralis.Object.extend("Monster");
    const query= new Moralis.Query(MonsterCreature);
    //query.greaterThanOrEqualTo("health", 98);
    //query.lessThanOrEqualTo("health", 98);
    //query.lessThan("health", 78);
    //query.greaterThan("health", 58);
    const monsters= await query.find();
    alert("Successfully retrieved " + monsters.length + " monsters.");
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < monsters.length; i++) {
    const object = monsters[i];
    console.log(object.id + ' - Name ' + object.get('name') +' - Health '+ object.get('health') +' - Strength '+ object.get('strength'));
    }
}

getGr =async () =>{
    const MonsterCreature = Moralis.Object.extend("Monster");
    const query= new Moralis.Query(MonsterCreature);
    query.greaterThan("health", 50);
    const monsters= await query.find();
    alert("Successfully retrieved " + monsters.length + " monsters.");
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < monsters.length; i++) {
    const object = monsters[i];
    console.log(object.id + ' -Name ' + object.get('name') +' -Health '+ object.get('health'));
    }
}
 //we can also use ( EqualTo and notEqualTo ) to get the exact thing
getGe =async () =>{
    const MonsterCreature = Moralis.Object.extend("Monster");
    const query= new Moralis.Query(MonsterCreature);
    query.greaterThanOrEqualTo("health", 50);
    const monsters= await query.find();
    alert("Successfully retrieved " + monsters.length + " monsters.");
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < monsters.length; i++) {
    const object = monsters[i];
    console.log(object.id + ' -Name ' + object.get('name') +' -Health '+ object.get('health'));
    }
}

getle =async () =>{
    const MonsterCreature = Moralis.Object.extend("Monster");
    const query= new Moralis.Query(MonsterCreature);
    query.lessThan("health", 50);
    const monsters= await query.find();
    alert("Successfully retrieved " + monsters.length + " monsters.");
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < monsters.length; i++) {
    const object = monsters[i];
    console.log(object.id + ' -Name ' + object.get('name') +' -Health '+ object.get('health'));
    }
}

//contained in , notContainedIn
getEliteMonsters = async () =>{
    const MonsterCreature = Moralis.Object.extend("Monster");
    const query= new Moralis.Query(MonsterCreature);
 
    query.containedIn("name", ["jessica", "mash", "smago"]);
    const monsters= await query.find();
    alert("Successfully retrieved " + monsters.length + " monsters.");
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < monsters.length; i++) {
    const object = monsters[i];
    console.log(object.id + ' - Name ' + object.get('name') +' - Health '+ object.get('health') +' - Strength '+ object.get('strength'));
    }
}

// ascending descending health order
getAscMonsters = async () =>{
    const MonsterCreature = Moralis.Object.extend("Monster");
    const query= new Moralis.Query(MonsterCreature);
  //  query.ascending("health");
    query.descending("health");
    const monsters= await query.find();
    alert("Successfully retrieved " + monsters.length + " monsters.");
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < monsters.length; i++) {
    const object = monsters[i];
    console.log(object.id + ' - Name ' + object.get('name') +' - Health '+ object.get('health') +' - Strength '+ object.get('strength'));
    }
}

//limit page size
getTenMonsters = async () =>{
    const MonsterCreature = Moralis.Object.extend("Monster");
    const query= new Moralis.Query(MonsterCreature);
    query.limit(10);
    const monsters= await query.find();
    alert("Successfully retrieved " + monsters.length + " monsters.");
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < monsters.length; i++) {
    const object = monsters[i];
    console.log(object.id + ' - Name ' + object.get('name') +' - Health '+ object.get('health') +' - Strength '+ object.get('strength'));
    }
}

//of same name health or 
getCentlMonsters = async () =>{
    const MonsterCreature = Moralis.Object.extend("Monster");
    const query= new Moralis.Query(MonsterCreature);
    query.equalTo("name","centl");
    const monsters= await query.find();
    alert("Successfully retrieved " + monsters.length + " monsters.");
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < monsters.length; i++) {
    const object = monsters[i];
    console.log(object.id + ' - Name ' + object.get('name') +' - Health '+ object.get('health') +' - Strength '+ object.get('strength'));
    }
}

//relaional Queries 
getbuddy = async () =>{
    const hum = Moralis.Object.extend("Human");
    const query1= new Moralis.Query(hum);
    const query2= new Moralis.Query(hum);
    query2.equalTo("Name","saad");
    query1.matchesQuery("buddy",query2);
  //  query1.include("buddy");
    const monsters= await query1.find();
    alert("Successfully retrieved " + monsters.length + " buddies.");
    for (let i = 0; i < monsters.length; i++) {
        const object = monsters[i];
        console.log(object.id + ' - Name: ' + object.get('Name'));
        }

}


//Compound (or) 
getperfectmatch= async () => {
    const MonsterCreature = Moralis.Object.extend("Monster");
    const query= new Moralis.Query(MonsterCreature);
    query.greaterThanOrEqualTo("health", 92);

    const query2= new Moralis.Query(MonsterCreature);
    query2.greaterThanOrEqualTo("strength", 90);

    const MainQuery= Moralis.Query.or(query,query2)

    const monsters= await MainQuery.find();
    alert("Successfully retrieved " + monsters.length + " monsters.");
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < monsters.length; i++) {
    const object = monsters[i];
    console.log(object.id + ' - Name ' + object.get('name') +' - Health '+ object.get('health') +' - Strength '+ object.get('strength'));
    }
 
}

//Compound (and) 
getaperfectmatch= async () => {
    const strength66Query = new Moralis.Query("Monster");
    strength66Query.equalTo("strength", 66);
    
    const strength54Query = new Moralis.Query("Monster");
    strength54Query.equalTo("strength", 66);
    
    const health32Query = new Moralis.Query("Monster");
    health32Query.equalTo("health", 32);
    
    const health70Query = new Moralis.Query("Monster");
    health70Query.greaterThan("health", 70);
    
    const mainQuery = Moralis.Query.and(
      Moralis.Query.or(strength66Query, strength54Query),
      Moralis.Query.or(health32Query, health70Query)
    );
    const monsters= await mainQuery.find();
    alert("Successfully retrieved " + monsters.length + " monsters.");
    // Do something with the returned Moralis.Object values
    for (let i = 0; i < monsters.length; i++) {
    const object = monsters[i];
    console.log(object.id + ' - Name ' + object.get('name') +' - Health '+ object.get('health') +' - Strength '+ object.get('strength'));
    }
 
}




document.getElementById("getall").onclick=getAllMonsters;
document.getElementById("gr").onclick=getGr;
document.getElementById("ge").onclick=getGe;
document.getElementById("le").onclick=getle;
document.getElementById("gem").onclick=getEliteMonsters;
document.getElementById("gam").onclick=getAscMonsters;
document.getElementById("gtm").onclick=getTenMonsters;
document.getElementById("gcm").onclick=getCentlMonsters;
document.getElementById("gb").onclick=getbuddy; //relational
document.getElementById("gpm").onclick=getperfectmatch;
document.getElementById("gapm").onclick=getaperfectmatch;


