const d = document,
  w = window,
  n = navigator,
  ls = localStorage;

let ID, saldoBTC = null, saldoARS = null,datosUsuario;

export default function CRUDtransacciones(deleteBtn,importeDEP,nroTarjetaDEP,CCVDEP,confBtnDEP,importeRET,nroTarjetaRET,botonRET,BTCCOM,pesosCOM,btnBTCCOM,BTCVEN,pesosVEN,btnBTCVEN) {

  //Constantes
  const $deleteBtn = d.querySelector(deleteBtn),
  $nroTarjDEP = d.querySelector(nroTarjetaDEP),
  $confBtnDEP = d.querySelector(confBtnDEP),
  $impDEP = d.querySelector(importeDEP),
  $CCVDEP = d.querySelector(CCVDEP),
  $impRET = d.querySelector(importeRET),
  $nroTarjetaRET = d.querySelector(nroTarjetaRET),
  $botonRET = d.querySelector(botonRET),
  $BTCCOM = d.querySelector(BTCCOM),
  $pesosCOM = d.querySelector(pesosCOM),
  $btnBTCCOM = d.querySelector(btnBTCCOM),
  $BTCVEN = d.querySelector(BTCVEN),
  $pesosVEN = d.querySelector(pesosVEN),
  $btnBTCVEN = d.querySelector(btnBTCVEN);

  //Traer mi ID
  ID = w.location.search;
  ID = ID.replace("?","");
  ls.removeItem('id');

  //Funcion eliminar todo
  const deleteData = () => {
    $CCVDEP.value = "";
    $impDEP.value = "";
    $impRET.value = "";
    $BTCCOM.value = "";
    $pesosCOM.value = "";
    $BTCVEN.value = "";
    $pesosVEN.value = "";
  }



  //Iniciar en el click al boton darse de baja
  d.addEventListener("click", (e) => {

    //Darse de baja
    if (e.target === $deleteBtn) {
      let eliminarAcc = confirm("¿Está seguro que desea eliminar su cuenta?");
      if (eliminarAcc) {
        //Delete mi usuario - POST
        try {
          const borraloTodo = async () => {
            let options = {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                }
              },
              resp = await fetch(
                `https://apiusuarioscamatsgo.herokuapp.com/delete/${ID}`,
                options
              ),
              json = await resp.json();
              
              if (!resp.ok)
              throw { status: resp.status, statusText: resp.statusText };

          };
          //Ejecución
          borraloTodo();
          alert("Su cuenta ha sido dada de baja.");
          location.href = "../index.html";

        } catch (err) {
          let message = err.statusText || "Ocurrió un error";
          console.log(`Error ${err.status}: ${message}`);
        }
      } 
    }
    //COMPRA VENTA ARS BTC
    //DEPOSITO ARS
    if(e.target === $confBtnDEP) {
      //Primera transaccion POST
      let primeraTransaccion;
      if(saldoARS === null && saldoBTC === null) primeraTransaccion = true;
      if(primeraTransaccion) {
        if(parseInt($CCVDEP.value) !== datosUsuario.securityCode) return alert("Su transacción no puede ser procesada, por favor verifique su código de seguridad.");
        //POST
        try {
          const primeraTrans = async () => {
            alert("Realizando su primer depósito.");
  
            let options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  _id: ID,
                  amount: $impDEP.value,
                }),
              },
              resp = await fetch(
                "https://api-node-exchange.herokuapp.com/cuentas/depositoars",
                options
              ),
              json = await resp.json();       
            if(resp.ok) alert("Su depósito fué realizado con éxito.");
            if (!resp.ok)
              throw { status: resp.status, statusText: resp.statusText };
                   };
                   //Ejecucion
                   primeraTrans();
                   deleteData();
                   
                   
        } catch (err) {
          let message = err.statusText || "Ocurrió un error";
          console.log(`Error ${err.status}: ${message}`);
        }
      }
      else {
       
        if(parseInt($CCVDEP.value) !== datosUsuario.securityCode) return alert("Su transacción no puede ser procesada, por favor verifique su código de seguridad.");
        //PUT
        try {
          const depositoARS = async () => {
            alert("Realizando su depósito en ARS.");
            
            let options = {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  _id: ID,
                  amount: $impDEP.value,
                }),
              };
              console.log(options.body);
              let resp = await fetch(
                "https://api-node-exchange.herokuapp.com/cuentas/depositoars",
                options
              ),
              json = await resp.json();       
              if(resp.ok) alert("Su depósito fué realizado con éxito.");
              if (!resp.ok)
              throw { status: resp.status, statusText: resp.statusText };
                   };
                   //Ejecucion
                   depositoARS();
                   deleteData();

        } catch (err) {
          let message = err.statusText || "Ocurrió un error";
          console.log(`Error ${err.status}: ${message}`);
        }

      }
    }
    //RETIRO ARS 

    if(e.target === $botonRET) {
      
      try {
        const retiroARS = async () => {
          alert("Realizando su retiro en ARS.");

          let options = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                _id: ID,
                amount: $impRET.value,
              }),
            },
            resp = await fetch(
              "https://api-node-exchange.herokuapp.com/cuentas/retiroars",
              options
            ),
            json = await resp.json();       

          if(resp.ok) alert("Su depósito fué realizado con éxito.");
          if (!resp.ok)
            throw { status: resp.status, statusText: resp.statusText };
                 };
                 //Ejecucion
                 retiroARS();
                 deleteData();

      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        console.log(`Error ${err.status}: ${message}`);
      }
    }
    //COMPRA BTC
    if(e.target === $btnBTCCOM) {
      if($BTCCOM.value === "" || $pesosCOM.value === "") return alert("Inserte una cantidad válida para realizar su compra.");
      try {
        const compraBTC = async () => {
          alert("Realizando su compra de BTC.");

          let options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                _id: ID,
                amountARS: $pesosCOM.value,
                amountBTC: $BTCCOM.value,
              }),
            },
            resp = await fetch(
              "https://api-node-exchange.herokuapp.com/cuentas/comprabtc",
              options
            ),
            json = await resp.json();       

          if(resp.ok) {alert("Su compra fue realizada con éxito.");
          $pesosCOM.value = "";
          $BTCCOM.value = "";
            }
          if (!resp.ok)
            throw { status: resp.status, statusText: resp.statusText };
                 };
                 //Ejecucion
                 compraBTC();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        console.log(`Error ${err.status}: ${message}`);
      }
    }

    //VENTA BTC
    if(e.target === $btnBTCVEN) {
      if($BTCVEN.value === "" || $pesosVEN.value === "") return alert("Inserte una cantidad válida para realizar su compra.");
      try {
        const ventaBTC = async () => {
          alert("Realizando su venta de BTC.");

          let options = {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                _id: ID,
                amountARS: $pesosVEN.value,
                amountBTC: $BTCVEN.value,
              }),
            },
            resp = await fetch(
              "https://api-node-exchange.herokuapp.com/cuentas/ventabtc",
              options
            ),
            json = await resp.json();       

          if(resp.ok) {alert("Su venta fue realizada con éxito.");
          $pesosVEN.value = "";
          $BTCVEN.value = "";
            }
          if (!resp.ok)
            throw { status: resp.status, statusText: resp.statusText };
                 };
                 //Ejecucion
                 ventaBTC();
                 

      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        console.log(`Error ${err.status}: ${message}`);
        alert("Su saldo es insuficiente para realizar esta transacción. Ingrese una cantidad válida.");
      }
    }

  });
  
//Consultar datos usuario
try {
  const dameloTodo = async () => {
    let resp = await fetch(
        `https://apiusuarioscamatsgo.herokuapp.com/${ID}`
      ),
      json = await resp.json();
      if (!resp.ok)
      throw { status: resp.status, statusText: resp.statusText };
      //Colocar nro de tarjeta bloqueado
      if($nroTarjDEP !== null) {
        $nroTarjDEP.value = json.cardNumber;
        $nroTarjDEP.setAttribute("readonly","readonly");
      }
      if($nroTarjetaRET !== null) {
      $nroTarjetaRET.setAttribute("readonly","readonly");
      $nroTarjetaRET.value = json.cardNumber;
    }
     
      datosUsuario = json;
  };
  //Ejecución
  dameloTodo();

} catch (err) {
  let message = err.statusText || "Ocurrió un error";
  console.log(`Error ${err.status}: ${message}`);
}

}

//Consultar saldos 

export function consultaSaldos (grafico) {
  
  //Traer mi ID
  ID = w.location.search;
  ID = ID.replace("?","");

  try {
    const traeloTodo = async (canva,pARS,pBTC) => {
      let resp = await fetch(
          `https://api-node-exchange.herokuapp.com/cuentas/saldo/?id=${ID}`
        ),
        json = await resp.json();
        //Introducimos los saldos a las variables globales
        saldoBTC = json.data[0].balanceBTC;
        saldoARS = json.data[0].balanceARS;
        //Definimos variables del gráfico de saldos
        let etiqueta,colorFondo,saldosVar,
        $saldoARS = d.getElementById(pARS),
        $saldoBTC = d.getElementById(pBTC);
        if($saldoARS !== null) {etiqueta = 'ARS';
        colorFondo = 'rgb(8, 149, 209)';
        saldosVar = saldoARS;
      }
        else {etiqueta = 'BTC';
        colorFondo = 'rgb(255, 147, 5)';
        saldosVar = saldoBTC;
      };
        const data = {
          labels: [
            etiqueta,
          ],
          datasets: [{
            label: 'Saldos Cuenta',
            data: [saldosVar],
            color: '#ffffff',
            backgroundColor: [
              colorFondo,
            ],
            hoverOffset: 4,
            cutout: '80%',
            
          }],
        },
         config = {
          type: 'doughnut',
          data: data,
          options: {plugins:{legend:{labels:{color: '#12d400'}}},layout:{padding:{bottom:20}}}
        };
        let chart = d.getElementById(canva);
        if(chart !== null) {
          chart.getContext('2d');
          let myChart = new Chart(chart,config);

          if($saldoARS !== null) $saldoARS.innerText = saldoARS.toFixed(2);
          else $saldoBTC.innerText = saldoBTC.toFixed(6);
          
          
         
        };
        
        //FIN graficos
        
        //Definición de errores
        if (!resp.ok)
        throw { status: resp.status, statusText: resp.statusText };

    };

    //Ejecución
    traeloTodo('circuloDona','saldoARS','saldoBTC');
  } catch (err) {

    let message = err.statusText || "Ocurrió un error";
    console.log(`Error ${err.status}: ${message}`);
  }
}

export const verificacionAbandono = () => {
  ls.removeItem('id');
}

export function precioBtc (id,BTCCOM,pesosCOM,BTCVEN,pesosVEN) {

  //Constante
const $id = d.getElementById(id),
$BTCCOM = d.getElementById(BTCCOM),
$pesosCOM = d.getElementById(pesosCOM),
$BTCVEN = d.getElementById(BTCVEN),
$pesosVEN = d.getElementById(pesosVEN);

//Variables
let btcars;

//Funcion

const estBalBTCARS = () => {

  let dec = /^\d*\.?\d*$/;
  d.addEventListener('change', e=>{
    

    if(e.target === $BTCCOM){
      if($BTCCOM.value === "") return $pesosCOM.value = "";
      if(dec.test($BTCCOM.value) === false || Math.sign($BTCCOM.value) === -1){
      $BTCCOM.value = "";
      $pesosCOM.value = "";
      return alert ("Inserta un número correcto."); }
      $pesosCOM.value = btcars * parseFloat($BTCCOM.value).toFixed(6);
      $pesosCOM.value = parseFloat($pesosCOM.value).toFixed(2);
    }
    if(e.target === $pesosCOM){ 
      if($pesosCOM.value === "") return $BTCCOM.value = "";
      if(dec.test($pesosCOM.value) === false || Math.sign($pesosCOM.value) === -1){
        $BTCCOM.value = "";
        $pesosCOM.value = "";
        return alert ("Inserta un número correcto."); }
      $BTCCOM.value = parseFloat($pesosCOM.value).toFixed(2) / btcars;
      $BTCCOM.value = parseFloat($BTCCOM.value).toFixed(7);
    }
    if(e.target === $BTCVEN) {
      if($BTCVEN.value === "") return $pesosVEN.value = "";
      if(dec.test($BTCVEN.value) === false || Math.sign($BTCVEN.value) === -1){
      $BTCVEN.value = "";
      $pesosVEN.value = "";
      return alert ("Inserta un número correcto."); }
      $pesosVEN.value = btcars * parseFloat($BTCVEN.value).toFixed(6);
      $pesosVEN.value = parseFloat($pesosVEN.value).toFixed(2);
    }
    if(e.target === $pesosVEN){
      if($pesosVEN.value === "") return $BTCVEN.value = "";
      if(dec.test($pesosVEN.value) === false || Math.sign($pesosVEN.value) === -1){
        $BTCVEN.value = "";
        $pesosVEN.value = "";
        return alert ("Inserta un número correcto."); }
      $BTCVEN.value = parseFloat($pesosVEN.value).toFixed(2) / btcars;
      $BTCVEN.value = parseFloat($BTCVEN.value).toFixed(7);
    }
  })
  



}

   try{
    //Ejecucion
    const getAll = async () => {
      let res = await fetch("https://api-node-exchange.herokuapp.com/value"),
      json = await res.json();
      btcars = json.bitcoin.ars;
      if($id !== null) $id.innerHTML= `Precio BTC/ARS: ${json.bitcoin.ars}.`;
    }
    getAll();
    estBalBTCARS();

  } catch (err) {
     
  }   
    

}


