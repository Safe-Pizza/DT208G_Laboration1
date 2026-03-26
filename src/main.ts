import './style.css'

//Interface för kurs
interface Course {
  code: string;
  name: string;
  progression: string;
  syllabus: string;
}

//Hämta DOM-element för formulär
const form = document.querySelector<HTMLFormElement>("#form-course");


//Händelselyssnare för submit av formulär
form?.addEventListener("submit", (event) => {
  event.preventDefault();

  //Hämta DOM-element för input
  const codeInput = document.getElementById("code") as HTMLInputElement;
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const progInput = document.getElementById("prog") as HTMLInputElement;
  const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;

  //Hämta DOM-element för fellista
  const errors = document.getElementById("error-list") as HTMLDivElement;

  //Tömma fellista
  errors.innerHTML = "";

  //Skapa list-element
  const ulEl: HTMLUListElement = document.createElement("ul");

  //validera input
  if (codeInput.value === "") {
    let liEl: HTMLLIElement = document.createElement("li");

    liEl.textContent = "Du måste ange kurskod";

    ulEl.appendChild(liEl);
    errors?.appendChild(ulEl);
  };

  if (nameInput.value === "") {
    let liEl: HTMLLIElement = document.createElement("li");

    liEl.textContent = "Du måste ange kursnamn";

    ulEl.appendChild(liEl);
    errors?.appendChild(ulEl);
  };

  if (progInput.value === "") {
    let liEl: HTMLLIElement = document.createElement("li");

    liEl.textContent = "Du måste ange progression";

    ulEl.appendChild(liEl);
    errors?.appendChild(ulEl);
  };

  if (syllabusInput.value === "") {
    let liEl: HTMLLIElement = document.createElement("li");

    liEl.textContent = "Du måste ange kurslänk";

    ulEl.appendChild(liEl);
    errors?.appendChild(ulEl);
  };

  if (codeInput.value != "" && nameInput.value != "" && progInput.value != "" && syllabusInput.value != "") {
    console.log(codeInput.value);
    console.log(nameInput.value);
    console.log(progInput.value);
    console.log(syllabusInput.value);
  };
})