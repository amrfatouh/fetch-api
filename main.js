let pageContainer = document.querySelector('.page-container');
let postsContainer = document.querySelector('.posts-container');

let postsUrl = 'https://jsonplaceholder.typicode.com/posts';
let usersUrl = 'https://jsonplaceholder.typicode.com/users';
let commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

viewMainPage();

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
                        let postDiv = createPost(post, postAuthor);
                        postsContainer.appendChild(postDiv);
                    });
                })
        });
}

function viewPost() {
    pageContainer.innerHTML = `
        <h1>Post Details</h1>
        <div class="back-btn">&lt;</div>
        `;
    document.querySelector('.back-btn').onclick = viewMainPage;
    fetch(postsUrl).then(res => res.json()).then(posts => {
        let post = posts.find(p => p.id === Number(this.dataset.postId))
        fetch(usersUrl).then(res => res.json()).then(users => {
            let postAuthor = users.find(user => user.id === post.userId);
            fetch(commentsUrl).then(res => res.json()).then(comments => {
                let commentsArr = comments.filter(c => c.postId === post.id);
                let postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.innerHTML = `
                    <div class="post-header">
                        <img src="http://placehold.it/50">
                        <span>${postAuthor.name}</span>
                    </div>
                    <h2 class='post-title'>${post.title}</h2>
                    <div class="post-body">${post.body}</div>
                    <hr>
                `;
                //adding comments to post
                let commentsContainer = document.createElement('div');
                commentsContainer.className = 'comments';
                commentsContainer.innerHTML = `<h3>comments</h3>`;
                commentsArr.forEach(comment => {
                    let commentDiv = document.createElement('div');
                    commentDiv.className = 'comment';
                    commentDiv.innerHTML = `
                        <h4 class="comment-title">${comment.name}</h4>
                        <div class="comment-body">${comment.body}</div>
                    `;
                    commentsContainer.appendChild(commentDiv);
                });
                postDiv.appendChild(commentsContainer);

                pageContainer.appendChild(postDiv);
            })
        })
    })
}

function createPost(post, postAuthor) {
    //create the post
    let postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.onclick = viewPost;
    postDiv.style.cursor = 'pointer';
    postDiv.dataset.postId = post.id;
    postDiv.innerHTML = `
    <div class="post-header">
        <img src="http://placehold.it/50"">
        <span>${postAuthor.name}</span>
    </div>
    <h2 class='post-title'>${post.title}</h2>
    <div class="post-body">${post.body}</div>`;
    return postDiv;
}