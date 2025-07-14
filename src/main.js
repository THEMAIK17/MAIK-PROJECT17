import { router } from "./router";
//para que las direccionales nos permitan avanzar y retroceder en la pagina
window.addEventListener(`popstate`,router);
//para que se renderize el contenido dinamico la primera vez
window.addEventListener(`load`,router)


document.addEventListener('click', function(event){
    if(event.target.matches(`[data-link]`)){
        event.preventDefault();
        history.pushState(null,null, event.target.href);
        router();
    }
})


