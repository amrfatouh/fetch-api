let pageContainer = document.querySelector('.page-container');
let postsContainer = document.querySelector('.posts-container');

let postsUrl = 'https://jsonplaceholder.typicode.com/posts';
let usersUrl = 'https://jsonplaceholder.typicode.com/users';
let commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

// viewMainPage();

function viewMainPage() {
    pageContainer.innerHTML = `
    <h1>Posts</h1>
    <div class="posts-container"></div>
    `;
    postsContainer = document.querySelector('.posts-container');
    fetch(postsUrl)
        .then(res => res.json())
        .then(posts => {
            fetch(usersUrl).then(res => res.json())
                .then(users => {
                    posts.forEach(post => {
                        let postAuthor = users.find(user => user.id === post.userId)
                        //create the post
                        let postDiv = document.createElement('div');
                        postDiv.className = 'post';
                        postDiv.onclick = viewPost;
                        postDiv.innerHTML = `
                        <div class="post-header">
                            <img src="http://placehold.it/50"">
                            <span>${postAuthor.name}</span>
                        </div>
                        <h2 class='post-title'>${post.title}</h2>
                        <div class="post-body">${post.body}</div>`;
                        postsContainer.appendChild(postDiv);
                    });
                })
        });
}

function viewPost() {
    console.log('view post')
}