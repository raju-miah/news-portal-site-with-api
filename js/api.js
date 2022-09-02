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
        <p class="p-3">${catagories.category_name}</p>
        `;
        catagorieContainer.appendChild(catagoriesDiv)
        console.log(catagories)
    });
}


loadCaragories();