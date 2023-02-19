const popup = document.querySelector(".popup");
const wifiIcon = document.querySelector(".icon i");
const popupTitle = document.querySelector(".popup .title");
const popupDesc = document.querySelector(".desc");
const reconnectBtn = document.querySelector(".reconnect");
let isOnline = true , intervalId, timer = 10;

const checkConnection = async ()=>{
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        isOnline = response.status >=200 && response.status <300 ;
    }catch(error){
        isOnline = false; 
    }
    timer=10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

const handlePopup = (status) =>{
    if(status){     //online
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText= "Connection Restored";
        popupDesc.innerHTML = "Succesffully connected to network";
        popup.classList.add("online");
        return setTimeout(()=> popup.classList.remove("show"), 2000);
    }
    //offline
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText= "No internet connection";
    popupDesc.innerHTML = "Your network is unavailable. We'll attempt to reconnect you in <strong>10</strong> sec.";
    popup.classList="popup show";
    intervalId = setInterval(()=>{
        timer--;
        if(timer=== 0) checkConnection();
        popup.querySelector(".desc strong").innerText = timer;
    },1000);

    
}

// check connection status every 3 sec
setInterval(()=> isOnline && checkConnection() ,3000);
reconnectBtn.addEventListener("click", checkConnection);

