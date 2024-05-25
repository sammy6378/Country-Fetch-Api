
const dark = document.querySelector('.toggle img');

dark.addEventListener('click', () => {
    if (dark.src.includes('moon-regular-24.png')) {
        dark.src = './images/sun-moon.svg';
        document.body.classList.add("light-mode");
    } else {
        dark.src = './images/moon-regular-24.png';
        document.body.classList.remove("light-mode");
    }
});

const gridDiv = document.querySelector('.grid-countries');
const search = document.querySelector('.search-bar input');
const filter = document.querySelectorAll('.dropdown option');

let countriesData = []; // Store fetched data

const createCountryElement = (country) => {
    const div = document.createElement('div');
    div.classList.add('country');

    const img = document.createElement('div');
    img.classList.add('img');
    img.innerHTML = `<img src="${country.flags.png}" alt="">`;

    const data = document.createElement('div');
    data.classList.add('data');
    data.innerHTML = `
        <h3>${country.name.common}</h3>
        <p>Population: ${country.population}</p>
        <p>Region: ${country.region}</p>
        <p>Capital: ${country.capital}</p>
    `;

    div.appendChild(img);
    div.appendChild(data);
    
    div.addEventListener('click', () => showCountryDetails(country));

    return div;
};

const showCountryDetails = (country) => {
    const back = document.createElement('div');
    back.classList.add('back-div');
    back.innerHTML = `<button class="back">Back</button>`;

    const img = document.createElement('div');
    img.classList.add('img');
    img.innerHTML = `<img src="${country.flags.png}" alt="">`;

    const data = document.createElement('div');
    data.classList.add('data');
    data.innerHTML = `
        <h3>${country.name.common}</h3>
        <p>Population: ${country.population}</p>
        <p>Region: ${country.region}</p>
        <p>Sub Region: ${country.subregion}</p>
        <p>Capital: ${country.capital}</p>
        <p>Languages: ${Object.values(country.languages).join(', ')}</p>
        <p>Currencies: ${Object.values(country.currencies).map(c => c.name).join(', ')}</p>
        <h2>Border Countries:</h2>
        <div class="borders">
            ${(country.borders || []).map(border => `<p>${border}</p>`).join('')}
        </div>
    `;

    gridDiv.innerHTML = '';
    gridDiv.appendChild(back);
    gridDiv.appendChild(img);
    gridDiv.appendChild(data);
    gridDiv.classList.toggle('grid-1');

    document.querySelector('.back').addEventListener('click', () => {
        gridDiv.classList.remove('grid-1'); // Remove the grid-1 class
        gridDiv.innerHTML = ''; // Clear the gridDiv
        renderCountries(countriesData); // Render the data again
    });
};

const renderCountries = (data) => {
    gridDiv.innerHTML = ''; // Clear previous content
    data.forEach(country => {
        const countryElement = createCountryElement(country);
        gridDiv.appendChild(countryElement);
    });
};

const fetchData = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            countriesData = data;
            renderCountries(data);
        });
};

search.addEventListener('input', () => {
    const value = search.value.toLowerCase();
    const filteredData = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(value)
    );
    renderCountries(filteredData);
});

// filter.addEventListener('change', (e) => {
//     const value = e.target.value.toLowerCase();
//     if (value === '') {
//         renderCountries(countriesData);
//     } else {
//         const filteredData = countriesData.filter(country =>
//             country.region.toLowerCase().includes(value)
//         );
//         renderCountries(filteredData);
//     }
// });

fetchData();
