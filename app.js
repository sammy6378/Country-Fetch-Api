
const dark = document.querySelector('.toggle img');

dark.addEventListener('click', () => {
    if(dark.src.includes('moon-regular-24.png')){
        dark.src = './images/sun-moon.svg';
        document.body.classList.add("light-mode");
    }else{
        dark.src = './images/moon-regular-24.png';
        document.body.classList.remove("light-mode");
    }
   
});

const gridDiv = document.querySelector('.grid-countries');
const country = document.querySelector('.country');
const name = document.querySelector('.data #countryName');
const pop = document.querySelector('.data #pop');
const region = document.querySelector('.data #reg');
const capital = document.querySelector('.data #cap');
const search = document.querySelector('.search-bar input');
const filter = document.querySelectorAll('.input-option select option');

const fetchData = () => {
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data =>{
        data.forEach(country => {
            const div = document.createElement('div');
            div.classList.add('country');

            const img = document.createElement('div');
            img.classList.add('img');
            img.innerHTML=  `<img src="${country.flags.png}" alt=""> `;
           
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
            gridDiv.appendChild(div);

            search.addEventListener('keypress', () =>{
                const value = search.value.toLowerCase();
                const countryName = country.name.common.toLowerCase();
                if(countryName.includes(value)){
                    div.style.display = 'block';
                }else{
                    div.style.display = 'none';
                }
            });

            filter.forEach(select =>{
            select.addEventListener('click', function(){
                if(select.innerHTML.toLocaleLowerCase().includes(country.name.common.toLowerCase())){
                    div.style.display = 'block';
                }else{
                    div.style.display = 'none';
                }
            })
        })

            });
            
        })
    }


fetchData();