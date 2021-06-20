const d = document;

export default function logOut (btn) {
    const $logout = d.getElementById(btn);
    
    d.addEventListener("click",e=>{
        if(e.target === $logout){
            e.preventDefault();
            let c = confirm("¿Está seguro que desea cerrar sesión?");
            if(c) {
                location.href = "../index.html";
            } else {
                return false;
            }
        }
    })

}

