import fechaYHora from "./module/fechaYHora.js";
import precioBtc from "./module/precioBTC.js";

const d = document,
w = window,
n = navigator;



d.addEventListener('DOMContentLoaded', (e)=> {
    //Función fecha y hora
    fechaYHora("fechaYHora");
    //Precio de bitcoin
    precioBtc("precioBtc");

})