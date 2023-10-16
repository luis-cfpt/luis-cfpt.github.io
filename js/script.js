let chatFriends = document.querySelectorAll('.friend');
let backHome = document.querySelectorAll('.backHome');

let home = document.querySelector('.home-phone');
let chat = document.querySelector('.chat-phone');
let dragChat = document.querySelector('.text-chat');

window.addEventListener('resize', e => {
    // console.log(e.currentTarget);
    document.querySelector('body').style.width = e.currentTarget.innerWidth + 'px';
    document.querySelector('body').style.height = e.currentTarget.innerHeight + 'px';
});

let xStart = 0;
dragChat.addEventListener('touchstart', 
(event) => 
{
    xStart = event.touches[0].clientX;
});  

dragChat.addEventListener('touchmove', 
(event) => 
{
    let x = event.touches[0].clientX;
    if (xStart <= 20) 
    {
        let diff = x - xStart;
        console.log('xStart : ', xStart);    
        
        if (diff > 0) 
        {
            chat.style.transition = "";
            chat.style.left = diff + 'px';              
        }        
    }
});

dragChat.addEventListener('touchend', 
(event) => 
{
    console.log(event);
    xEnd = event.changedTouches[0].clientX;
    chat.style.transition = "left .1s linear";

    if (xStart <= 20) 
    {     
        
        if (xEnd < window.innerWidth / 2.5) 
        {
            chat.style.left = "0";
        }
        else 
        {
            chat.style.left = "100%";
        }                

        if (chat.style.left != "0" && chat.style.left != "100%") 
        {
            chat.style.left = "0";
        }
    }    

});  

for (const friend of chatFriends) 
{
    // let xStart = 0;
    friend.addEventListener('click', 
    (event) => 
    {
        // event.target.closest('section').style.left = "-100%";
        chat.style.left = "0";
    });   

    let xGoStart = 0;
    friend.addEventListener('touchstart', 
    (event) => 
    {
        xGoStart = event.touches[0].clientX;
    });  

    friend.addEventListener('touchmove', 
    (event) => 
    {
        let x = event.touches[0].clientX;
        if (xGoStart >= window.innerWidth - 50) 
        {
            let diff = x - xGoStart;   
            console.log(diff);
            
            if (diff < 0) 
            {
                chat.style.transition = "";
                chat.style.left = "calc(100% - " + Math.abs(diff) + 'px)';              
            }        
        }
    });

    friend.addEventListener('touchend', 
    (event) => 
    {
        xEnd = event.changedTouches[0].clientX;
        chat.style.transition = "left .1s linear";

        if (xGoStart >= window.innerWidth - 50) 
        {     
            
            if (xEnd <= window.innerWidth / 2) 
            {
                chat.style.left = "0";
            }
            else 
            {
                chat.style.left = "100%";
            }

            if (chat.style.left != "0" && chat.style.left != "100%") 
            {
                chat.style.left = "0";
            }
        }    

    }); 
}

for (const back of backHome) 
{
    back.addEventListener('click', 
    (event) => 
    {
        event.target.closest('section').style.left = "100%";
    });    
}