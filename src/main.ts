import './style.css'

//Interface för kurs
interface Course {
  code: string;
  name: string;
  progression: string;
  syllabus: string;
}

//funktion för att skriva ut kurser till DOM
function printCourse(course: Course): void {
  const table = document.getElementById("table-data") as HTMLTableSectionElement;

  if(table) {
        //skapa tr- och td-element
        const trEl: HTMLTableRowElement = document.createElement("tr");
        const tdCodeEl: HTMLTableCellElement = document.createElement("td");
        const tdNameEl: HTMLTableCellElement = document.createElement("td");
        const tdProgEl: HTMLTableCellElement = document.createElement("td");
        const tdSyllabusEl: HTMLTableCellElement = document.createElement("td");

        //lägg till text
        tdCodeEl.innerHTML = course.code;
        tdNameEl.innerHTML = course.name;
        tdProgEl.innerHTML = course.progression;
        tdSyllabusEl.innerHTML = `<a href="${course.syllabus}">${course.code}</a>`;

        //lägger till td i tr
        trEl.appendChild(tdCodeEl);
        trEl.appendChild(tdNameEl);
        trEl.appendChild(tdProgEl);
        trEl.appendChild(tdSyllabusEl);

        //skriv ut till DOM
        table.appendChild(trEl);
  }
};

//Hämta DOM-element för formulär
const form = document.getElementById("form-course") as HTMLFormElement;


//Händelselyssnare för submit av formulär
form.addEventListener("submit", (event) => {
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
    //Skapa nytt kursobjekt
    const newCourse: Course = {
      code: codeInput.value,
      name: nameInput.value,
      progression: progInput.value,
      syllabus: syllabusInput.value,
    };

    printCourse(newCourse);
  };
})