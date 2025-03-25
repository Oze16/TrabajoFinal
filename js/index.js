
  
    // Elementos del ZOOM
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalCaption = document.getElementById("modal-caption");
    const closeBtn = document.getElementsByClassName("close")[0];

    // Agregar el evento click a cada imagen con la clase "zoomable"
    document.querySelectorAll(".zoomable").forEach(img => {
      img.addEventListener("click", function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        modalCaption.textContent = this.alt;
      });
    });

    // Evento para cerrar el ZOOM al hacer click en la "X"
    closeBtn.onclick = function() {
      modal.style.display = "none";
    }

    // Cierra el zoom si se hace click fuera de la imagen ampliada
    modal.addEventListener("click", function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });



    //noticias json
    function cargarNoticias() {
      fetch('./data/noticias.json')
        .then(response => response.json())
        .then(data => {
          const contenedor = document.getElementById('news-container');
          data.noticias.forEach((noticia, indice) => {
            // Crear la tarjeta de noticia
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('card');
    
            // Agregar evento click para abrir la noticia externa
            tarjeta.addEventListener('click', () => {
              window.open(noticia.url, '_blank');
            });
    
            //  imagen
            const imagen = document.createElement('img');
            imagen.src = noticia.imagen;
            imagen.alt = noticia.titulo;
    
            //  título
            const titulo = document.createElement('h3');
            titulo.textContent = noticia.titulo;
    
            //  descripción
            const descripcion = document.createElement('p');
            descripcion.textContent = noticia.descripcion;
    
            //  estructura de la tarjeta
            tarjeta.appendChild(imagen);
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(descripcion);
    
            // Agregar la tarjeta al contenedor
            contenedor.appendChild(tarjeta);
    
            // Animación escalonada de aparición
            setTimeout(() => {
              tarjeta.classList.add('show');
            }, 100 * indice);
          });
        })
        .catch(error => {
          console.error('Error al cargar el archivo JSON:', error);
        });
    }
    
    cargarNoticias();
    






