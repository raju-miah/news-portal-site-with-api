const loadCaragories = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagories(data.data.news_category))
};

const displayCatagories = (catagorie) => {
  const catagorieContainer = document.getElementById('catagorie-container');
  catagorie.forEach(catagories => {
    const catagoriesDiv = document.createElement('div');
    catagoriesDiv.innerHTML = `
        <p onclick="loadNews(${catagories.category_id})" class="fw-bold p-3">${catagories.category_name}</p>
        `;
    catagorieContainer.appendChild(catagoriesDiv)
    // console.log(catagories)
  });
}

const loadNews = (idnum) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/0${idnum}`)
    .then(res => res.json())
    .then(data => displayNews(data.data))
}

const displayNews = (allnews) => {
  // console.log(allnews)
  const newsContainer = document.getElementById('news-container');
  allnews.forEach(news => {
    const newsDiv = document.createElement('div');
    // newsDiv.classList.add('row')
    newsDiv.innerHTML = `
       
        <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
            </div>
            <div class="col-md-9 d-flex align-items-center">
                <div class="card-body d-flex flex-column justify-content-around">
                    <h2 class="card-title mb-3">${news.title}</h2>
                    <p class="mb-3">${news.details.slice(0, 400)}...</p>
                    

                    <div class="d-flex justify-content-between">
                <p>${news.author.name ? news.author.name : 'Name not found'}</p>
                <p>Veiw: ${news.total_view}</p>
                <button onclick="loadNewsDeteils('${news.author.name}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetails">
                News Details
            </button>
            </div>
                        
                </div>
                
                
            </div>
           
        </div>
    </div>

    
        `;
    newsContainer.appendChild(newsDiv);
  })
}


loadCaragories();