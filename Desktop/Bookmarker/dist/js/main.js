//listen for submit
document.getElementById('myform').addEventListener('submit',saveBookmark);
//save Bookmark
function saveBookmark(e) {
	
	//get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}
	
	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	//Test if LocalStorage is null
	if(localStorage.getItem('bookmarks')===null){
		//init array
		var bookmarks = [];
		//Add to array
		bookmarks.push(bookmark);
		//Set to bookmark
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}else{
		//Get bookmarks from LocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Add Bookmarks to array
		bookmarks.push(bookmark);
		//Re-set to bookmark
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
	fetchBookmarks();

	//Form Clear
	document.getElementById('myform').reset();
	//console.log(bookmark);
//pevent form from submitting
	e.preventDefault();
}
//Delet Bookmarks
function deletBookmark(url){
	//Get Bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Loop through the bookmark
	for (var i = 0; i < bookmarks.length; i++){
		if (bookmarks[i].url==url) {
			bookmarks.splice(i, 1);
		}
	}
	//Re-set to bookmark
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

		fetchBookmarks();
}

function fetchBookmarks(){
	//Get Bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Get output Id
	var bookmarksResult = document.getElementById('bookmarksResult');

	//Build output
	bookmarksResult.innerHTML = '';
	for (var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResult.innerHTML += '<div class="well">'+
									'<h3>'+name+
									' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
									' <a onclick="deletBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delet</a> '+
									'</h3>'+
									'</div>';
	}
}

function validateForm(siteName,siteUrl) {
	if (!siteName || !siteUrl) {
		alert('Please fill the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if(!siteUrl.match(regex)){
		alert('Please Enter a Valid URL');
		return false;
	}
	return true;
}