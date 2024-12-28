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

            // Adicionar evento de clique no botão de favorito
            $('.fav-btn', clonecard).on('click', function(e) {
                e.preventDefault();
                var icon = $(this).find('i');
                var pais = {
                    titulo: $(this).closest('.card').find('h2').text(),
                    imagem: $(this).closest('.card').find('.card-image').attr('src')
                };

                if (icon.hasClass('text-warning')) {
                    removeFavoritos(pais);
                    icon.removeClass('text-warning');
                } else {
                    addFavoritos(pais);
                    icon.addClass('text-warning');
                }
            });

            $('.lista-paises').append(clonecard);
        });

    }).fail(function (error) {
        console.error('Erro ao procurar os dados na API:', error);
    });
});

function addFavoritos(cardPaises) {
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    // Verificar se o país já existe nos favoritos
    if (!favoritos.some(fav => fav.titulo === cardPaises.titulo)) {
        favoritos.push(cardPaises);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
}

function removeFavoritos(cardPaises) {
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    favoritos = favoritos.filter(function (item) {
        return item.titulo !== cardPaises.titulo;
    });
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}
