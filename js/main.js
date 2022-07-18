let timer
let deleteFirstPhotoDelay

async function start(){
   const res = await fetch('https://dog.ceo/api/breeds/list/all')
   const data = await res.json();
   createBreedList(data.message);
}

start();

function createBreedList(breedList){
    document.getElementById('breed').innerHTML = `
    <select onchange='loadByBreed(this.value)'>
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function (breed){
            return `<option>${breed}</option>`
    }).join('')}
    </select>
    `
}

async function loadByBreed(breed){
    if (breed !== 'Choose a dog breed'){
        const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await res.json();
        createSlideshow(data.message);
    }
}

function createSlideshow(images){
    let currentPosition = 0;
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

    if (images.length > 1){
        document.getElementById('slideshow').innerHTML = `
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="${images[0]}" class="d-block w-100" alt="Doggo Image">
            </div>
        </div>
    </div> 
    `
    currentPosition += 2
    if (images.length === 2) currentPosition = 0
    timer = setInterval(nextSlide, 3000)

    }else {
        document.getElementById('slideshow').innerHTML = `
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="${images[0]}" class="d-block w-100" alt="Doggo Image">
            </div>
        </div>
    </div> 
    `
    }

    document.getElementById('slideshow').innerHTML = `
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="${images[0]}" class="d-block w-100" alt="Doggo Image">
            </div>
        </div>
    </div> 
    `
    currentPosition += 2
    timer = setInterval(nextSlide, 3000)

    function nextSlide(){
        document.getElementById('slideshow').insertAdjacentHTML('beforeend', `<img src="${images[currentPosition]}" class="d-block w-100" alt="Doggo Image">`)
        deleteFirstPhotoDelay = setTimeout(function (){
            document.querySelector('.carousel-item active').remove()
        }, 1000)
    }
    if (currentPosition === 1 >= images.length){
        currentPosition = 0
    }else {
        currentPosition++
    }
}