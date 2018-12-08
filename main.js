'use stirct';

// Save Bookmark to Local Storage
function saveBookmark(event) {
  // Get form values
  var siteName = document.querySelector('.input__name').value;
  var siteUrl = document.querySelector('.input__adress').value;

  if (!siteName || !siteUrl) {
    alert('Please fill the form!');
    return false;
  }

  var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  // var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL!');
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  // Local storage
  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  fetchBookmark();

  event.preventDefault();
};

// Delete Bookmark
function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmark();
};

// Create and Fetch Bookmark 
function fetchBookmark() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookList = document.querySelector('.bookmark__list');

  bookList.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) { 
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookList.innerHTML += '<div class="bookmark__item">' +
                          '<h4 class="bookmark__name">' + name + '</h4>' +
                          '<a class="btn btn__visit" href="'+ url +'" target="_blank">' + 'Visit' + '</a>' +
                          '<a onclick = "deleteBookmark(\''+ url + '\')" class="btn btn__delete" href="#">' + 'delete' + '</a>' +
                          '</div>';
  }
};


document.querySelector('.bookmark__form').addEventListener('submit', saveBookmark);