import registerBtn from "./code/register_button.js";
import signIn from "./code/sign_in.js";

const d = document,
w = window,
n = navigator;

d.addEventListener("DOMContentLoaded", () => {
    //Boton de registro
    registerBtn(".registerBtn");
    //Boton inicio de sesion
    signIn(".signInBtn");

});
