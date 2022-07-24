//REQUEST API INFO\\
async function start(){
   const res = await fetch('https://dog.ceo/api/breeds/list/all')
   const data = await res.json();
   createBreedList(data.message);
    console.log(res);
}
start();

document.addEventListener('load', loadRandomImage)
//RANDOM DOG IMAGE WHEN PAGE IS LOADED\\
async function loadRandomImage(images){
    const res = fetch('https://dog.ceo/api/breeds/image/random');
    const data = document.getElementById('slideshow').innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${images[0]}" class="card-img-top" alt="dog image">
        </div>
    `
}

//CREATES FUNCTIONAL DROPDOWN FOR BREED SEARCH\\
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

//LOADS BREED OF DOG CHOSEN\\
async function loadByBreed(breed){
    if (breed !== 'Choose a dog breed'){
        const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await res.json();
        createDogImage(data.message);
    }
}

//CREATES DOG IMAGE OUTPUT\\
function createDogImage(images){

    if (images.length > 1){
        document.getElementById('slideshow').innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${images[0]}" class="card-img-top" alt="dog image">
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${images[1]}" class="card-img-top" alt="dog image">
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${images[2]}" class="card-img-top" alt="dog image">
    </div>
    `

    }else {
        document.getElementById('slideshow').innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${images[0]}" class="card-img-top" alt="dog image">
    </div>
    `
    }

    document.getElementById('slideshow').innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${images[0]}" class="card-img-top" alt="dog image">
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${images[1]}" class="card-img-top" alt="dog image">
    </div>
    <div class="card" style="width: 18rem;">
        <img src="${images[2]}" class="card-img-top" alt="dog image">
    </div>
    `
}