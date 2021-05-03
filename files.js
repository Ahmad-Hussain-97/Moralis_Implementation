Moralis.initialize("3ovMTV6aZewIwRAza4nV0dYV3aF2Ag1vwjO8ye6F"); // Application id from moralis.io
Moralis.serverURL = "https://xe9ldqq0tzst.moralis.io:2053/server"; //Server url from moralis.io


defineMonster= async (name, health, strength) => {
    const MonsterCreature = Moralis.Object.extend("Monster");
    const monster = new MonsterCreature();
    monster.set("name", name);
    monster.set('health',health);
    monster.set('strength',strength);

    //-profile pic upload code not working
    // const fileUploadControl = document.getElementById("profilePhotoFileUpload");
    // if (fileUploadControl.files.length > 0) {
    //     const file = fileUploadControl.files[0];
    //     const name = "profilePicture.png";
    //     const profilePicture = new Moralis.File(name, file);
    //     monster.set("profile_picture",profilePicture);
    // }



    //Monster metadata wokring await defineMonster("Adhm",86,32)
    const metadata={
        name:name,
        ExtraInfo:"ahmad hussain here with metadata info in json file",
        Peekabu:"Ha hu"
    }
    //   monster.set("metadata",metadata);
    
    const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    monster.set("metadataFile", metadataFile);
    await monster.save();
    return monster;
}