const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

//define type data to get
xhr.responseType = 'json';

//parse json data
xhr.onload = function () {  
    const listOfPosts = xhr.response;

    //render list of posts by using template
    for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        listElement.append(postEl);
    }
}

xhr.send();

