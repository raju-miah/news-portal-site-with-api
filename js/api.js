const loadCaragories = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagories(data.data.news_category))
    .catch(error => displayCatagories(error))
};

const displayCatagories = (catagorie) => {
  const catagorieContainer = document.getElementById('catagorie-container');
  catagorie.forEach(catagories => {
    const catagoriesDiv = document.createElement('div');
    catagoriesDiv.innerHTML = `
        <a onclick="loadNews('${catagories.category_id}')" class=" fw-bold p-3">${catagories.category_name}</a>
        `;
    catagorieContainer.appendChild(catagoriesDiv)
    // console.log(catagories)
  });
}

const loadNews = (idnum) => {
  // spinner here
  document.getElementById("spinner").style.display = "block";
  fetch(`https://openapi.programming-hero.com/api/news/category/${idnum}`)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    .catch(error => displayNews(error))
}

const displayNews = allnews => {
  // spinner here
  document.getElementById("spinner").style.display = "none";

  // SORT HERE
  allnews.sort((a, b) => b.total_view - a.total_view);
  if (allnews.length > 0) {
    const totallength = allnews.length;
    const inputFieldText = document.getElementById('input-id');
    inputFieldText.innerText = 'TOTAL' + ' ' + ' ' + totallength + ' ' + 'BREACKING';
  } else if (allnews.length <= 0) {

    const totallength = allnews.length;
    const inputFieldText = document.getElementById('input-id');
    inputFieldText.innerText = 'TOTAL ' + ' ' + totallength + ' BREACKING';


  }
  // console.log(allnews)
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = ''
  allnews.forEach(news => {
    // console.log(news)
    const newsDiv = document.createElement('div');

    newsDiv.innerHTML = `
       
        <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
            </div>
            <div class="col-md-9 d-flex align-items-center">
                <div class="card-body d-flex flex-column justify-content-around">
                    <h2 class="card-title mb-3">${news.title}</h2>
                    <p class="mb-3">${news.details.slice(0, 400) + '....'}</p>
                    <div class="d-flex justify-content-between">
                <p class="fw-bold">${news.author.name ? news.author.name : 'Name not found'}</p>
                <p class="fw-bold">View: ${news.total_view ? news.total_view : 'NO Views'} M</p>
                <button type="button" onclick="modalDetailsNews('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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

loadNews('02');
loadCaragories();


const modalDetailsNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => modalDetailsNewsDisplay(data))
    .catch(error => modalDetailsNewsDisplay(error))

}


const modalDetailsNewsDisplay = modalNews => {

  // console.log(modalNews)

  const modal = document.getElementById('exampleModalLabel');
  modal.innerHTML = ''

  try {
    const creatediv = document.createElement('div');

    creatediv.innerHTML = `
    <div class="row">
      <div class="col-lg-12">
        <img class="w-100"  src="${modalNews.data[0].image_url}" alt="" >
        <h3 class="card-text my-3">${modalNews.data[0].title}</h3>
        <p>${modalNews.data[0].details.slice(0, 250) + ' ' + '.....'}</p>
                                         
        <div class= "d-flex align-items-center justify-content-center ">
          <div class = "mx-auto">
          <p class = ' '>${modalNews.data[0].author.name ? modalNews.data[0].author.name : 'No author Name found'}</p>
          </div>
            </div>
         <div class="col-md-3 d-flex ">
        <h5 class='mx-2 class= "py-2"' ><i class="fa-regular fa-eye"></i></h5>
        <h5 > ${modalNews.data[0].total_view ? modalNews.data[0].total_view : 'No view yet'} M</h5>
        </div>
      </div>
    </div>
 `;
    modal.appendChild(creatediv);

  } catch (err) {
    // console.log(err)
  }




}


modalDetailsNewsDisplay();
modalDetailsNews();