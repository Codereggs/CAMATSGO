const d = document,
  w = window,
  n = navigator,
  ls = localStorage;

let ID, saldoBTC, saldoARS;

export default function CRUDtransacciones(deleteBtn) {

  //Constantes
  const $deleteBtn = d.querySelector(deleteBtn);

  //Traer mi ID
  ID = w.location.search;
  ID = ID.replace("?","");


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
  });

}

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
          options: {plugins:{legend:{labels:{color: '#fff'}}},layout:{padding:{bottom:20}}}
        };
        let chart = d.getElementById(canva);
        if(chart !== null) {
          chart.getContext('2d');
          let myChart = new Chart(chart,config);

          if($saldoARS !== null) $saldoARS.innerText = saldoARS;
          else $saldoBTC.innerText = saldoBTC;
          
          
         
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






