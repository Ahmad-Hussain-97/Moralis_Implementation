Moralis.Cloud.define("getMonsters", async (request) => {
    const query = new Moralis.Query("Monster");
    const monsters =await query.find();
    return monsters;
  
  });


  Moralis.Cloud.define("getGreaterHealthMonsters", async (request) => {
    //const query = new Moralis.Query("Monster");
    //const monsters =await query.find();
    //return monsters;

    const query= new Moralis.Query("Monster");
    query.greaterThan("health", 80);
    const monsters= await query.find();
    return monsters;
  
  });