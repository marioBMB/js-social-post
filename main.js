const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Sara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const postsContainer = document.getElementsByClassName("posts-list")[0];
const likeBtns = document.getElementsByClassName("like-button");
console.log(likeBtns);

renderPosts();


for(let i=0; i < likeBtns.length; i++){

    likeBtns[i].addEventListener("click", function(e){
        e.preventDefault();
        toggleLike(this);
    });
}


function toggleLike(element){

    const id = element.getAttribute("data-postid");
    const likeCounter = document.querySelector("#like-counter-"+id);
    let likes = likeCounter.textContent;
    element.classList.toggle("like-button--liked");

    element.classList.contains("like-button--liked")? likes++ : likes--;
    likeCounter.textContent = likes;
}





function renderPosts(){

    postsContainer.innerHTML = getPosts();
}

function getPosts(){

    let postsHTML = "";
    
    for (let i=0; i < posts.length; i++){

        const thisPostHTML = `
            <div class="post">
                <div class="post__header">
                    <div class="post-meta">                    
                        <div class="post-meta__icon">
                            <img class="profile-pic" src="${posts[i].author.image}" alt="${posts[i].author.name}">                    
                        </div>
                        <div class="post-meta__data">
                            <div class="post-meta__author">${posts[i].author.name}</div>
                            <div class="post-meta__time" tooltip-name="${formatDateStr(posts[i].created)}">${getTimeMeta(posts[i].created)}</div>
                        </div>                    
                    </div>
                </div>
                <div class="post__text">${posts[i].content}</div>
                <div class="post__image">
                    <img src="${posts[i].media}" alt="">
                </div>
                <div class="post__footer">
                    <div class="likes js-likes">
                        <div class="likes__cta">
                            <a class="like-button js-like-button" href="#" data-postid="${posts[i].id}">
                                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                <span class="like-button__label">Mi Piace</span>
                            </a>
                        </div>
                        <div class="likes__counter">
                            Piace a <b id="like-counter-${posts[i].id}" class="js-likes-counter">${posts[i].likes}</b> persone
                        </div>
                    </div> 
                </div>
            </div>`;
        
        postsHTML += thisPostHTML;
    }
    return postsHTML;
}

function formatDateObj(DateTime, langLocale = [], formatParamsObj){
    return DateTime.toLocaleDateString(langLocale, formatParamsObj);
}

function formatDateStr(dateTimeStr, langLocale = [], formatParamsObj){
    let DateTime = new Date(dateTimeStr);
    formatDateObj(DateTime, langLocale, formatParamsObj);
}

function getTimeMeta(dateTimeStr, langLocale='it-IT'){

    let Now = new Date();
    const DateTime = new Date(dateTimeStr);
    const diffMs = Now.getTime() - DateTime.getTime();
    let message = "";

    const msInADay = 1000 * 60 * 60 * 24;
    const msInAMonth = msInADay * 30;
    const msInAYear = msInADay * 365;

    const elapsedYears = Math.floor(diffMs / msInAYear);
    const elapsedMonths = Math.floor(diffMs / msInAMonth);
    const elapsedDays = Math.floor(diffMs / msInADay);

    if (elapsedYears > 0){
        
        message = elapsedYears;
        message += (elapsedYears == 1)? " anno" : " anni";
        message += " fa"; 
    }
    else {
        if (elapsedMonths > 0){

            message = elapsedMonths;
            message += (elapsedMonths == 1)? " mese" : " mesi";
            message += " fa"; 
        }
        else {
            
            if (elapsedDays == 0){
                message = "oggi, " + formatDateObj(DateTime, [], {hour: '2-digit', minute: '2-digit'});
            }
            if (elapsedDays == 1){
                message = "ieri, " + formatDateObj(DateTime, [], {hour: '2-digit', minute: '2-digit'});
            }
            else {
                const params = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'};
                message = formatDateObj(DateTime, [], params);
            }
        }
    }

    return message;
}
