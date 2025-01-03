// Primeiro, vamos pegar o ID ou nome do país da URL
function getCountryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('name'); // Assumindo que você passará o nome do país na URL como ?name=Brazil
}

// Quando a página carregar
$(document).ready(function() {
    const countryName = getCountryFromURL();
    if (countryName) {
        // Fazer a requisição para a API usando o nome do país
        $.ajax({
            method: "GET",
            url: `https://restcountries.com/v3.1/name/${countryName}`,
        })
        .done(function(data) {
            if (data && data.length > 0) {
                const country = data[0];
                
                // Atualizar a imagem da bandeira
                $(".img-flag").attr("src", country.flags.png);
                
                // Preencher os detalhes do país
                $("#country-name").text(country.name.common);
                $("#country-capital").text(country.capital ? country.capital[0] : "N/A");
                $("#country-population").text(country.population.toLocaleString());
                $("#country-area").text(country.area.toLocaleString());
                
                // Para idiomas
                const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
                $("#country-language").text(languages);
                
                // Para moedas
                const currencies = country.currencies ? 
                    Object.values(country.currencies)
                        .map(currency => `${currency.name} (${currency.symbol})`)
                        .join(", ") : "N/A";
                $("#country-currency").text(currencies);
            }
        })
        .fail(function(error) {
            console.error("Erro ao buscar dados do país:", error);
            alert("Não foi possível carregar os detalhes do país.");
        });
    } else {
        alert("País não especificado!");
    }
});