let postsContainer = document.querySelector('.posts-container');

let postsUrl = 'https://jsonplaceholder.typicode.com/posts';
let usersUrl = 'https://jsonplaceholder.typicode.com/users';
let commentsUrl = 'https://jsonplaceholder.typicode.com/comments';


fetch(postsUrl + '/1')
    .then(res => res.json())
    .then(post => {
        fetch(usersUrl).then(res => res.json())
            .then(users => {
                let postAuthor = users.find(user => user.id === post.userId)
                //create the post
                let postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.innerHTML = `
                    <div class="post-header">
                        <img src="http://placehold.it/50"">
                        <span>${postAuthor.name}</span>
                    </div>
                    <h2 class='post-title'>${post.title}</h2>
                    <div class="post-body">${post.body}</div>`;
                postsContainer.appendChild(postDiv);
            })
    })