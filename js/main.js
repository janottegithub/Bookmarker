window.addEventListener('load', fetchBookmarks());

var myForm = document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){ 
var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteUrl').value;
var comments = document.getElementById('comments').value;

if(!validateForm(siteName, siteUrl)){
 return false; 
}


var bookmark = {
    name: siteName,
    url: siteUrl,
    comments: comments
}

/*
console.log(bookmarks);
localStorage.setItem('test', 'helloWorld!');
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
console.log(localStorage.getItem('test'));
*/

if(localStorage.getItem('bookmarks') === null){
var bookmarks = [];
bookmarks.push(bookmark);
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}else{
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
bookmarks.push(bookmark);
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
//clear the form
document.getElementById('myForm').reset();
//reFetch bookmarks
fetchBookmarks();
//prevent from submitting
e.preventDefault();
}

//delete bookmark
function deleteBookmark(url){
 //get bookmarks from local storage
 var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 // loop true the bookmarks
 for (var i=0 ; i < bookmarks.length; i++){
     if(bookmarks[i].url == url){
    //remove from array
     bookmarks.splice(i, 1);
    }
  }
  //reset localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 

  //refetch bookmarks
  fetchBookmarks();
}



function fetchBookmarks(){
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
   var bookmarksResults = document.getElementById('bookmarksResults');
   bookmarksResults.innerHTML = "";

   for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url  = bookmarks[i].url;
    var comments = bookmarks[i].comments;

    bookmarksResults.innerHTML   +='<div  class="col-md-3 m-1">'
                                 +'<h2>'+name
                                 +'<div class="svgIconsTop">'
                                        +'<a class="btn btn-default" target="blank" href="'+url+'">Visit</a> '
                                        +'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"><img id="cross" class="svg" src="images/times-solid.svg" alt="times-solid.svg"></a>'
                                    +'</div>'    
                                 +'</h2>'
                                 +'<p>'+comments+'</p>'
                                    +'<div class="svgIcons">'
                                        +'<img class="svg" src="images/bell-regular.svg"  alt="bell-regular">'
                                        +'<img class="svg" src="images/palette-solid.svg"  alt="palette-solid">'
                                        +'<img class="svg" src="images/ellipsis-v-solid.svg" alt="ellipsis-v-solid">'
                                    +'</div>'
                                 +'</div>'
   }
}

//validation of the Url
function validateForm(siteName, siteUrl){

var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
var regex = new RegExp(expression);

if(!siteUrl.match(regex)){
    alert('please use a valid url');
    return false; 
 }

 return  true;
}