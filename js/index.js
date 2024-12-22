$(document).ready(function () {

    var CloneOriginalCard = $('.card.d-none').clone().removeClass('d-none');

    $('.lista-paises').html('');

    $.ajax({
        method: "GET",
        url: "https://restcountries.com/v3.1/all",
    }).done(function (dados) {

        function getRandomItems(array, count) {
            const shuffled = array.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count); 
        }

        const randomCountries = getRandomItems(dados, 3);

        randomCountries.forEach(function(country) {
            var clonecard = CloneOriginalCard.clone();

            $('.card-image', clonecard).attr('src', country.flags.png);
            $('.card-info h2', clonecard).text(country.name.common);

            $('.lista-paises').append(clonecard);
        });

    }).fail(function (error) {
        console.error('Erro ao procurar os dados na API:', error);
    });
});
