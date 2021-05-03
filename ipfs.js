Moralis.initialize("3ovMTV6aZewIwRAza4nV0dYV3aF2Ag1vwjO8ye6F"); // Application id from moralis.io
Moralis.serverURL = "https://xe9ldqq0tzst.moralis.io:2053/server"; //Server url from moralis.io

defineMonsterIpfs= async (name, health, strength) => {
    const MonsterCreature = Moralis.Object.extend("Monster");
    const monster = new MonsterCreature();
    monster.set("name", name);
    monster.set('health',health);
    monster.set('strength',strength);

    const metadata={
        name:name,
        health:health,
        strength:strength
    }
    
    const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await metadataFile.saveIPFS();
    monster.set('monster_ipfs_uri',metadataFile.ipfs())
    await monster.save();
    return monster; 
}