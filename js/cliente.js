document.addEventListener("DOMContentLoaded", function () {
    // Obtener el contenedor de juegos
    const gamesContainer = document.getElementById("gamesContainer");

    // Cargar el archivo JSON de juegos
    fetch('juegos.json')  // Ajusta la ruta aquí
        .then(response => response.json())
        .then(juegosDeMesa => {
            // Iterar sobre los juegos y agregar al contenedor
            juegosDeMesa.forEach(juego => {
                const juegoHTML = `
                    <div class="col-md-3">
                        <div class="modal-container">
                            <img src="${juego.img}" alt="${juego.titulo}">
                            <h2>${juego.titulo}</h2>
                            <p class="price">${juego.precio}</p>
                            <button class="btn btn-primary btn-modal" data-toggle="modal" data-target="#gameModal1">Comprar</button>
                        </div>
                    </div>
                `;

                gamesContainer.innerHTML += juegoHTML;
            });
        })
        .catch(error => console.error('Error cargando el archivo JSON:', error));
});