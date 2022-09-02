const loadCaragories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCatagories(data.data))
};

const displayCatagories = (cata) => {
    console.log(cata)
}

loadCaragories();