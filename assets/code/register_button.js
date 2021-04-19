const d = document,
w = window;

export default function registerBtn (DOMclass) {
    const $id = d.querySelector(DOMclass);
    $id.setAttribute("target", "_blank");

    $id.addEventListener("click", (e) => { 
        location.href = "./credit_card/credit_card_input.html"
    })
    
}