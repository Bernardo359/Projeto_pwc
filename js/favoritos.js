$(document).ready(function () {
    var CloneOriginalCard = $('.card.d-none').clone().removeClass('d-none');
    $('.lista-paises').html('');

    // Carregar os favoritos do localStorage
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    // Verificar se existem favoritos
    if (favoritos.length === 0) {

        $('.lista-paises').html('<div class="text-center w-100"><h3>Nenhum país favorito adicionado ainda</h3></div>');
    } else {
        // Se houverem favoritos, mostra os cards
        favoritos.forEach(function(pais) {
            var clonecard = CloneOriginalCard.clone();
            
            $('.card-image', clonecard).attr('src', pais.imagem);
            $('.card-info h2', clonecard).text(pais.titulo);
            $('.fav-btn i', clonecard).addClass('text-warning');
            
            // Adiciona onClick no botão de favoritos
            $('.fav-btn', clonecard).on('click', function(e) {
                e.preventDefault();
                removeFavoritos(pais);
                clonecard.remove();
                
                // Verifica se a lista ficou vazia após remover
                if ($('.lista-paises .card').length === 0) {
                    $('.lista-paises').html('<div class="text-center w-100"><h3>Nenhum país favorito adicionado ainda</h3></div>');
                }
            });

            $('.lista-paises').append(clonecard);
        });
    }
});

function removeFavoritos(cardPaises) {
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    favoritos = favoritos.filter(function (item) {
        return item.titulo !== cardPaises.titulo;
    });
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}