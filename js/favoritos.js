$(document).ready(function () {
    var CloneOriginalCard = $('.card.d-none').clone().removeClass('d-none');
    $('.lista-paises').html('');

    // Carrega os favoritos do localStorage
    var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    // Verifica se existem favoritos
    if (favoritos.length === 0) {
        $('.lista-paises').html('<div class="text-center w-100"><h3>Nenhum país favorito adicionado ainda</h3></div>');
    } else {
        //mostra se houverem cards já selecionados como favoritos
        favoritos.forEach(function (pais) {
            var clonecard = CloneOriginalCard.clone();
            
            // Atualiza os atributos do card
            $('.card-image', clonecard).attr('src', pais.imagem);
            $('.card-info h2', clonecard).text(pais.titulo);

            // Direciona para a página de detalhes
            $('a:first', clonecard).attr('href', `detalhesPaises.html?name=${encodeURIComponent(pais.titulo)}`);

            // Marca o icon como favorito
            $('.fav-btn i', clonecard).addClass('text-warning');

            // Adiciona evento de clique no botão de favoritos
            $('.fav-btn', clonecard).on('click', function (e) {
                e.preventDefault(); // Impede o comportamento padrão
                e.stopPropagation(); // Evita redirecionar para a página dos detalhes

                removeFavoritos(pais);
                clonecard.remove();
                
                // Verifica se a lista ficou vazia após remover
                if ($('.lista-paises .card').length === 0) {
                    $('.lista-paises').html('<div class="text-center w-100"><h3>Nenhum país favorito adicionado ainda</h3></div>');
                }
            });

            // Adiciona o card à lista
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
