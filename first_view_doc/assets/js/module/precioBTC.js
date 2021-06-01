const d = document,
w = window, 
n = navigator;

export default function precioBtc (id) {
    //Constante
    const $id = d.getElementById(id);

    //Ejecucion
    const getAll = async () => {
      let res = await fetch("https://api-node-exchange.herokuapp.com/value"),
      json = await res.json();
      
      $id.innerHTML= `Precio BTC/ARS: ${json.bitcoin.ars}.`;
    }
    
    getAll();

}