import { posts, users } from "./database";

function renderUser(users, posts){
    const secaoCard = document.querySelector('.list__container')
    array.forEach((users, posts) => {
        let cardLi = document.createElement('li')
        const img = document.createElement('img')
        const h2 = document.createElement('h2')
        const p = document.createElement('p')
        const pTitle = document.createElement('p')
        const pText = document.createElement('p')
        const btn = document.createElement('button')
        const btnImage = document.createElement('button')

        pTitle.innerText = posts[i].title
        pText.innerText = posts[i].text
        carLi.id = posts[i].id_post


        img.src = users[img]
        h2.classList.add = 'usuarios'
        h2.innerText = users[i].user
        p.classList.add = users[i].stack
        p.innerText = users[i].stack
        btn.addEventListener('click', () => createModal(users[i], posts[i]))
        btnImage.innerText = 

        cardLi.append(img, h2, p, pTitle, pText, btn)
        secaoCard.appendChild(cardLi)

    });
}

renderUser(users, posts)