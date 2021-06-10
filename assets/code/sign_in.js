const d = document,
n = navigator,
w = window;

export default function signIn (classBtn) {
   const $classBtn = d.querySelector(classBtn);
    d.addEventListener("click", (e) => {
        if(e.target === $classBtn)
        location.href = "./first_view_doc/home.html";
    })
}