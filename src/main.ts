import './style.css'

document.addEventListener("DOMContentLoaded", () => {
  loadStorage();
})

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

  if (table) {
    //skapa tr- och td-element
    const trEl: HTMLTableRowElement = document.createElement("tr");
    const tdCodeEl: HTMLTableCellElement = document.createElement("td");
    const tdNameEl: HTMLTableCellElement = document.createElement("td");
    const tdProgEl: HTMLTableCellElement = document.createElement("td");
    const tdSyllabusEl: HTMLTableCellElement = document.createElement("td");
    const tdButtonEl: HTMLTableCellElement = document.createElement("td");
    const buttonEl: HTMLButtonElement = document.createElement("button");

    trEl.classList.add(course.code);
    buttonEl.classList.add("button-delete");

    //lägg till text
    tdCodeEl.innerHTML = course.code;
    tdNameEl.innerHTML = course.name;
    tdProgEl.innerHTML = course.progression;
    tdSyllabusEl.innerHTML = `<a href="${course.syllabus}" target="_blank">${course.code}</a>`;
    buttonEl.innerHTML = `<span class="fa-solid fa-trash"></span>`;

    tdButtonEl.appendChild(buttonEl);

    //lägger till td i tr
    trEl.appendChild(tdCodeEl);
    trEl.appendChild(tdNameEl);
    trEl.appendChild(tdProgEl);
    trEl.appendChild(tdSyllabusEl);
    trEl.appendChild(tdButtonEl);

    //skriv ut till DOM
    table.appendChild(trEl);

    //Händelselyssnare för knapp
    buttonEl.addEventListener("click", () => {
      removeCourseStorage(course.code);
    })
  }
};

function storeCourse(courseInfo: Course): void {
  //Hämta webstorage
  const storageHistoryJson: any = localStorage.getItem("course-info");
  let storageHistoryArr: string = "";

  //kontroll om lagrat webstorage finns
  if (storageHistoryJson === null) {
    storageHistoryArr = "";
  } else {
    storageHistoryArr = JSON.parse(storageHistoryJson);
  }

  //skapa nytt kurs-objekt
  const storeCourse: Course = {
    code: courseInfo.code,
    name: courseInfo.name,
    progression: courseInfo.progression,
    syllabus: courseInfo.syllabus,
  };

  //konvertera till JSON
  const json: string = JSON.stringify(storeCourse);

  //lagra i webstorage
  localStorage.setItem(`${courseInfo.code}`, json);
}

function loadStorage(): void {

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(localStorage.key(i)) === null) {

    } else {
      console.log(localStorage.getItem(localStorage.key(i)));
      let storageHistory = {} as Course;

      storageHistory = JSON.parse(localStorage.getItem(localStorage.key(i)));

      printCourse(storageHistory);

    }
  }
}

function removeCourseStorage(code: string): void {
  localStorage.removeItem(code);
}

//Hämta DOM-element för formulär
const form = document.getElementById("add-course") as HTMLFormElement;

//Händelselyssnare för submit av formulär
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const storageHistoryJson: any = localStorage.getItem("course-info");
  let storageHistoryArr: Array<{ code: string, name: string, progression: string, syllabus: string }> = [];

  //kontroll om webstorge finns konvertera
  if (storageHistoryJson === null) {
    storageHistoryArr = [];
  } else {
    storageHistoryArr = JSON.parse(storageHistoryJson);
  };
  //Hämta DOM-element för input
  const codeInput = document.getElementById("code") as HTMLInputElement;
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const progInput = document.getElementById("prog") as HTMLInputElement;
  const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;

  //Hämta DOM-element för fellista
  const errors = document.getElementById("error-list") as HTMLUListElement;

  //Tömma fellista
  errors.innerHTML = "";

  let errorArr: string[] = [];

  //Validering
  if (codeInput.value === "") {
    errorArr.push("<li>Du måste ange kurskod</li>");
  } else if (codeInput.value !== "") {
    errorArr.shift;
  };
  if (nameInput.value === "") {
    errorArr.push("<li>Du måste ange kursnamn</li>");
  } else if (nameInput.value !== "") {
    errorArr.shift;
  };
  if (progInput.value === "") {
    errorArr.push("<li>Du måste ange progression</li>");
  } else if (progInput.value !== "") {
    errorArr.shift;
  }
  if (syllabusInput.value === "") {
    errorArr.push("<li>Du måste ange kurslänk</li>");
  } else if (syllabusInput.value !== "") {
    errorArr.shift;
  }

  //Validering input progression rätt format: A, B eller C
  if (progInput.value.toUpperCase() != "A" && progInput.value.toUpperCase() != "B" && progInput.value.toUpperCase() != "C") {
    errorArr.push("<li>Progression kan endast vara A, B eller C</li>");
  } else {
    errorArr.shift;
  }

  //Validering om kurskod redan finns inlagd
  storageHistoryArr.forEach(obj => {
    if (obj.code.includes(codeInput.value)) {
      errorArr.push("<li>Kurskoden finns redan inlagd</li>");
    } else {
      errorArr.shift;
    }
  });

  //loopar och skriver ut felmeddelanden till errorlist
  if (errorArr.length > 0) {
    errorArr.forEach(error => {
      errors.innerHTML += error;
    })
  };

  if (errorArr.length === 0) {
    //Skapa nytt kursobjekt
    const newCourse: Course = {
      code: codeInput.value,
      name: nameInput.value,
      progression: progInput.value.toUpperCase(),
      syllabus: syllabusInput.value,
    };

    //Töm inputfält
    form.reset();

    //Funktion för webstorage
    storeCourse(newCourse);

    //Funktion för utskrift
    printCourse(newCourse);
  }
});