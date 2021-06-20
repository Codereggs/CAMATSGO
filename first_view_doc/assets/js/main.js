import logOut from "./module/cerrarSesion.js";
import CRUDtransacciones, {
  consultaSaldos,
  precioBtc,
} from "./module/CRUDtransacciones.js";
import depRet from "./module/depositos_retiros.js";
import fechaYHora from "./module/fechaYHora.js";
import historialNav from "./module/historial_transacciones.js";
import miPerfil from "./module/miPerfil.js";
import darkMode from "./module/modo_oscuro.js";
import botonesVistaUsuario from "./module/viewChangeUser.js";

const d = document,
  w = window,
  n = navigator;

d.addEventListener("DOMContentLoaded", (e) => {
  //Función fecha y hora
  fechaYHora("fechaYHora");
  //Precio de bitcoin
  precioBtc("precioBtc", "compraBTC", "depPesos", "ventaBTC", "retPesos");
  //CRUD transacciones
  CRUDtransacciones(
    "#deleteAcc",
    "#impars",
    "#ntarjars",
    "#ccv",
    "#confDepoARS",
    "#imp",
    "#ntarj",
    "#confRet",
    "#compraBTC",
    "#depPesos",
    "#btnBTCCOM",
    "#ventaBTC",
    "#retPesos",
    "#btnBTCVEN"
  );
  //Botones para mantener id usuario
  botonesVistaUsuario(
    "vistaP",
    "vistaBARS",
    "vistaBBTC",
    "opARS",
    "opBTC",
    "miPerfil",
    "bindex"
  );
  //Saldos
  consultaSaldos("ruedaG");
  //Boton de depositos y retiros
  depRet("retiros", "depositos", "retBtn", "depoBtn");
  //Historial de navegaciones
  historialNav("datosTablaARS", "datosTablaBTC", "botonBorrar");
  //Mi Perfil
  miPerfil(
    "emailUser",
    "nameLastName",
    "docUser",
    "phoneUser",
    "cardNumber",
    "ccvNumber",
    "passN",
    "passConfN",
    "btnCambiarDatosUser",
    "btnCambiarPass",
    "emailIn",
    "phoneIn",
    "cardIn",
    "ccvIn"
  );
});

//Modo Oscuro
darkMode("#darkModeButton");
//Cerrar Sesión
logOut("logout");
