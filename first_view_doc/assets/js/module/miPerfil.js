const d = document,
  n = navigator,
  w = window;

export default function miPerfil(
  email,
  name,
  doc,
  phone,
  card,
  ccv,
  pass,
  confPass,
  btnAceptarUser,
  btnAceptarPass,
  emailI,
  phoneI,
  cardI,
  ccvI
) {
  const $email = d.getElementById(email),
    $nameLastN = d.getElementById(name),
    $doc = d.getElementById(doc),
    $phone = d.getElementById(phone),
    $card = d.getElementById(card),
    $ccv = d.getElementById(ccv),
    $pass = d.getElementById(pass),
    $confPass = d.getElementById(confPass),
    $btnAU = d.getElementById(btnAceptarUser),
    $btnAP = d.getElementById(btnAceptarPass),
    $mailI = d.getElementById(emailI),
    $phoneI = d.getElementById(phoneI),
    $cardI = d.getElementById(cardI),
    $ccvI = d.getElementById(ccvI);

  //Traer mi ID
  let ID = w.location.search,
    datosJSON;
  ID = ID.replace("?", "");
  let objUser = {},
    mensajeError = "";

  if ($email !== null) {
    try {
      const datosUser = async () => {
        let resp = await fetch(
            `https://apiusuarioscamatsgo.herokuapp.com/${ID}`
          ),
          json = await resp.json();
        if (!resp.ok)
          throw { status: resp.status, statusText: resp.statusText };
        datosJSON = json;
      };
      //Ejecución
      datosUser();
    } catch (err) {
      let message = err.statusText || "Ocurrió un error";
      console.log(`Error ${err.status}: ${message}`);
    }

    const datosUserDom = () => {
      if (datosJSON !== undefined) borrar();
      $email.innerText = `${datosJSON.emailUser}`;
      $nameLastN.innerText = `${datosJSON.name_lastNameUser}`;
      $doc.innerText = `${datosJSON.docUser}`;
      $phone.innerText = `${datosJSON.phoneUser}`;
      $card.innerText = `${datosJSON.cardNumber}`;
      $ccv.innerText = `${datosJSON.securityCode}`;
    };

    let a = setInterval(datosUserDom, 1000),
      borrar = () => {
        clearInterval(a);
      };

    //Validaciones:
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
      esNumeroTarjeta = (num) => {
        let regexNum =
          /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        return regexNum.test(num);
      },
      esCCV = (num) => {
        let regexCCV = /^[0-9]{3,4}$/;
        return regexCCV.test(num);
      };

    d.addEventListener("click", (e) => {
      if (e.target === $btnAU) {
        e.preventDefault();
        objUser.id = ID;
        if (
          $mailI.value === "" &&
          $phoneI.value === "" &&
          $cardI.value === "" &&
          $ccvI.value === ""
        )
          return alert("Complete al menos uno de los campos.");
        //Validamos el formato del email
        if (isEmail($mailI.value) === false && $mailI.value != "")
          mensajeError += `Tu dirección de email no es válida.`;
        // Validación numérica del campo teléfono
        if (esNumero($phoneI.value) === false && $phoneI.value != "")
          mensajeError += `Tu teléfono no es válido.`;
        // Validar Tarjeta
        if (esNumeroTarjeta($cardI.value) === false && $cardI.value != "")
          mensajeError += `Tu número de tarjeta no es válido.`;
        if (Math.sign($cardI.value) === -1)
          mensajeError += `Tu número de tarjeta no es válido.`;
        //Validar CCV
        if (esCCV($ccvI.value) === false && $ccvI.value != "")
          mensajeError += "Tu número de CCV no es válido.";
        if (Math.sign($ccvI.value) === -1)
          mensajeError += `Tu número de tarjeta no es válido.`;

        if (mensajeError != "") {
          alert(mensajeError);
          mensajeError = "";
          return true;
        }

        if ($mailI.value !== "") objUser.emailUser = $mailI.value;
        if ($phoneI.value !== "") objUser.phoneUser = $phoneI.value;
        if ($cardI.value !== "")
          objUser.cardNumber = parseInt($cardI.value, 10);
        if ($ccvI.value !== "")
          objUser.securityCode = parseInt($ccvI.value, 10);

        //Hacemos la peticion

        try {
          const mandaloTodo = async () => {
            alert("Procesando su solicitud.");

            let options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(objUser),
            };
            console.log(options.body);
            let resp = await fetch(
                `https://apiusuarioscamatsgo.herokuapp.com/update/${ID}`,
                options
              ),
              json = await resp.json();
            if (resp.ok) {
              alert("Su transacción ha sido efectivamente realizada.");
              location.reload();
              objUser = {};
            }
            if (!resp.ok)
              throw { status: resp.status, statusText: resp.statusText };
          };
          mandaloTodo();
        } catch (err) {
          let message = err.statusText || "Ocurrió un error";
          console.log(`Error ${err.status}: ${message}`);
        }
      }
      if (e.target === $btnAP) {
        e.preventDefault();
        //Validación campo password y confirmación password
        //Validacion campos vacios
        if ($pass.value === "" || $confPass.value === "")
          return alert("Complete los campos para cambiar su clave.");
        //Validación de contraseña
        if (
          /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(
            $pass.value
          ) === false
        )
          mensajeError += `La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.`;

        //Confirmación del password
        const confirmarPassword = () => {
          if ($pass.value != $confPass.value) {
            mensajeError += `La confirmación de su contraseña no es válida, por favor escríbalo igualmente a la original.`;
          }
        };
        confirmarPassword();

        if (mensajeError != "") {
          alert(mensajeError);
          mensajeError = "";
          return true;
        }

        console.log($pass.value, $confPass.value);
        if ($pass.value !== "") objUser.password = $pass.value;

        try {
          const mandaloTodo = async () => {
            alert("Procesando su solicitud.");

            let options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(objUser),
            };
            console.log(options.body);
            let resp = await fetch(
                `https://apiusuarioscamatsgo.herokuapp.com/update/${ID}`,
                options
              ),
              json = await resp.json();
            if (resp.ok) {
              alert("Su clave ha sido efectivamente cambiada.");
              location.reload();
              objUser = {};
            }
            if (!resp.ok)
              throw { status: resp.status, statusText: resp.statusText };
          };
          mandaloTodo();
        } catch (err) {
          let message = err.statusText || "Ocurrió un error";
          console.log(`Error ${err.status}: ${message}`);
        }
      }
    });
  }
}
