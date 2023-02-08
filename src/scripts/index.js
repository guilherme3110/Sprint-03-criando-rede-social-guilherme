import { posts, suggestUsers, users } from "./database.js";

function renderPosts(){
    const secaoCard = document.querySelector('.list__container')
    for( let i = 0; i < posts.length; i++) {
        const cardLi = document.createElement('li')
        const img = document.createElement('img')
        const h2 = document.createElement('h2')
        const p = document.createElement('p')
        const pTitle = document.createElement('p')
        const pText = document.createElement('p')
        const btn = document.createElement('button')
        const btnImage = document.createElement('button')

        pTitle.innerText = posts[i].title
        pText.innerText = posts[i].text
        cardLi.id = posts[i].id_post


        img.src = posts[i].img
        h2.classList.add = 'usuarios'
        h2.innerText = posts[i].user
        p.classList.add = posts[i].stack
        p.innerText = posts[i].stack
        btn.addEventListener('click', () => createModal(users[i], posts[i]))
        btnImage.innerText = ''

        cardLi.append(img, h2, p, pTitle, pText, btn)
        secaoCard.appendChild(cardLi)

    };
}
renderPosts(posts)

function renderSuggestUsers(){
    const secaoAside = document.querySelector('.aside__suggestUsers')
     for(let i = 0 ; i < suggestUsers.length; i++){
        const cardLi = document.createElement('li')
        const h2 = document.createElement('h2')
        const p = document.createElement('p')
        const img = document.createElement('img')

        h2.innerText = suggestUsers.user
        p.innerText = suggestUsers.stack
        img.src = suggestUsers.img

        cardLi.append(img, h2, p)
        secaoAside.appendChild(cardLi)

    };
}
renderSuggestUsers(suggestUsers)

 function renderUser(){
    const sectionPrimary = document.querySelector('.user__config')
    for (let index = 0; index < users.length; index++) {
        
        
        
    }
 }