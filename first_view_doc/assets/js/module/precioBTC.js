const d = document,
w = window, 
n = navigator;

export default function precioBtc (id) {
   try{
    //Constante
    const $id = d.getElementById(id);

    //Ejecucion
    const getAll = async () => {
      let res = await fetch("https://api-node-exchange.herokuapp.com/value"),
      json = await res.json();
      
      console.log(json);
      $id.innerHTML= `Precio BTC/ARS: ${json.bitcoin.ars}.`;
    
    }
    getAll();

  } catch (err) {
    /*  let message = err.statusText || "Ocurrió un error";
      $table.insertAdjacentHTML(
        "afterend",
        `<p><b>Error ${err.status}: ${message}</b></p>`
      );*/
      alert(`Error: ${err.status} ${message}`);
  }   
    

}