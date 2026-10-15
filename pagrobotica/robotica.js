const menuBtn = document.getElementById("menuBtn");

const nav = document.getElementById("nav");


if (menuBtn && nav) {

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("activo");

    });

}


if (nav) {

    const enlaces = nav.querySelectorAll("a");

    enlaces.forEach(function (enlace) {

        enlace.addEventListener("click", function () {

            nav.classList.remove("activo");

        });

    });

}