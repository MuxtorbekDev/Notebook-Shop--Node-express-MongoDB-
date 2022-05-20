const navIcon = document.querySelector(".btn-nav i.fa-bars");
const closeIcon = document.querySelector(".btn-nav i.fa-xmark");
const btnNav = document.querySelector(".btn-nav");
const menu = document.querySelector("nav ul.navUl");

navIcon.addEventListener("click", () => {
  menu.classList.toggle("flex");
  navIcon.classList.remove("block");
  closeIcon.classList.add("block");
});

closeIcon.addEventListener("click", () => {
  menu.classList.toggle("flex");
  navIcon.classList.add("block");
  closeIcon.classList.remove("block");
});

window.addEventListener("scroll", () => {
  menu.classList.remove("flex");
  navIcon.classList.add("block");
  closeIcon.classList.remove("block");
});

const NavA = document.querySelectorAll("nav ul.navUl li a");

NavA.forEach((item) => {
  item.addEventListener("click", () => {
    menu.classList.remove("flex");
    navIcon.classList.add("block");
    closeIcon.classList.remove("block");
  });
});
