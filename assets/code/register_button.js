const d = document,
  w = window,
  ls = localStorage;

export let symbolU = Symbol("u"),
  usuario = {
    [symbolU]: [],
  };

export default function registerBtn(
  DOMclass,
  email,
  name,
  id,
  phone,
  pass,
  confPass
) {
  //Declaracion de constantes del DOM
  const $DOMclass = d.querySelector(DOMclass),
    $email = d.getElementById(email),
    $name = d.getElementById(name),
    $id = d.getElementById(id),
    $phone = d.getElementById(phone),
    $pass = d.getElementById(pass),
    $confPass = d.getElementById(confPass),
    $mensajeError = d.createElement("p"),
    $mensajeExitoso = d.createElement("p");

  //Declaracion de constantes de validacion

  const isEmail = (email) => {
      let regex =
        /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
      return regex.test(email);
    },
    esNumero = (numero) => {
      let regexNumber =
        /^(?:(?:00||\S)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
      return regexNumber.test(numero);
    },
    esDNI = (dniArg) => {
      let regexDni =
      /^\d{8}(?:[-\s]\d{4})?$/;
      return regexDni.test(dniArg);
    },
    esNombre = (Nombre) => {
      let regexNombre =
      /^(?!.* $)[A-Z][a-z ]+$/ig;
      return regexNombre.test(Nombre);
    },
    reseteo = () => {
      location.reload();
    };

  //Declaracion variables a rellenar
  let campoVacio = "",
    mensajeError = "";

  //Desaparecer y reanudar datos
  const desaparecer = () => {
    campoVacio = "";
    mensajeError = "";
    $pass.value = "";
    $confPass.value = "";
  };

  const activarBoton = () => $botonEnviar.removeAttribute("disabled");

  //Ejecución

  d.addEventListener("click", (e) => {
    if (e.target === $DOMclass) {
      // Verificación de campos no vacíos
      if ($email.value === "") campoVacio += `• Email.`;
      if ($name.value === "") campoVacio += `• Nombre.`;
      if ($id.value === "") campoVacio += `• DNI.`;
      if ($phone.value === "") campoVacio += `• Teléfono.`;
      if ($pass.value === "") campoVacio += `• Contraseña.`;
      if ($confPass.value === "") campoVacio += `• Confirmación de contraseña.`;
      if (campoVacio != "")
        mensajeError = `Los siguientes campos requeridos están vacíos: ${
          campoVacio + mensajeError
        } `;

      //Validamos el formato del email
      if (isEmail($email.value) === false && $email.value != "")
        mensajeError += `Tu dirección de email ${$email.value} no es válida.`;

      //Validamos el formato del DNI
      if (esDNI($id.value) === false && $id.value != "")
      mensajeError += `El DNI ${$id.value} no es válido.`;

      // Validación numérica del campo teléfono
      if (esNumero($phone.value) === false && $phone.value != "")
        mensajeError += `Tu teléfono no es válido.`;
      // Validación Nombre
      if (esNombre($name.value) === false && $name.value != "") mensajeError += 'Ingrese un nombre válido.'
      

      //Validación campo password y confirmación password
      if (
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(
          $pass.value
        ) === false &&
        $confPass.value != ""
      )
        mensajeError += `La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos dos caracter no alfanumérico`;

      //Confirmación del password
      const confirmarPassword = () => {
        if ($pass.value != $confPass.value && $confPass.value != "") {
          mensajeError += `La confirmación de su contraseña no es válida, por favor escríbalo igualmente a la original.`;
        }
      };
      confirmarPassword();

//Peticion asincrona validacion con BD
try {
  const obtenerTodo = async () => {
  let resp = await fetch(
    "https://apiusuarioscamatsgo.herokuapp.com/"
  ),
  json = await resp.json(); 
   
  if (!resp.ok)
  throw { status: resp.status, statusText: resp.statusText }; 

  for (let element of json) {

    if(element.emailUser === $email.value) return alert ("El usuario ya existe.");
    if(element.docUser === $id.value) return alert ("El DNI ingresado ya existe.");
          
    if(json.indexOf(element) === json.length-1) {
      if (mensajeError != "") {
        alert(mensajeError);
        return desaparecer();
      }


      //Almacenar en symbol
      usuario[symbolU] = [
        $name.value,
        $id.value,
        $email.value,
        $phone.value,
        $pass.value,
      ];
      ls.setItem("x", usuario[symbolU]);
      $DOMclass.setAttribute("target", "_blank");
      location.href = "credit_card_input.html";
    }
  } 
  }
  obtenerTodo();
} catch (err) {
    let message = err.statusText || "Ocurrió un error";
    console.log(`Error ${err.status}: ${message}`);
}

//FIN PETICION

      
      
    }
  });
}
