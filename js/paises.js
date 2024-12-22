$(document).ready(function () {

    var CloneOriginalCard = $('.card.d-none').clone().removeClass('d-none');

    $('.lista-paises').html('');

    $.ajax({
        method: "GET",
        url: "https://restcountries.com/v3.1/all",
    }).done(function (dados) {

        for (var i = 0; i < dados.length; i++) {
            var clonecard = CloneOriginalCard.clone(); 

            $('.card-image', clonecard).attr('src', dados[i].flags.png);
            $('.card-info h2', clonecard).text(dados[i].name.common);

            $('.lista-paises').append(clonecard);
        }
    }).fail(function (error) {
        console.error('Erro ao procurar os dados na API:', error);
    });
});
