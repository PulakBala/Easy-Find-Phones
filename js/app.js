const loadPhones = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
   const res =  await fetch(url);
   const data = await res.json();
   displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    //display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else{
        showAll.classList.add('d-none');
    }
    
    //display no phone message
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0) {
        noPhone.classList.remove('d-none');
    } else{
        noPhone.classList.add('d-none');
    }

    //display ALL phones
    phones.forEach(element => {
       console.log(element)
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div class="card">
                <img class = "h-25" style = "width: 200px; margin: 0 auto" src=" ${element.image} " class="card-img-top" alt="...">
          <div class="card-body">
                <h5 class="card-title"> ${element.phone_name} </h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadShowDetails('${element.slug}')" href="#" class ="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>

          </div>
        </div>
        `;
        phoneContainer.appendChild(newDiv);

    });
    //stop spinner  loader
    toggleSpinner(false);
}
    const processSearch = (dataLimit) => {
        toggleSpinner(true);
        const searchField = document.getElementById('search-field');
        const searchText = searchField.value;
        loadPhones(searchText, dataLimit);
        // searchField.value = '';
    }

//handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    //start spinner loader
    processSearch(10)
})

//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter') {
        processSearch(10)
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loadder');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    } else{
        loaderSection.classList.add('d-none');
    }
}

//not the way to shwo all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const loadShowDetails = async id =>{
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhonesDetails(data.data);
}

const displayPhonesDetails = (details) =>{
    console.log(details);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = details.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML =`


      <img src="${details.image}" class="rounded mx-auto d-block"  >
 
      <hr>
      <h5>Release Date : ${details.releaseDate}</h5>
      <hr> 
      <h5>Release Date : ${details.mainFeatures.displaySize}</h5>
      <hr> 
      <h5>Storage : ${details.mainFeatures.storage}</h5>

      
   
    `;
}

// loadPhones('oppo');
//table niye kaj korte hobe
