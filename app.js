// search input
let searchParam = location.search.split('=').pop()

// api access
const access_key = '_-eRk_XK6c8tJdAoEa6EcnKHPAYzz5P963sOadbWiWU';

// how we get random photo url
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=50`;

// get output from search
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=20`;

// select gallery class
const gallery = document.querySelector('.gallery');


let currentImage = 0;

let allImages = []; // This will store all images


//arrow function fetch url
const getImages = () => {
    fetch(random_photo_url)
        .then(res => res.json())//parse the response body as JSON
        .then(data => {
            // to display the data
            // console.log(data);
            allImages = data;
            displayImages(allImages);
        })
}

// same as getImages just we get the search result
const searchImages = () => {
    fetch(search_photo_url)
        .then(res => res.json())
        .then(data => {
            allImages = data.results;
            displayImages(allImages);
        })
}

const displayImages = (data) => {
    // Code to display images in the gallery
    // Example: You can loop through allImages and create HTML elements to display images
    // console.log(data);
    data.forEach((item ,index) => {
        console.log(item);

        // create image element
        let img = document.createElement('img');

        img.src = item.urls.regular;
        img.className = 'gallery-img';

        gallery.appendChild(img);

        img.addEventListener('click' ,() =>{
            currentImage = index;
            showPopup(item);
        })
    })
}

const showPopup = (item) =>{
    let popup = document.querySelector('.image-popup');
    const downloadBtn = document.querySelector('.download-btn');
    const closeBtn = document.querySelector('.close-btn');
    const image = document.querySelector('.large-img');
    
    popup.classList.remove('hide');
    downloadBtn.href = item.links.html;
    image.src = item.urls.regular;

    closeBtn.addEventListener('click' , () =>{
        popup.classList.add('hide');
    })
}

if(searchParam == ''){
    getImages(); 
}else{
    searchImages();
}

const preBtns = document.querySelector('.pre-btn');
const nxtBtns = document.querySelector('.nxt-btn'); 

preBtns.addEventListener('click',()=>{
    if(currentImage>0){
        currentImage--;
        showPopup(allImages[currentImage]);
    }
})
nxtBtns.addEventListener('click',() =>{
    if(currentImage<allImages.length - 1){
        currentImage++;
        showPopup(allImages[currentImage]);

    }
})



c

// the fetch take two then block