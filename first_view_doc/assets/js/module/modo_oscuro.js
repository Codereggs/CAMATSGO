export default function darkMode(btn) {
  const d = document,
    ls = localStorage,
    $darkModeBtn = d.querySelector(btn);

  let day = true;

  const dayMode = () => {
      d.body.style.setProperty("background-color", "var(--primary-color)");
      d.body.style.setProperty("color", "var(--text-primary-color)");
      $darkModeBtn.style.setProperty(
        "border",
        "1px solid var(--primary-color)"
      );
      d.documentElement.style.setProperty(
        "--black-mode-color",
        "rgb(0, 0, 0, 0.7)"
      );
      $darkModeBtn.style.setProperty(
        "background-image",
        `url("assets/img/Sol.png")`
      );
      ls.setItem("theme", "light");
      return (day = false);
    },
    nightMode = () => {
      d.body.style.setProperty("background-color", "var(--black-mode)");
      d.body.style.setProperty("color", "var(--primary-color)");
      $darkModeBtn.style.setProperty("border", "1px solid var(--nav-color)");
      d.documentElement.style.setProperty(
        "--black-mode-color",
        "rgb(255, 255, 255)"
      );
      $darkModeBtn.style.setProperty(
        "background-image",
        `url("assets/img/Luna.png")`
      );
      ls.setItem("theme", "dark");
      return (day = true);
    };

  d.addEventListener("click", (e) => {
    if (e.target.matches(btn) || e.target.matches(`${btn} *`)) {
      if (day) {
        dayMode();
      } else {
        nightMode();
      }
    }
  });

  d.addEventListener("DOMContentLoaded", (e) => {
    if (ls.getItem("theme") === null) ls.setItem("theme", "light");
    if (ls.getItem("theme") === "light") dayMode();
    if (ls.getItem("theme") === "dark") nightMode();
  });
}
