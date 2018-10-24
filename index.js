document.addEventListener("DOMContentLoaded", function() {
    const listUl = document.querySelector('#list')
    const affiche = document.querySelector('#show-panel')
    const currentUser = {"id": 1, "username": "pouros"}
    
    function showBooksList(books){
        books.forEach(book => {
            const bookLi = document.createElement('li')
            bookLi.innerHTML = book.title
            listUl.appendChild(bookLi)

            bookLi.addEventListener('click', event => {
                showBookDetails(book)
            })
        });
    }

    function showBookDetails(book){
        affiche.innerHTML = `
        <h1>${book.title}</h1>
        <p>${book.description}</p>
        <img src="${book.img_url}">
        <ul>
            ${
                book.users.map(user => `<li>${user.username}</li>`).join('')
            }
        </ul>
        <button class='like-butt'>Like</button>
        `
        // add like button
        // add event listener to like button
        const likeButt = document.querySelector('.like-butt')
        const chiffre = book.users.findIndex(user => user.id === currentUser.id)

        likeButt.addEventListener('click', event =>{
            if (chiffre<0){
                likeBook(book, likeButt)
                console.log(likeButt.innerText)
                const likeButton = document.querySelector('.like-butt')

                if (likeButton.innerText === 'Like') {
                    likeButton.innerText = 'Unlike'
                }
                
            } else if(chiffre>=0) {

            book.users.splice(chiffre, 1)
            API.updateUsersLikes(book, book.users)
            showBookDetails(book)
            }
        

        })
    }

    function likeBook(book, el) {
        // add currentUser to book.users
        book.users.push(currentUser)
        
        // send PATCH request with updated book
        API.updateUsersLikes(book, book.users)
        // then call showBookDetails again
        showBookDetails(book)


    }


    API.getBooks().then(books => showBooksList(books))
});
