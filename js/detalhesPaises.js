$(card.d-none).on('click',function () {
    var CloneOriginalTable = $(".table.table-bordered").clone().removeClass("table-bordered");

    $(".tabela-detalhes").html("");
    $(".img-flag").html(""); 

    $.ajax({
        method: "GET",
        url: "https://restcountries.com/v3.1/all",
    })
    .done(function (dados) {
        for (var i = 0; i < dados.length; i++) {
            var clonetable = CloneOriginalTable.clone();

            // Preenchendo os dados do país
            $(".img-flag", clonetable).attr("src", dados[i].flags.png);
            $(".country-name", clonetable).text(dados[i].name.common);
            $(".country-capital", clonetable).text(dados[i].capital ? dados[i].capital[0] : "N/A");
            $(".country-population", clonetable).text(dados[i].population.toLocaleString());
            $(".country-area", clonetable).text(dados[i].area.toLocaleString());
            $(".country-language", clonetable).text(dados[i].language.toLocaleString());
            $(".country-currency", clonetable).text(dados[i].currency.toLocaleString());

            $(".tabela-detalhes").append(clonetable);
        }
    })
    .fail(function (error) {
        console.error("Erro ao procurar os dados na API:", error);
    });
});
