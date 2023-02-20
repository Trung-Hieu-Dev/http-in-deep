const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");


function sendHttpRequest (method, url, data) {  
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
    
        xhr.open(method, url);
        
        //define type data to get
        xhr.responseType = 'json';
        
        //parse json data
        xhr.onload = function () { 
            //handling error for the server
            if(xhr.status >= 200 && xhr.status <= 300) {
                resolve(xhr.response);
            } else {
                reject(new Error('Something went wrong !'));
            }
        }

        // handling error for bad internet connection
        xhr.onerror = function () {  
            reject(new Error('Something fail !'));
        }
        
        xhr.send(JSON.stringify(data));
    });
    return promise;
}

async function fetchPosts() {
    try { // handling error
        const responseData = await sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/pos');
    
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
        alert((error)); //error out put
    }
        
}

async function createPost(title, content) {
    const userId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: userId
    }
    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
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



