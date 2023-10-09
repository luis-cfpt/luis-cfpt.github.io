/**
 * Description: Pays du monde entiers
 */

if ("serviceWorker" in navigator)
{
    window.addEventListener("load", 
    () => {
	    navigator.serviceWorker.register("/sw.js");
    })
}

let listAllCountries = [];

/**
 * Afficher tous les pays récupérés dans le LocalStorage ou l'API selon le contenu du LocalStorage et de la date de derniere récupération depuis l'API
 * @returns {void}
 */
function showCountries() 
{
    if (!"cache" in localStorage || (new Date(timePassedFromAddCountries()).getMonth() >= 1)) 
    {
        getCountriesFromAPI()
        .then(countries => 
        {
            listAllCountries = countries;

            addLocalCounties(); 
            
            htmlCountries();
        })
        .catch(err => 
        {
            throw new Error(err);
        });        
    }
    else 
    {
        htmlCountries();
    }
}

/**
 * Affiche les pays dans le html
 * @returns {void}
 */
function htmlCountries()
{
    listAllCountries = getFromLocalCounties();

    for (const country of listAllCountries) 
    {            
        document.querySelector('tbody').innerHTML += `
            <tr class='country-list ${country.translations.fra.common}'>
                <td width="200px">${country.translations.fra.common}</td>
                <td><img src="${country.flags.svg}" width="100px"></td>
                <td width="200px" style="text-align: center;">${country.population}</td>
            </tr>`;
    }
}

/**
 * Récupère tous les pays depuis l'api
 * @returns {json} - Object de tous les pays
 */
async function getCountriesFromAPI() 
{
    const response = await fetch('https://restcountries.com/v3.1/all');

    if (response.ok) 
    {
        return await response.json();
    }
    else 
    {
        const errText = await response.text()
        throw new Error(errText);
    }
}

/**
 * Remove accents of strings
 * @param {String} a - words to remove accents
 * @returns {String} - words modified
 */
function strNoAccent(a) {
    let b="áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
        c="aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
        d="";

    for(let i = 0, j = a.length; i < j; i++) 
    {
      let e = a.substr(i, 1);
      d += (b.indexOf(e) !== -1) ? c.substr(b.indexOf(e), 1) : e;
    }

    return d;
  }

/**
 * Ajout les pays en les classant par ordre alphabétique dans le LocalStorage
 * @returns {void}
 */
function addLocalCounties()
{
    listAllCountries.sort((a, b) => {
        let fa = strNoAccent(a.translations.fra.common.toLowerCase()),
            fb = strNoAccent(b.translations.fra.common.toLowerCase());

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });  

    localStorage.setItem('cache', JSON.stringify(listAllCountries));
    localStorage.setItem('timeAddCountries', Date.now())
}

/**
 * Récupère tous les pays situés dans le LocalStorage 
 * @returns {json} Object of all countries
 */
function getFromLocalCounties()
{
    return JSON.parse(localStorage.getItem('cache'));
}

/**
 * Fait la difference entre la date présent avec la date de recupération des données
 * @returns {int} La différence entre l adate présent 
 */
function timePassedFromAddCountries()
{
    return Date.now() - localStorage.getItem('timeAddCountries');
}

showCountries();