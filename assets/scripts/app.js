const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

//parse json data
xhr.onload = function () {  
    // console.log(xhr.response);

    //convert json to javascript
    const listOfPosts = JSON.parse(xhr.response);
    console.log(listOfPosts);
}

xhr.send();