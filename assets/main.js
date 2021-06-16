import CRUDusuarios from "./code/CRUDusuarios.js";
import registerBtn from "./code/register_button.js";

const d = document,
w = window,
n = navigator;


d.addEventListener("DOMContentLoaded", (e) => {

    //Boton de registro,nombres de ids
    registerBtn(".registerBtn","email","name","dni","phone","registerPass","confPass");
    //CRUD usuarios - Inicio de sesión
    CRUDusuarios("#cardnumber","#securitycode",".CCbtn",".signInBtn","#user","#loginPass","#expirationdate");



});
