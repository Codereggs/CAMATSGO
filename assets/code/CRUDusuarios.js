const d = document,
  w = window,
  n = navigator,
  ls = localStorage;

export default function CRUDusuarios(cardNumber, SC, TDCbtn,login,user,pass,dateEx) {
  
  

    const fechaExpTDC = (anio,mes) => { 
      let hoy = new Date().getTime(),
      fechaUsuario = new Date(anio,mes,0,0,0,0).getTime();
      if(fechaUsuario < hoy) return true;
    };
   

  const $cardN = d.querySelector(cardNumber),
    $SC = d.querySelector(SC),
    $TDCbtn = d.querySelector(TDCbtn),
    $Login = d.querySelector(login),
    $user = d.querySelector(user),
    $pass = d.querySelector(pass),
    $dateEx = d.querySelector(dateEx);

  //Declaro variables
  let usuario, dataUser, cardND, secCodeD;

  //Variable regex
  const esTDC = (tdc) => {
    let regexTDC = /^(\d\s?){15,16}$/;
    return regexTDC.test(tdc);
  }

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
  
  //Promesa create
  d.addEventListener("click", (e) => {
    
    if (e.target === $TDCbtn) {
      e.preventDefault();
      //Hay que splitear para añadir los datos
      splitear();
      //Validamos si es TDC
      if (esTDC(cardND) === false && $cardN.value != "") {
      $cardN.value = "";
      return alert ("El número de la Tarjeta es inválido, por favor ingrese su número de tarjeta de crédito.");}      
      //Validamos fecha expiracion TDC 
      
      if(fechaExpTDC(20+$dateEx.value.slice(3,5),$dateEx.value.slice(0,2)) === true) return alert ("La fecha de expiración de su tarjeta es inválida");   

      //Validación datos TDC - GET
      try {
        const obtenerTodo = async () => {
        let resp = await fetch(
          "https://apiusuarioscamatsgo.herokuapp.com/"
        ),
        json = await resp.json(); 

        //Definicion errores
        if (!resp.ok)
        throw { status: resp.status, statusText: resp.statusText }; 
        //Iteración
        for (let element of json) {
          if(element.cardNumber === $cardN.value) return alert("Esta tarjeta ya se encuentra registrada.")          
        } 
        }
        obtenerTodo();
      } catch (err) {
          let message = err.statusText || "Ocurrió un error";
          console.log(`Error ${err.status}: ${message}`);
    }
      //Create usuarios - POST
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

          if (!resp.ok)
            throw { status: resp.status, statusText: resp.statusText };
            else {
              alert("Su registro ha sido exitoso, por favor inicie sesión.")
              location.href = "index.html"}
                 };
        mandaloTodo();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        console.log(`Error ${err.status}: ${message}`);
      }
    }
    //Inicio de Sesión

    if(e.target === $Login){
      if($user.value === "" || $pass.value === "") return alert("El campo usuario o contraseña están vacíos, por favor intente con un usuario y contraseña válidas.");
      try {
        const obtenerTodo = async () => {
        let resp = await fetch(
          "https://apiusuarioscamatsgo.herokuapp.com/"
        ),
        json = await resp.json(); 
  
        if (!resp.ok)
        throw { status: resp.status, statusText: resp.statusText }; 

        for (let element of json) {

          if(element.emailUser === $user.value) {

            if(element.password === $pass.value) {
              const ID = element.id;
              ls.setItem("id",ID);
              return location.href = `./first_view_doc/home.html?${ID}`;
            } else {
              return alert("Su usuario o contraseña son inválidas intente de nuevo.");
            }
          }        
          
          if(json.indexOf(element) === json.length-1) {
            return alert("Su usuario o contraseña son inválidas intente de nuevo.");
          }
        } 
        }
        obtenerTodo();
      } catch (err) {
          let message = err.statusText || "Ocurrió un error";
          console.log(`Error ${err.status}: ${message}`);
    }
    }


  });

  
}



