let API = "http://localhost:8000/foods";
// let addBtn = document.querySelector(".addBtn");
let addBtn = document.querySelector("#addMenuBtn");

// Получаем модальное окно и кнопку для открытия
let modal = document.getElementById("modal");
let inpName = document.querySelector(".inpName");
let inpPrice = document.querySelector(".inpPrice");
let inpImg = document.querySelector(".inpImg");

let inpEditName = document.querySelector(".inpEditName");
let inpEditPrice = document.querySelector(".inpEditPrice");
let inpEditImg = document.querySelector(".inpEditImg");
let modalSaveButton = document.querySelector("#modalSaveButton");
let sectionFood = document.querySelector(".sectionFood");
const inpSearch = document.querySelector("#inpSearch");
let searchValue = "";
// const prevBtn = document.querySelector("#prevBtn");
// const nextBtn = document.querySelector("#nextBtn");
// let countPage = 1;
// let currentPage = 1;
// Когда пользователь кликает на кнопку "Добавить Меню", открываем модальное окно
//!ГЛАВНАЯ КНОПКА ДОБАВИТЬ
addBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// Получаем элемент для закрытия модального окна
let closeBtn = document.querySelector(".close");
// Когда пользователь кликает на крестик, закрываем модальное окно
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Добавляем обработчик события для кнопки "Добавить" в модальном окне
let modalAddButton = document.querySelector("#modalAddButton");
modalAddButton.addEventListener("click", function () {
  // Получаем значения из всех трех инпутов
  let inputs = document.querySelectorAll(".modal-body input");
  let values = Array.from(inputs).map((input) => input.value);
  // Если хотя бы одно поле пустое, выводим сообщение об ошибке
  //! CREATE
  if (!values.every((value) => value.trim())) {
    alert("Заполните все поля!");
    return;
  }

  // Создаем объект с данными о новом блюде
  let newFood = {
    foodName: values[0],
    foodPrice: values[1],
    foodImg: values[2],
  };

  // Отправляем данные на сервер
  createFood(newFood);

  // Очищаем значения инпутов
  inputs.forEach((input) => (input.value = ""));

  // Закрываем модальное окно
  modal.style.display = "none";
});

function createFood(food) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(food),
  }).then(() => readFood());
}

//!READ
async function readFood() {
  const response = await fetch(
    // API
    // `${API}?q=${searchQuery}`
    `${API}?q=${searchValue}`
    // &_page=${currentPage}&_limit=3
  );
  const data = await response.json();
  sectionFood.innerHTML = "";
  data.forEach((elem) => {
    sectionFood.innerHTML += `
   
    <div class="book" >

    <div class="cardBook" style="width: 10rem;">
  
    <div class="card" style = "height:350px">
    
    <img class="cardImg"  style = "height:150px" src="${elem.foodImg}" alt="${elem.foodName}">
        <h3 class="cardTitle">${elem.foodName}</h3>
        <span>${elem.foodPrice}</span>
        <button class="btnDelete" id= "${elem.id}">
        Удалить
      </button>
      <button class="btnEdit" id= "${elem.id}">
      Редактировать
    </button>
    </div></div>
</div>
`;
  });
  // pageFunc();
}
readFood();
//!DELETE
document.addEventListener("click", (e) => {
  let del_class = [...e.target.classList];
  // console.log(del_class);
  let id = e.target.id;
  // console.log(id);
  if (del_class.includes("btnDelete")) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then(() => readFood());
  }
});
//!EDIT
document.addEventListener("click", (e) => {
  let del_class = [...e.target.classList];
  let id = e.target.id;

  if (del_class.includes("btnEdit")) {
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        inpEditName.value = data.foodName;
        inpEditPrice.value = data.foodPrice;
        inpEditImg.value = data.foodImg;
        modalSaveButton.setAttribute("id", data.id);
      });
  }
});
modalSaveButton.addEventListener("click", () => {
  if (
    !inpEditName.value.trim() ||
    !inpEditPrice.value.trim() ||
    !inpEditImg.value.trim()
  ) {
    alert("Заполните поля!");
    return;
  }
  let editedFood = {
    foodName: inpEditName.value,
    foodPrice: inpEditPrice.value,
    foodImg: inpEditImg.value,
  };
  editFood(editedFood, modalSaveButton.id);
});
function editFood(food, id) {
  console.log(id);
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(food),
  }).then(() => readFood());
}
// //!Search
inpSearch.addEventListener("input", (e) => {
  searchValue = e.target.value;
  // console.log(search.value);
  readFood();
});
// inpSearch.addEventListener("input", () => {
//   const searchQuery = inpSearch.value.trim();
//   readFood(searchQuery);
// });
//! PAGINATION
// async function pageFunc() {
//   const res = await fetch(API);
//   const data = await res.json();
//   countPage = Math.ceil(data.length / 3);
//   // Обновляем текст кнопок "Предыдущая" и "Следующая"
//   prevBtn.textContent = currentPage > 1 ? "Previous" : "";
//   nextBtn.textContent = currentPage < countPage ? "Next" : "";
// }
// // Вызываем функцию для вычисления общего количества страниц
// // pageFunc();

// prevBtn.addEventListener("click", () => {
//   if (currentPage <= 1) return;
//   currentPage--;
//   readFood(); // Вызываем функцию для загрузки данных текущей страницы
// });

// nextBtn.addEventListener("click", () => {
//   if (currentPage >= countPage) return;
//   currentPage++;
//   readFood(); // Вызываем функцию для загрузки данных текущей страницы
// });
