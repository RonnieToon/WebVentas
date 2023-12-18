$(document).ready(init);

function init() {
    cargarDatos();

function cargarDatos() {
    $.ajax({
        url: 'json/juegos.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // juegos más vendidos
            var juegosMasVendidos = data.juegosDeMesa.filter(function(juego) {
                return juego.masvendidos === true;
            }).slice(0, 4);

            // juegos más vendidos en el contenedor correspondiente
            mostrarJuegos(juegosMasVendidos, '#gamesContainer');

            //  novedades
            var juegosNovedades = data.juegosDeMesa.filter(function(juego) {
                return juego.novedades === true;
            }).slice(0, 6); 

            // novedades en el carrusel
            mostrarCarrusel(juegosNovedades, '#gamesnovContainer');
        },
        error: function(xhr, status) {
            console.log('Disculpe, existió un problema');
        },
        complete: function(xhr, status) {
            console.log('Petición realizada');
        }
    });
}

function mostrarJuegos(juegos, containerId) {
    var gamesContainer = $(containerId);

    // crea dinámicamente los elementos
    $.each(juegos, function (index, juego) {
        // contenedor de juego
        var nuevoJuego = $('<div class="col-md-3">' +
            '<div class="modal-container">' +
            '<img src="' + juego.img + '" alt="' + juego.titulo + '">' +
            '<h3>' + juego.titulo + '</h3>' +
            '<p class="price">' + juego.precio + '</p>' +
            '<button class="btn btn-primary btn-modal" data-toggle="modal" data-target="#gameModal1">Comprar</button>' +
            '</div>' +
            '</div>');

        // añade el contenedor de juegos
        gamesContainer.append(nuevoJuego);
    });
}

function mostrarCarrusel(juegos, containerId) {
    var carruselContainer = $(containerId);

    // Crea  carrusel
    var carruselHTML = `
        <section>
            <div class="container">
                <div class="carousel">`;

    for (var i = 0; i < juegos.length; i++) {
        carruselHTML += `
                    <input type="radio" name="slides" ${i === 0 ? 'checked="checked"' : ''} id="slide-${i + 1}">
                    `;
    }

    carruselHTML += `
                    <ul class="carousel__slides">`;

    for (var i = 0; i < juegos.length; i++) {
        carruselHTML += `
                        <li class="carousel__slide">
                            <figure>
                                <div>
                                    <img class="imagencarrusel" src="${juegos[i].img}" alt="${juegos[i].titulo}">
                                </div>
                                <figcaption>
                                    ${juegos[i].descripcion}
                                    <span class="credit">${juegos[i].titulo}</span>
                                    <p class="price">${juegos[i].precio}</p>
                                    <button class="btn btn-primary btn-modal" data-toggle="modal" data-target="#gameModal1">Comprar</button>
                                </figcaption>
                            </figure>
                        </li>
                        `;
    }

    carruselHTML += `
                    </ul>
                    <ul class="carousel__thumbnails">`;

    for (var i = 0; i < juegos.length; i++) {
        carruselHTML += `
                        <li>
                            <label for="slide-${i + 1}"><img src="${juegos[i].img}" alt="${juegos[i].titulo}"></label>
                        </li>
                        `;
    }

    carruselHTML += `
                    </ul>
                </div>
            </div>
        </section>
    `;

    // Añade carrusel al contenedor
    carruselContainer.append(carruselHTML);
}
}