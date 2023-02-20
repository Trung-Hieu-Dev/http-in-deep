const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");


function sendHttpRequest (method, url, data) {  
        //using fetch API
    return fetch(url, {
        method: method,
        body: data
        // body: JSON.stringify(data),
        // headers: {
        //     'Content-Type': 'application/json'
        // }
    }).then(response => {
        if(response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return response.json().then(errorData => {
                throw Error('Something went wrong - Server side!');
            })
        }
    }).catch(error => {
        console.log(error);
        throw new Error('Something went wrong !');
    });
}

async function fetchPosts() {
    try {
        const responseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts');
    
        const listOfPosts = responseData;

        //render list of posts by using template
        for (const post of listOfPosts) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            listElement.append(postEl);
        }
    } catch (error) {
        alert(error);
    }  
        
}

async function createPost(title, content) {
    const userId = Math.random();
    // const post = {
    //     title: title,
    //     body: content,
    //     userId: userId
    // }

    const formData = new FormData(form);
    // formData.append('title', title);
    // formData.append('body', content);
    formData.append('userId', userId);

    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', formData);
}

fetchButton.addEventListener('click', fetchPosts);

form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector("#title").value;
    const enteredContent = event.currentTarget.querySelector("#content").value;
    createPost(enteredTitle, enteredContent);
})

listElement.addEventListener('click', event => {
    if(event.target.tagName == 'BUTTON') {
        const postId = event.target.closest('li').id;
        sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);
    }
})



