fetch("/hw1/APIs/ipGeolocation.php").then(onResponse).then(onJson).catch(onError);

function onJson(json){
    console.log(json?.flag?.emoji);

    const userFlag = document.querySelector('.user-flag');
    if(json?.flag?.emoji){
        userFlag.textContent = json.flag.emoji;
        userFlag.classList.remove('hidden');
    }
}

function onError(params) {
    console.log('Error fetching data:', params);
    
}
