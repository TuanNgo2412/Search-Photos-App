const $ = document.querySelector.bind(document);
const clientId = 'SQt_5WRrkxVTF64nvVF-_ojPIbrE4KvTVojZybUNl4c';
const formElement = $('.form-search');
const photosWrapper = $('.wrapper');
const title = $('.title');

// Get a list of photos -- Init data
function getPhotos() {
    const getAPI = 'https://api.unsplash.com/photos?page=1&client_id=' + clientId + '&per_page=30';

    return fetch(getAPI)
                .then(response => {
                    return response.json();
                })
                .then(data => {                   
                    const imageNode = [];
                    data.forEach(index => {
                        imageNode[index] = document.createElement('img');
                        imageNode[index].className = 'img'
                        imageNode[index].src = `${index.urls.regular}`;
                        photosWrapper.append(imageNode[index]);
                    })
                })   
}
getPhotos();

// Get input value and reload photos
function searchPhotos() {
    const query = $('#search').value;   
    const searchAPI = 'https://api.unsplash.com/search/photos/?client_id=' + clientId + '&query=' + query + '&per_page=30';

    function removePhotos() {
        photosWrapper.innerHTML = '';
    }

    fetch(searchAPI)
    .then(response => {
        return response.json();
    })
    .then(data => {
        removePhotos();
        title.innerHTML = query;
        const imageNode = [];
        data.results.forEach(index => {
            imageNode[index] = document.createElement('img');
            imageNode[index].className = 'img'
            imageNode[index].src = `${index.urls.regular}`;
            photosWrapper.append(imageNode[index]);
        })
    })
}

// Cancel the submit event of form
formElement.onsubmit = (event) => {
    event.preventDefault();
}






