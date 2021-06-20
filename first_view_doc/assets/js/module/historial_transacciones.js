const d = document,
  w = window,
  n = navigator;

export default function historialNav(tablaARS, tablaBTC, btnBorrar) {
  //Variables
  const $datosTablaARS = d.getElementById(tablaARS),
    $datosTablaBTC = d.getElementById(tablaBTC),
    $btnBorrar = d.getElementById(btnBorrar),
    checkARS = "checkARS",
    checkBTC = "checkBTC";

  let datosJSON,
    datosARS = new Array(),
    datosBTC = new Array();
  //Llamada de datos
  //Traer mi ID
  let ID = w.location.search;
  ID = ID.replace("?", "");

  //GET JSON Transacciones
  try {
    const datosTransacciones = async () => {
      let resp = await fetch(
          `https://api-node-exchange.herokuapp.com/transacciones/?id=${ID}`
        ),
        json = await resp.json();
      datosJSON = json;
      if (!resp.ok) throw { status: resp.status, statusText: resp.statusText };
    };
    //Ejecución
    datosTransacciones();
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    console.log(`Error ${err.status}: ${message}`);
  }
  let datosTabla = () => {
    //Llamamos los datos
    if (datosJSON !== undefined) borrar();
    else {
      return true;
    }
    datosJSON.data[0].transactions.forEach((e) => {
      if (e.t_type.includes("ARS")) {
        datosARS.push(e);
        //Guardamos datos tabla ARS
        if ($datosTablaARS !== null) {
          $datosTablaARS.innerHTML += `
                    <tr>
                    <td><input type="checkbox" class="${checkARS}"></td>
                    <td>${e._id}</td>
                    <td>${e.t_type}</td>
                    <td>${e.t_date}</td>
                    <td>$${e.t_amountARS}</td>
                    </tr>`;
        }
      } else {
        datosBTC.push(e);
        if ($datosTablaBTC !== null) {
          $datosTablaBTC.innerHTML += `
                    <tr>
                    <td><input type="checkbox" class="${checkBTC}"></td>
                    <td>${e._id}</td>
                    <td>${e.t_type}</td>
                    <td>${e.t_date}</td>
                    <td>${e.t_amountBTC}</td>
                    </tr>`;
        }
      }
    });
  };

  let a = setInterval(datosTabla, 1000),
    borrar = () => {
      clearInterval(a);
    },
    IDTransaccion;

  d.addEventListener("change", (e) => {
    const $checkARS = d.querySelectorAll(`.${checkARS}`);
    const $checkBTC = d.querySelectorAll(`.${checkBTC}`);
    let arrCheckARS = Array.from($checkARS),
      arrCheckBTC = Array.from($checkBTC);
    if ($checkARS !== null) {
      for (let items of arrCheckARS) {
        if (e.target === items) {
          if (items.checked === true) {
            //ID de transaccion
            IDTransaccion = datosARS[`${arrCheckARS.indexOf(items)}`]._id;
            console.log(IDTransaccion);
          }
        } else {
          items.toggleAttribute("disabled");
        }
      }
    }

    if ($checkBTC !== null) {
      for (let items of arrCheckBTC) {
        if (e.target === items) {
          if (items.checked === true) {
            //ID de transaccion
            IDTransaccion = datosBTC[`${arrCheckBTC.indexOf(items)}`]._id;
            console.log(IDTransaccion);
          }
        } else {
          items.toggleAttribute("disabled");
        }
      }
    }
  });

  if ($btnBorrar !== null) {
    $btnBorrar.addEventListener("click", () => {
      try {
        const borrarTrans = async () => {
          let options = {
              method: "DELETE",
            },
            resp = await fetch(
              `https://api-node-exchange.herokuapp.com/transacciones/?id=${ID}&tid=${IDTransaccion}`,
              options
            ),
            json = await resp.json();
          if (resp.ok) {
            alert("Su transacción ha sido eliminada.");
            w.location.reload();
          }
          if (!resp.ok) {
            if (resp.status === 403) {
              alert(
                `No puede eliminar la transacción ${IDTransaccion}, ya que tiene mas de 5 minutos de realizada.`
              );
            }
            throw { status: resp.status, statusText: resp.statusText };
          }
        };
        //Ejecución
        borrarTrans();
      } catch (err) {
        console.log(err.status);
      }
    });
  }
}
