const d = document,
  w = window,
  n = navigator,
  ls = localStorage;

export default function CRUDusuarios(
  nameTDC,
  cardNumber,
  expiration,
  SC,
  TDCbtn,
  form
) {
  const $name = d.querySelector(nameTDC),
    $cardN = d.querySelector(cardNumber),
    $exp = d.querySelector(expiration),
    $SC = d.querySelector(SC),
    $TDCbtn = d.querySelector(TDCbtn),
    $form = d.querySelector(form);

  //Declaro array
  let usuario, dataUser, allI;

  //Funcion
  const splitear = () => {
    dataUser = usuario.split(",");
    allI = dataUser.concat($cardN.value, $SC.value);
    console.log(allI);
  };

  //Añado datos de localstorage a array
  usuario = ls.getItem("x");
  ls.removeItem("x");

  //Promesa
  d.addEventListener("click", (e) => {
    if (e.target === $TDCbtn) {
      e.preventDefault();
      //Hay que splitear para añadir los datos
      //splitear();
      alert("Procesando su solicitud");

      //Create - POST
      try {
        const mandaloTodo = async () => {
          alert("SE PRENDIO");
          console.log(allI);
          

          let options = {
            method: "POST",
            mode: 'no-cors',
            headers:{
              "Content-Type":"application/json",
            },
            body: JSON.stringify({
              emailUser : "elpapi@tucasa.com"
            }),
          };
          console.log(options.body);
          let resp = await fetch(
              "https://apiusuarioscamatsgo.herokuapp.com/create",
              options
            ),
            json = await resp.json();
          console.log(json);
        };
        mandaloTodo();
        if (!resp.ok)
          throw { status: resp.status, statusText: resp.statusText };
      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        alert(`Error ${err.status}: ${message}`);
      }
    }
  });
}
