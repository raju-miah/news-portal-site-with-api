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
        <p onclick="loadNews(${catagories.category_id})" class="p-3">${catagories.category_name}</p>
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
        newsDiv.classList.add('row')
        newsDiv.innerHTML = `
       

        <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
        `;
        newsContainer.appendChild(newsDiv);
    })
}


loadCaragories();