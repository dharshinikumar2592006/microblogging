```javascript
// =====================================
// ACCOUNTS
// =====================================

let accounts = {

    Dharshini: {
        followers: [],
        following: []
    },

    Rahul: {
        followers: [],
        following: []
    },

    Priya: {
        followers: [],
        following: []
    },

    Arun: {
        followers: [],
        following: []
    }

};


// =====================================
// POSTS
// =====================================

let posts = [];


// Current account

let currentUser = "Dharshini";


// =====================================
// CHANGE ACCOUNT
// =====================================

function changeAccount() {

    currentUser =
        document.getElementById("accountSelect").value;

    showEverything();

}


// =====================================
// CREATE POST
// =====================================

function createPost() {

    let box =
        document.getElementById("postContent");

    let text =
        box.value.trim();


    if (text === "") {

        alert("Please write something!");

        return;

    }


    // Create new post

    let newPost = {

        id: Date.now(),

        username: currentUser,

        text: text,

        likes: [],

        time: new Date().toLocaleString()

    };


    // Add post to beginning

    posts.unshift(newPost);


    // Clear textbox

    box.value = "";


    // SHOW POST IMMEDIATELY

    displayPosts();

}


// =====================================
// FOLLOW
// =====================================

function follow(user) {

    if (user === currentUser) {

        return;

    }


    if (
        !accounts[currentUser].following.includes(user)
    ) {

        accounts[currentUser].following.push(user);

        accounts[user].followers.push(currentUser);

    }


    showEverything();

}


// =====================================
// UNFOLLOW
// =====================================

function unfollow(user) {

    let following =
        accounts[currentUser].following;


    let index =
        following.indexOf(user);


    if (index !== -1) {

        following.splice(index, 1);

    }


    let followers =
        accounts[user].followers;


    let followerIndex =
        followers.indexOf(currentUser);


    if (followerIndex !== -1) {

        followers.splice(followerIndex, 1);

    }


    showEverything();

}


// =====================================
// LIKE
// =====================================

function likePost(id) {

    let post =
        posts.find(function(p) {

            return p.id === id;

        });


    if (!post) {

        return;

    }


    let index =
        post.likes.indexOf(currentUser);


    // If not liked

    if (index === -1) {

        post.likes.push(currentUser);

    }

    // If already liked

    else {

        post.likes.splice(index, 1);

    }


    displayPosts();

}


// =====================================
// DELETE
// =====================================

function deletePost(id) {

    let post =
        posts.find(function(p) {

            return p.id === id;

        });


    if (!post) {

        return;

    }


    if (post.username !== currentUser) {

        alert("You can delete only your own post!");

        return;

    }


    posts =
        posts.filter(function(p) {

            return p.id !== id;

        });


    displayPosts();

}


// =====================================
// DISPLAY PROFILE
// =====================================

function displayProfile() {

    let account =
        accounts[currentUser];


    document.getElementById("profile").innerHTML = `

        <div class="profile-name">
            👤 ${currentUser}
        </div>

        <div class="stats">

            <div class="stat">
                <strong>
                    ${account.followers.length}
                </strong>

                <br>

                Followers
            </div>


            <div class="stat">
                <strong>
                    ${account.following.length}
                </strong>

                <br>

                Following
            </div>

        </div>

    `;

}


// =====================================
// DISPLAY CONNECTIONS
// =====================================

function displayConnections() {

    let followerBox =
        document.getElementById("followers");

    let followingBox =
        document.getElementById("following");


    // FOLLOWERS

    if (
        accounts[currentUser].followers.length === 0
    ) {

        followerBox.innerHTML =
            "<p>No followers yet</p>";

    }

    else {

        followerBox.innerHTML = "";


        accounts[currentUser].followers.forEach(
            function(user) {

                followerBox.innerHTML += `

                    <div class="connection">
                        👤 ${user}
                    </div>

                `;

            }
        );

    }


    // FOLLOWING

    if (
        accounts[currentUser].following.length === 0
    ) {

        followingBox.innerHTML =
            "<p>Not following anyone</p>";

    }

    else {

        followingBox.innerHTML = "";


        accounts[currentUser].following.forEach(
            function(user) {

                followingBox.innerHTML += `

                    <div class="connection">
                        👤 ${user}
                    </div>

                `;

            }
        );

    }

}


// =====================================
// DISPLAY PEOPLE
// =====================================

function displayPeople() {

    let box =
        document.getElementById("peopleList");


    box.innerHTML = "";


    Object.keys(accounts).forEach(
        function(user) {

            if (user === currentUser) {

                return;

            }


            let isFollowing =
                accounts[currentUser]
                    .following
                    .includes(user);


            box.innerHTML += `

                <div class="person">

                    <span>
                        👤 ${user}
                    </span>


                    ${
                        isFollowing

                        ?

                        `
                        <button
                            class="unfollow"
                            onclick="unfollow('${user}')">

                            Following

                        </button>
                        `

                        :

                        `
                        <button
                            onclick="follow('${user}')">

                            Follow

                        </button>
                        `
                    }

                </div>

            `;

        }
    );

}


// =====================================
// DISPLAY POSTS
// =====================================

function displayPosts() {

    let box =
        document.getElementById("posts");


    box.innerHTML = "";


    // People current user follows

    let following =
        accounts[currentUser].following;


    /*
        SHOW:
        - Own posts
        - Posts from followed users
    */

    let visiblePosts =
        posts.filter(function(post) {

            return (
                post.username === currentUser ||

                following.includes(post.username)
            );

        });


    // No posts

    if (visiblePosts.length === 0) {

        box.innerHTML = `

            <div class="post">

                <p>
                    📝 No posts yet.
                </p>

                <p>
                    Create a post or follow someone
                    to see their posts.
                </p>

            </div>

        `;

        return;

    }


    // SHOW POSTS

    visiblePosts.forEach(
        function(post) {

            let liked =
                post.likes.includes(currentUser);


            let ownPost =
                post.username === currentUser;


            box.innerHTML += `

                <div class="post">

                    <div class="post-user">

                        👤 ${post.username}

                    </div>


                    <div class="post-text">

                        ${post.text}

                    </div>


                    <div class="post-time">

                        ${post.time}

                    </div>


                    <div class="actions">


                        <!-- LIKE BUTTON -->

                        <button
                            class="like"
                            onclick="likePost(${post.id})">

                            ${
                                liked
                                ? "💔 Unlike"
                                : "❤️ Like"
                            }

                            ${post.likes.length}

                        </button>


                        ${
                            ownPost

                            ?

                            `
                            <button
                                class="delete"
                                onclick="deletePost(${post.id})">

                                🗑️ Delete

                            </button>
                            `

                            :

                            ""

                        }

                    </div>

                </div>

            `;

        }
    );

}


// =====================================
// SHOW EVERYTHING
// =====================================

function showEverything() {

    displayProfile();

    displayConnections();

    displayPeople();

    displayPosts();

}


// =====================================
// START
// =====================================

showEverything();
```
