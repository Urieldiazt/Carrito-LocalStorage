

carritoCursosLinea();

function carritoCursosLinea(){

    //variables
    const listasCursos = document.querySelector('#lista-cursos');
    const tbody = document.querySelector('#lista-carrito');
    const listaCarrito = document.querySelector('#lista-carrito');
    const vaciarCarrito = document.querySelector('#vaciar-carrito');
    let carritoAtriculos = []

    //addevEntsListenners
    //Agregar Curso al carrito
    listasCursos.addEventListener('click', agregarCurso);
    //Eliminar curso del carrito
    listaCarrito.addEventListener('click', eliminarCurso);
    //Vaciar carrito
    vaciarCarrito.addEventListener('click',vaciarArticulos);
    //cuando el documento este listo    
    document.addEventListener('DOMContentLoaded', ()=>{
        carritoAtriculos = JSON.parse(localStorage.getItem('carritoCompras')) || [];
        mostraHTMl();
    });
    
    
    //function

    function agregarCurso(e){
        e.preventDefault();
        const agregando = e.target.classList.contains('agregar-carrito');
        if(agregando){
            //traversing the dom
            const curso = e.target.parentElement.parentElement;
            informacionCurso(curso);
        }
    }

    function eliminarCurso(e){
        e.preventDefault();
        //event bubbling
        const eliminar  = e.target.classList.contains('borrar-curso');
        if(eliminar){
            const id = e.target.getAttribute('data-id');
            const carrito = carritoAtriculos.filter(curso => curso.id !== id);
            carritoAtriculos = [...carrito];
            mostraHTMl();
        }
    }

   function vaciarArticulos(){
        carritoAtriculos = [];
        mostraHTMl();
   }

    function informacionCurso(curso){
        const infoCurso = {
            imagen : curso.querySelector('img').src,
            titulo : curso.querySelector('h4').textContent,
            precio : parseInt(curso.querySelector('.precio span').textContent),
            id : curso.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }

        //some true o false 
        const existe = carritoAtriculos.some(curso => curso.id === infoCurso.id);

        if(existe){
           const cursos = carritoAtriculos.map(curso =>{
                if(curso.id === infoCurso.id){
                    const precioCurso = 15;
                    curso.precio += precioCurso;
                    curso.cantidad++;
                    return curso;
                }else{
                    return curso;
                }
            });
            carritoAtriculos = [...cursos];
        }else{
            //spread Operator
            carritoAtriculos = [...carritoAtriculos, infoCurso];
        }

        mostraHTMl();
    }


    function mostraHTMl(){
        //LimpiarHTMl
        limpiarHTMl();

        //arrow function
        carritoAtriculos.forEach(articulo =>{
            //Destructuring
            const {imagen, titulo, precio,id, cantidad} = articulo;
            const curso = document.createElement('tr');
            //Template String
            curso.innerHTML = `
                <th> <img src="${imagen}" width="100"> </th>
                <th> ${titulo} </th>
                <th> $${precio} </th>
                <th> ${cantidad} </th>
                <th> <a href="#" class="borrar-curso" data-id="${id}" >X</a> </th>
            `;
            //Colocando cursos en el carrito
                 tbody.appendChild(curso);
        });
        //Sincronizar carrito compras Local Storage
        sincronizar();
    }

    //Limpiar HTML
    function limpiarHTMl(){
        //forma lenta
        while(tbody.firstChild){//Si tienes un hijo
            tbody.removeChild(tbody.firstChild);//remueve al hijo, el primer hijo
        }
    }


    function sincronizar(){
        localStorage.setItem('carritoCompras',JSON.stringify(carritoAtriculos));
    }

}