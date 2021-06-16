const d = document,
n = navigator,
w = window;

export default function botonesVistaUsuario (vistaP,vistaBARS,vistaBBTC,opARS,opBTC,miPerfil,bindex) {
  const $ppal = d.getElementById(vistaP),
  $visAR = d.getElementById(vistaBARS),
  $visBTC = d.getElementById(vistaBBTC),
  $opARS = d.getElementById(opARS),
  $opBTC = d.getElementById(opBTC),
  $perfil = d.getElementById(miPerfil),
  $bindex = d.getElementById(bindex);

  let ID = w.location.search;


  const reemplazarAtt = (p) => {
       let dir = p.getAttribute("href"),
       idUrl = dir + ID;
       p.setAttribute("href",idUrl);
  }

  reemplazarAtt($ppal);
  reemplazarAtt($visAR);
  reemplazarAtt($visBTC);
  reemplazarAtt($opARS);
  reemplazarAtt($opBTC);
  reemplazarAtt($perfil);
  if($bindex !== null) return reemplazarAtt($bindex);

}