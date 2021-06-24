var rootPath;

// get all posts when the page is loaded
function init(){
    //set root path
    rootPath = "https://mysite.itvarsity.org/api/mini-blog/";

    document.getElementById("getAll").addEventListener("click",getAllPosts);
    document.getElementById("getLatest").addEventListener("click",getLatestPosts);
    document.getElementById("getPopular").addEventListener("click",getPopularPosts);

    //call getAllPost function
    getAllPosts();
}

// function to get all posts from a server
function getAllPosts(){
  let category = "getAll";
 fetchPosts(category);
 setActiveLink(category);
}

// function to get latest posts from a server
function getLatestPosts(){
    let category = "getLatest";
    fetchPosts(category)
    setActiveLink(category);
}

// function to get popular posts from a server
function getPopularPosts(){
    let category = "getPopular";
    fetchPosts(category)
    setActiveLink(category)
}

// function to fetch all by category from a server
function fetchPosts(category){
    fetch(rootPath + 'get-posts/?category=' + category)
    .then( response =>{
        return response.json();
    })
    .then(data =>{
        displayPosts(data);
    })
}

// function to display selected posts to the browser
function displayPosts(data){
    var output = "";

    // loop through passed data
    for(let i = 0; i < data.length; i++){
        output += `
        <div class="card mb-4 box-shadow">
        <div class="card-header">
            <h4 class="my-0 font-weight-normal">${data[i][0]}</h4>
        </div>
        <div class="card-body">
            <img src="${rootPath}/uploads/${data[i][3]}" class="card-img-top" />
            <p class="card-text">${data[i][1]}</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                   <button type="button" class="btn btn-lg btn-link"><i class="far fa-heart"></i></button>
                   <button type="button" class="btn btn-lg btn-link"><i class="far fa-comment"></i></button>
                   <button type="button" class="btn btn-lg btn-link"><i class="fa fa-retweet"></i></button>
                </div>
                <small class="text-muted">${data[i][2]}</small>
            </div>
        </div>
        </div> 
             `;
    }
    document.getElementById("posts").innerHTML = output;
}

// function to set active link style
function setActiveLink(id){
    document.getElementById("getAll").classList.remove("active");
    document.getElementById("getLatest").classList.remove("active");
    document.getElementById("getPopular").classList.remove("active");

    document.getElementById(id).classList.add("active");
}
