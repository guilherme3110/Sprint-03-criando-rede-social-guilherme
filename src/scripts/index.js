import {users, posts, suggestUsers} from "./database.js";


function renderPost(posts) {
    const ulPosts = document.querySelector(`.ul-posts`);
    ulPosts.innerHTML = ``;

    posts.forEach((post) => {
        const createdPost = createPost(post);
        ulPosts.appendChild(createdPost);
    })
}

function createPost(posts) {
    const listPost = document.createElement(`li`);
    listPost.classList.add(`list-post`);

    const divUser = document.createElement(`div`);
    const divDescriptionUser = document.createElement(`div`);
    const postImg = document.createElement(`img`);
    const userName = document.createElement(`h2`);
    const userDescription = document.createElement(`span`);
    const titleMain = document.createElement(`h1`);
    const subtitle = document.createElement(`span`);

    const divbuttonHeart = document.createElement(`div`);
    const openButton = document.createElement(`button`);
    const like = document.createElement(`span`);
    const heart = document.createElement(`span`);

    divUser.classList.add(`divider-icon-user`);
    divDescriptionUser.classList.add(`divider-user-desc`);

    postImg.src = posts.img;
    postImg.alt = posts.user;

    userName.innerText = posts.user;

    userDescription.innerText = posts.stack;
    userDescription.classList.add(`user-desc-span`);

    titleMain.innerText = posts.title;

    if (posts.text.length > 184) {
        subtitle.innerText = posts.text.slice(0, 182) + `...`;
    } else {
        subtitle.innerText = posts.text.slice(0, 184);
    }
    subtitle.classList.add(`subtitle`);

    divbuttonHeart.classList.add(`divider-button-heart`);
    openButton.innerText = `Abrir Post`;
    openButton.classList.add(`open-post-button`);
    openButton.dataset.postId = posts.id;

    like.innerHTML = `&#10084;`;
    like.classList.add(`like-heart`);
    heart.innerText = posts.likes;
    heart.classList.add(`heart-count`);

    const modal = createModal(posts);

    listPost.append(divUser, titleMain, subtitle, divbuttonHeart, modal);

    divUser.append(postImg, divDescriptionUser);
    divDescriptionUser.append(userName, userDescription);
    divbuttonHeart.append(openButton, like, heart);

    openButton.addEventListener(`click`, () => {
        modal.showModal();
    })

    let version = false
    like.addEventListener(`click`, () => {
        if (version == false) {
            heart.innerHTML = `${Number(posts.likes) + 1}`;
            like.classList.add(`liked-button`);
            like.classList.remove(`like-heart`);

        } else {
            heart.innerHTML = posts.likes;
            like.classList.remove(`liked-button`);
            like.classList.add(`like-heart`);
        }
        version = !version;
    })

    return listPost;
}

function renderSuggestion(suggestions) {
    const asideSuggestion = document.querySelector(`.div-aside`);

    suggestions.forEach((suggestion) => {
        const userSuggestion = createSuggestions(suggestion);
        asideSuggestion.appendChild(userSuggestion);
    })
}

function createSuggestions(suggestion) {
    const listSuggestion = document.createElement(`li`);

    const divUserButton = document.createElement(`div`);
    divUserButton.classList.add(`divider-user-button`);

    const divIconUser = document.createElement(`div`);
    divIconUser.classList.add(`divider-icon-user`);

    const divUserAndDesc = document.createElement(`div`);
    divUserAndDesc.classList.add(`divider-user-desc`);

    const suggestionImg = document.createElement(`img`);
    suggestionImg.src = suggestion.img;
    suggestionImg.alt = suggestion.user;

    const followBtn = document.createElement(`button`);
    followBtn.innerHTML = `Seguir`;
    followBtn.classList.add(`follow-button`);

    const suggestedUser = document.createElement(`h2`);
    suggestedUser.innerText = suggestion.user;

    const suggestedDesc = document.createElement(`span`);
    suggestedDesc.innerText = suggestion.stack;
    suggestedDesc.classList.add(`user-desc-span`);

    divUserButton.append(divIconUser, followBtn);
    divIconUser.append(suggestionImg, divUserAndDesc);
    divUserAndDesc.append(suggestedUser, suggestedDesc);

    listSuggestion.appendChild(divUserButton);

    let version = false;
    followBtn.addEventListener(`click`, () => {
        if (version == false) {
            followBtn.innerText = `Seguindo`;
            followBtn.classList.add(`followed`);
            followBtn.classList.remove(`follow-button`);
        } else {
            followBtn.innerText = `Seguir`;
            followBtn.classList.remove(`followed`);
            followBtn.classList.add(`follow-button`);
        }
        version = !version;
    });

    return listSuggestion;
}

function renderUserPost(users) {
    const userPost = document.querySelector(`.user-post`);

    const divUser = document.createElement(`div`);
    divUser.classList.add(`divider-icon-user`);

    const divUserAndDesc = document.createElement(`div`);
    divUserAndDesc.classList.add(`divider-user-desc`);

    const postUser = document.createElement(`h2`);
    postUser.innerText = users[0].user;

    const postDes = document.createElement(`span`);
    postDes.innerText = users[0].stack;
    postDes.classList.add(`user-desc-span`);

    const userImg = document.createElement(`img`);
    userImg.src = users[0].img;
    userImg.alt = users[0].user;

    const titleArea = document.createElement(`input`);
    titleArea.setAttribute(`type`, `text`);
    titleArea.classList.add(`title-area`);
    titleArea.placeholder = `Digite seu título aqui.`;

    const postArea = document.createElement(`textarea`);
    postArea.classList.add(`post-area`);
    postArea.placeholder = `Digite seu texto aqui.`;


    const postButton = document.createElement(`button`);
    postButton.innerText = `Postar`;
    postButton.classList.add(`post-button`);

    postButton.addEventListener(`click`, () => {
        const titleValue = document.querySelector(`.title-area`).value;
        const postValue = document.querySelector(`.post-area`).value;
        let count = 0;

        if (titleValue == [] || postValue == []) {
            alert(`Insira um texto válido.`)

        } else {
            posts.unshift({
                id: 0,
                title: titleValue,
                text: postValue,
                user: users[0].user,
                stack: users[0].stack,
                img: users[0].img,
                likes: 0
            })
            
            posts.forEach(post => {
                post.id = count++;
            });
            console.log(posts)
            renderPost(posts);
        } 

        const inputs = document.querySelectorAll(`.title-area, .post-area`)
        inputs.forEach(input => {
            input.value = ``;
        })
    })

    userPost.append(divUser, titleArea, postArea, postButton);
    divUser.append(userImg, divUserAndDesc);
    divUserAndDesc.append(postUser, postDes);
}

function createModal(posts) {
    const modal = document.createElement(`dialog`);
    modal.classList.add(`modal`);
    const divModal = document.createElement(`div`);
    divModal.classList.add(`div-modal`);
    
    const divUser = document.createElement(`div`);
    const divDescriptionUser = document.createElement(`div`);
    const userImg = document.createElement(`img`);
    const userName = document.createElement(`h2`);
    const userDescription = document.createElement(`span`);
    const titleMain = document.createElement(`h1`);
    const subtitle = document.createElement(`span`);
    const buttonCloseModal = document.createElement(`div`);
    const spanX = document.createElement(`span`);

    divUser.classList.add(`divider-icon-user`);
    divDescriptionUser.classList.add(`divider-user-desc`);

    userImg.src = posts.img;
    userImg.alt = posts.user;

    userName.innerText = posts.user;

    userDescription.innerText = posts.stack;
    userDescription.classList.add(`user-desc-span`);

    titleMain.innerText = posts.title;
    titleMain.classList.add(`h1-modal`);

    subtitle.innerText = posts.text;
    subtitle.classList.add(`span-modal`);

    buttonCloseModal.classList.add(`button-close`);
    spanX.innerText = `X`;
    spanX.classList.add(`span-close`);

    modal.appendChild(divModal);
    divModal.append(divUser, titleMain, subtitle, buttonCloseModal);
    buttonCloseModal.appendChild(spanX);
    divUser.append(userImg, divDescriptionUser);
    divDescriptionUser.append(userName, userDescription);

    buttonCloseModal.addEventListener(`click`, () => {
        modal.close();
    })
    return modal;
}




renderPost(posts);

renderSuggestion(suggestUsers);

renderUserPost(users);