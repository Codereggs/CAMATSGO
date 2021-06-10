const d = document,
  w = window,
  n = navigator,
  ls = localStorage;

export default function CRUDusuarios(cardNumber, SC, TDCbtn) {
  const $cardN = d.querySelector(cardNumber),
    $SC = d.querySelector(SC),
    $TDCbtn = d.querySelector(TDCbtn);

  //Declaro variables
  let usuario, dataUser, cardND, secCodeD;

  //Funcion
  const splitear = () => {
    cardND = $cardN.value.replace(/ /gi, "");
    secCodeD = $SC.value.replace(/ /gi, "");
    cardND = parseInt(cardND, 10);
    secCodeD = parseInt(secCodeD, 10);
    dataUser = usuario.split(",");
  };

  //Añado datos de localstorage a array
  usuario = ls.getItem("x");
  ls.removeItem("x");

  //Promesa
  d.addEventListener("click", (e) => {
    if (e.target === $TDCbtn) {
      e.preventDefault();
      //Hay que splitear para añadir los datos
      splitear();

      //Create - POST
      try {
        const mandaloTodo = async () => {
          alert("Procesando su solicitud");

          let options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                emailUser: dataUser[2],
                name_lastNameUser: dataUser[0],
                docUser: dataUser[1],
                phoneUser: dataUser[3],
                password: dataUser[4],
                cardNumber: cardND,
                securityCode: secCodeD,
              }),
            },
            resp = await fetch(
              "https://apiusuarioscamatsgo.herokuapp.com/create",
              options
            ),
            json = await resp.json();
          console.log(json);
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
