let chatFriends = document.querySelectorAll('.friend');
let backHome = document.querySelectorAll('.backHome');

let home = document.querySelector('.home-phone');
let chat = document.querySelector('.chat-phone');

window.addEventListener('resize', e => {
    // console.log(e.currentTarget);
    document.querySelector('body').style.width = e.currentTarget.innerWidth + 'px';
    document.querySelector('body').style.height = e.currentTarget.innerHeight + 'px';
});

let xStart = 0;
chat.addEventListener('touchstart', 
(event) => 
{
    xStart = event.touches[0].clientX;
});  

chat.addEventListener('touchmove', 
(event) => 
{
    let x = event.touches[0].clientX;
    if (xStart <= 20) 
    {
        let diff = x - xStart;
        console.log('xStart : ', xStart);    
        
        if (diff > 0) 
        {
            console.log('diff : ', diff);    
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

    // friend.addEventListener('touchmove', 
    // (event) => 
    // {
    //     let x = event.touches[0].clientX;
    //     let diff = x - xStart;
    //     console.log('xStart : ', xStart);    
        
    //     if (diff < 0) 
    //     {
    //         console.log('diff : ', diff);    
    //     }
    // });
}

for (const back of backHome) 
{
    back.addEventListener('click', 
    (event) => 
    {
        event.target.closest('section').style.left = "100%";
    });    
}