import CRUDtransacciones, { consultaSaldos } from "./module/CRUDtransacciones.js";
import depRet from "./module/depositos_retiros.js";
import fechaYHora from "./module/fechaYHora.js";
import precioBtc from "./module/precioBTC.js";
import botonesVistaUsuario from "./module/viewChangeUser.js";

const d = document,
w = window,
n = navigator;



d.addEventListener('DOMContentLoaded', (e)=> {
    //Función fecha y hora
    fechaYHora("fechaYHora");
    //Precio de bitcoin
    precioBtc("precioBtc");
    //CRUD transacciones
    CRUDtransacciones("#deleteAcc");
    //Botones para mantener id usuario
    botonesVistaUsuario("vistaP","vistaBARS","vistaBBTC","opARS","opBTC","miPerfil","bindex");
    //Saldos
    consultaSaldos("ruedaG");
    //Boton de depositos y retiros
    depRet("retiros","depositos","retBtn","depoBtn");
    
})


