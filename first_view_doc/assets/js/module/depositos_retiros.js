/*FUNCION PARA BOTONES DEPOSITO Y RETIRO*/

export default function depRet (retiros,depositos,retBtn,depBtn) {
const $retirosArsBtn = document.getElementById(retiros),
$depositoArsBtn = document.getElementById(depositos),
$retiroBtn = document.getElementById(retBtn),
$depositoBtn = document.getElementById(depBtn);
document.addEventListener("click",e=>{
  
  if(e.target === $retiroBtn)
  {
    $retirosArsBtn.classList.remove("oculto");
    $depositoArsBtn.classList.add("oculto");
    $retiroBtn.classList.add("estaActivo");
    $depositoBtn.classList.remove("estaActivo");
    
  };
  if(e.target === $depositoBtn)
  {
    $depositoArsBtn.classList.remove("oculto");
    $retirosArsBtn.classList.add("oculto");
    $retiroBtn.classList.remove("estaActivo");
    $depositoBtn.classList.add("estaActivo");
  }

});
}