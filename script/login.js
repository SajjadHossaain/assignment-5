const signBtn = document.getElementById("btn-sign");
// console.log(signBtn)
signBtn.addEventListener("click",()=>{
    const userInput = document.getElementById("user-name");
    const userName = userInput.value.split(" ").join("");

    const pinInpur = document.getElementById("user-pin");
    const userPin = pinInpur.value;
    // console.log(userPin)
    if(userName == "admin" && userPin == "admin123"){
        alert("Login Successful");
        window.location.assign("/home.html");
    }
    else{
        alert("Login Failed");
        return; 
    }
})