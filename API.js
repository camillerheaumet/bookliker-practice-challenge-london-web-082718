class API{
    static getBooks(){
        return fetch('http://localhost:3000/books')
            .then(respond => respond.json())
    }

    static updateUsersLikes(book, user) {
        return fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({users: user})
        }).then(response => response.json())
    }
}