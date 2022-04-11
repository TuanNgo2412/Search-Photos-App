const $ = document.querySelector.bind(document);
const clientId = 'SQt_5WRrkxVTF64nvVF-_ojPIbrE4KvTVojZybUNl4c';
const formElement = $('.form-search');
const photosWrapper = $('.wrapper');
const title = $('.title');
const message = $('.message');
let page = 1;

const app = {
    // Function for loading progress when user access website or search photos
    loadingBar() {
        let i = 0;
        if (i === 0) {
            i = 1;
            let percent = $('.bar');
            let width = 1;
            let run = setInterval(loadPercent, 10);
            function loadPercent() {
                if (width >= 100) {
                    clearInterval(run);
                    i = 0;
                } else {
                    width++;
                    percent.style.width = width + '%';
                }
            }
        }
    },
    // Function for handle the api and load photos
    handleAPI(data) {
        const arrayImage = [];
        data.forEach(photo => {
            arrayImage[photo] = document.createElement('img');
            arrayImage[photo].className = 'img';
            arrayImage[photo].src = `${photo.urls.regular}`;
            photosWrapper.appendChild(arrayImage[photo]);
        })
    },
    // Load the initial list photos when access page
    getPhotos() {
        const getAPI = 'https://api.unsplash.com/photos?client_id=' 
        + clientId + '&page=' + page + '&per_page=10';
        
        this.loadingBar();
        fetch(getAPI)
                .then(res => res.json())
                .then(data => {
                    this.handleAPI(data);
                })
    },
    removePhotos() {
        photosWrapper.innerHTML = '';
    },
    // Get value from input and reload the photos
    searchPhotos() {
        // let page = 1000;
        const query = $('#search').value;   
        const searchAPI = 'https://api.unsplash.com/search/photos/?client_id=' 
        + clientId + '&query=' + query + '&page=' + page + '&per_page=10';
        
        this.loadingBar();
        this.removePhotos();
        fetch(searchAPI)
                .then(res => res.json())
                .then(data => {
                    let newData = data.results;
                    title.innerHTML = query;
                    this.handleAPI(newData);                  
                })
    },
    handleLoadMorePhotos() {
        window.addEventListener('scroll', () => {
            let page = 1; // E đặt biến ở đây để khi scroll sẽ không thay đổi giá trị mặc định của page khi search và load ảnh 
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
                page++;
                this.getPhotos();
            }
        })
    },
    start() {
        this.getPhotos(); 

        this.handleLoadMorePhotos();
    }
}

app.start();
