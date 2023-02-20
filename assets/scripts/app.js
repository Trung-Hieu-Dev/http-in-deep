const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

//define type data to get
xhr.responseType = 'Json';

//parse json data
xhr.onload = function () {  
    const listOfPosts = xhr.response;
    console.log(listOfPosts);
}

xhr.send();