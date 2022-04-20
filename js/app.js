const $ = document.querySelector.bind(document);
const clientId = 'SQt_5WRrkxVTF64nvVF-_ojPIbrE4KvTVojZybUNl4c';
const html = $('html');
const formElement = $('.form-search');
const input = $('#search');
const searchButton = $('.search-button')
const message = $('.message');
const view = $('.view');
const title = $('.title');
const photosWrapper = $('.wrapper');
 

const app = {
    page: 1,
    isScroll: false,
    // Loading bar function when waiting call api
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
                    percent.style.width = 0;
                } else {
                    width++;
                    percent.style.width = width + '%';
                }
            }
        }
    },
    removeContent() {
        photosWrapper.innerHTML = '';
    },
    async renderPhotos() {
        let photos;
        // Statement for handle render photos when user access page or search keyword
        if ((this.searchPhotos())[0] !== '') {
            if (this.isScroll) {
                const data = await this.callSearchAPI();
                photos = data.results;
                title.innerHTML = (this.searchPhotos())[0];
            } else {
                this.removeContent();
                const data = await this.callSearchAPI();
                photos = data.results;
                title.innerHTML = (this.searchPhotos())[0];
                this.isScroll = true;
            }
        } else {
            if (this.isScroll) {
                photos = await this.callGetListAPI();
            } else {
                this.removeContent();
                title.innerHTML = '';
                photos = await this.callGetListAPI();
                this.isScroll = true;
            }
        }

        this.loadingBar();
        const arrayImage = [];
        photos.forEach(photo => {
            arrayImage[photo] = document.createElement('img');
            arrayImage[photo].className = 'img';
            arrayImage[photo].src = `${photo.urls.regular}`;
            photosWrapper.appendChild(arrayImage[photo]);
        })
    },
    // Function for call get list API
    async callGetListAPI() {
        const url = await this.getPhotos();

        const response = await fetch(url);
        const data = await response.json();
        return data;
    },
    // Function for call search API
    async callSearchAPI() {
        const url = await (this.searchPhotos())[1];

        const response = await fetch(url);
        const data = await response.json();
        return data;
    },
    // Function for transmission get list api 
    getPhotos() {
        const getAPI = `https://api.unsplash.com/photos?client_id=${clientId}&page=${this.page}&per_page=10`;

        return getAPI;
    },
    // Function for transmission search api
    searchPhotos() {
        const query = $('#search').value;
        const searchAPI = `https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query}&page=${this.page}&per_page=10`;
        
        return [query, searchAPI];
    },
    // Function for handle DOM events
    initEvents() {
        const _this = this;

        // Listen onkeyup event on search input
        input.onkeyup = (event) => {
           event.keyCode === 13 && _this.renderPhotos();
           _this.isScroll = false;
           _this.page = 1;
        }

        // Listen click on search button event
        searchButton.onclick = () => {
            _this.isScroll = false;
            _this.page = 1;
            _this.renderPhotos();
        }

        // Listen scroll view event
        window.onscroll = () => {
            let contentHeight = html.scrollHeight;
            let scrollHeight = window.scrollY;
            let viewHeight = window.innerHeight;

            if (viewHeight + scrollHeight >= contentHeight) {
                (_this.page)++;
                _this.renderPhotos();
            }
        }

    },
    start() {
        this.renderPhotos();

        this.initEvents();

    }
}

app.start();
