/**
 * Description: Pays du monde entiers
 * Author: LuisDS
 * Version: V1, 25.09.2023
 * File: js/main.js
 */

if ("serviceWorker" in navigator)
{
    window.addEventListener("load", () => {
	navigator.serviceWorker.register("/sw.js");
    })
}

let listAllCountries = [];

/**
 * Afficher tous les pays récupérés dans le LocalStorage ou l'API selon le contenu du LocalStorage et de la date de derniere récupération depuis l'API
 */
function showCountries() 
{
    if (getFromLocalCounties() == null || (new Date(timePassedFromAddCountries()).getMonth() >= 1)) 
    {
        getCountriesFromAPI()
        .then(countries => 
        {
            listAllCountries = countries;

            addLocalCounties();

            listAllCountries = getFromLocalCounties();
            
            /// Affiche les pays dans le HTML
            for (const country of listAllCountries) 
            {            
                document.querySelector('tbody').innerHTML += `<tr class='country-list ${country.translations.fra.common}'><td width="200px">${country.translations.fra.common}</td><td><img src="${country.flags.svg}" width="100px"></td><td width="200px" style="text-align: center;">${country.population}</td></tr>`;
            }            
    
        })
        .catch(err => 
        {
            throw new Error(err);
        });        
    }
    else
    {
        listAllCountries = getFromLocalCounties();

        /// Affiche les pays dans le HTML
        for (const country of listAllCountries) 
        {            
            document.querySelector('tbody').innerHTML += `<tr class='country-list ${country.translations.fra.common}'><td width="200px">${country.translations.fra.common}</td><td><img src="${country.flags.svg}" width="100px"></td><td width="200px" style="text-align: center;">${country.population}</td></tr>`;
        }
    }
}

/**
 * Récupère tous les pays depuis l'api
 * @returns countriesObj - Object de tous les pays
 */
async function getCountriesFromAPI() 
{
    const response = await fetch('https://restcountries.com/v3.1/all');

    if (response.ok) 
    {
        const countriesText = await response.text()
        try {
            const countriesObj  = JSON.parse(countriesText);
            return countriesObj
        }
        catch(err) {
            return err;
        }
    }
    else 
    {
        const errText = await response.text()
        throw new Error(errText);
    }
}

/**
 * Ajout les pays en les classant par ordre alphabétique dans le LocalStorage
 */
function addLocalCounties()
{
    listAllCountries.sort((a, b) => {
        let fa = a.translations.fra.common.toLowerCase(),
            fb = b.translations.fra.common.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });  

    localStorage.setItem('countries', JSON.stringify(listAllCountries));
    localStorage.setItem('timeAddCountries', Date.now())
}

/**
 * Récupère tous les pays situés dans le LocalStorage 
 * @returns Object of all countries
 */
function getFromLocalCounties()
{
    return JSON.parse(localStorage.getItem('countries'));
}

function timePassedFromAddCountries()
{
    return Date.now() - localStorage.getItem('timeAddCountries');
}

showCountries();
