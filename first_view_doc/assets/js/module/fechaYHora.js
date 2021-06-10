const d = document,
w = window,
FORMAT = 'MMMM Do YYYY, h:mm:ss a';

export default function fechaYHora (id) {
    let fyh = undefined;
    const $id = d.getElementById(id);

    const tiempo = () => { 
        fyh = moment().format(FORMAT);
        $id.innerHTML = `<h6>${fyh}</h6>`;
        setTimeout(function() {tiempo()},1000);
    };
    tiempo();
}