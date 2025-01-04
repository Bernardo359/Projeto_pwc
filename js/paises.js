$(document).ready(function () {
    var CloneOriginalCard = $('.card.d-none').clone().removeClass('d-none'); //Dá clone ao card do html
    $('.lista-paises').html(''); //Apaga o card do html

    $.ajax({
        method: "GET",
        url: "https://restcountries.com/v3.1/all",
    }).done(function (dados) {
        for (var i = 0; i < dados.length; i++) {
            var clonecard = CloneOriginalCard.clone();

            var nomept = dados[i].translations?.por?.common; //Meter todos os nomes dos paises em PT
            
            var cardPaises = {
                'titulo': dados[i].name.common, //
                'imagem': dados[i].flags.png,
            };
            
            $('a:first', clonecard).attr('href', `detalhesPaises.html?name=${encodeURIComponent(dados[i].name.common)}`); //direciona para detalhes
            $('.card-image', clonecard).attr('src', dados[i].flags.png); 
            $('.card-info h2', clonecard).text(nomept);

            // Verificar se o país já está nos favoritos
            var favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
            var isFavorito = favoritos.some(fav => fav.titulo === cardPaises.titulo);
            
            if (isFavorito) {
                $('.fav-btn i', clonecard).addClass('text-warning');
            }

            // Modificar o evento de clique do botão favorito para evitar redirecionamento
            $('.fav-btn', clonecard).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Impede que o clique se propague para a página detalhes
                
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
        }
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
    
    favoritos = favoritos.filter(function (pais) {
        return pais.titulo !== cardPaises.titulo;
    });
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}