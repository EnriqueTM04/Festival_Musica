document.addEventListener('DOMContentLoaded', function() {

    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
}) 

function navegacionFija() {
    const header = document.querySelector('header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        }

        else {
            header.classList.remove('fixed');
        }
    })
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    const CANTIDAD_IMAGENES = 16;

    for(let i=1; i<=CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG');

        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = `Imagen Galeria`;

        // Event Handler
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {

    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = `Imagen Galeria`;

    // Generar modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;    //sin funtion porque no toma parametros

    // Boton cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    // Agregar a HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');  //se agrego el compotamiento en globales.scss
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    setTimeout(() => {
        modal?.remove();

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);
}

function resaltarEnlace() {
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');

        let actual = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop; //distancia de cada section con el principio del body
            const sectionHeigh = section.clientHeight;  //cuantos pixeles mide ese section

            if(window.scrollY >= (sectionTop - sectionHeigh / 3)) {
                actual = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active');
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'});
        })
    });
}