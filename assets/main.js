import CRUDusuarios from "./code/CRUDusuarios.js";
import registerBtn from "./code/register_button.js";
import signIn from "./code/sign_in.js";

const d = document,
w = window,
n = navigator;


d.addEventListener("DOMContentLoaded", (e) => {

    //Boton de registro,nombres de ids
    registerBtn(".registerBtn","email","name","dni","phone","registerPass","confPass");
    //CRUD usuarios
    CRUDusuarios("#cardnumber","#securitycode",".CCbtn");
    //Boton inicio de sesion
    signIn(".signInBtn");


});
