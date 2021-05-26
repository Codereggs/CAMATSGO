const d = document,
n = navigator,
w = window;

export default function signIn (classBtn) {
   const $classBtn = d.querySelector(classBtn);
    $classBtn.addEventListener("click", () => {
        location.href = "./first_view_doc/home.html";
    })
}