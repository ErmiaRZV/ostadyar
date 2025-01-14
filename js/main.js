let addBtn = document.querySelector("#addBtn");
let editBtn = document.querySelector("#editBtn");
let fullName = document.querySelector("#fullname");
let studentNumber = document.querySelector("#studentnumber");
let score = document.querySelector("#score");
let done = document.querySelector("#done");
let search = document.querySelector("#search");
let resultDiv = document.querySelector("#resultDiv");
let searchResult = document.querySelector("#resultDiv>#searchResult");
let resultDivChildren = document.querySelectorAll("#searchResult>span");
let inp = document.querySelectorAll('input')

let counter = 0;
let studentId = [0];

let result = [];

if (localStorage.getItem('students') == null) {
    result = []
    localStorage.setItem('students',JSON.stringify(result))
    
   
}else{
    result = JSON.parse(localStorage.getItem('students'))
    result.map((val)=>{
        let span = document.createElement("span");
        span.setAttribute("data-id", counter);
        span.innerHTML =
          "Fullname : " +
          val.fullname +
          " | Student number : " +
          val.studentnumber +
          " | Score : " +
          val.score +
          `<span onclick="dell(this)" data-id='${counter}'  class="del ps-2 ms-3 text-[red] z-50 relative cursor-pointer">Delete</span>` +
          `<span data-id='${counter}' onclick="editt(this)" class="edit ms-3 ps-2 text-[yellow] cursor-pointer">Edit</span>`;
        counter++;
        span.classList.add("spans");
        resultDiv.appendChild(span);
    })
}


addBtn.addEventListener("click", () => {
  let flagAdd = true;
  if (fullName.value == "" || studentNumber.value == "" || score.value == "") {
    flagAdd = false;
    fullName.style.border='1px solid red'
    score.style.border='1px solid red'
    studentNumber.style.border='1px solid red'
    setTimeout(() => {
        fullName.style.border='1px solid black'
        score.style.border='1px solid black'
        studentNumber.style.border='1px solid black'
    }, 2000);
  }

  studentId.map((val) => {
    if (val == studentNumber.value) {
      flagAdd = false;
    studentNumber.style.border='1px solid red'
    setTimeout(() => {
        studentNumber.style.border='1px solid black'
    }, 2000);
    }
  });
  if (flagAdd == true) {
    let span = document.createElement("span");
    span.setAttribute("data-id", counter);
    span.innerHTML =
      "Fullname : " +
      fullName.value +
      " | Student number : " +
      studentNumber.value +
      " | Score : " +
      score.value +
      `<span onclick="dell(this)" data-id='${counter}'  class="del ps-2 ms-3 text-[red] z-50 relative cursor-pointer">Delete</span>` +
      `<span data-id='${counter}' onclick="editt(this)" class="edit ms-3 ps-2 text-[yellow] cursor-pointer">Edit</span>`;
    counter++;
    span.classList.add("spans");
    resultDiv.appendChild(span);

    fullName.focus();
    let student = {
      fullname: fullName.value,
      studentnumber: studentNumber.value,
      score: score.value,
    };
    studentId.push(studentNumber.value);
    result.push(student);
    localStorage.setItem('students',JSON.stringify(result))
    
    fullName.value = "";
    studentNumber.value = "";
    score.value = "";
  }
});

let ind;
let span = document.createElement("span");
span.classList.add("spanr");
searchResult.appendChild(span);
search.addEventListener("keyup", () => {
  let flag = false;
  result.map((val, i) => {
    if (val.studentnumber == search.value) {
      flag = true;
      ind = i;
    }

    if (flag == true) {
      span.innerHTML =
        "Fullname : " +
        result[ind].fullname +
        " | Student number : " +
        result[ind].studentnumber +
        " | Score : " +
        result[ind].score;
    } else {
      span.innerHTML = "";
    }
  });
});
function dell(s) {

  let getId = s.getAttribute("data-id");
  
  result[getId] = "";

  let newResult = result.filter((val,i)=>{
    return i!=getId && val !=""
  })
  
  s.parentElement.style.display = "none ";
  localStorage.setItem('students',JSON.stringify(newResult))
}
let getId;
let oldStudentNumber;
function editt(s) {
  
  fullName.focus();
  let edit = document.querySelectorAll(".edit");
  getId = s.getAttribute("data-id");
  oldStudentNumber = result[getId].studentnumber;
 

  editBtn.style.display = "flex";
  addBtn.style.display = "none";

  fullName.value = result[getId].fullname;
  studentNumber.value = result[getId].studentnumber;
  score.value = result[getId].score;
}

editBtn.addEventListener("click", () => {
  let flagEdit = true;
  if (fullName.value == "" || studentNumber.value == "" || score.value == "") {
    flagEdit = false;
  }

  studentId.map((val) => {
    if (
      val == studentNumber.value &&
      studentNumber.value != result[getId].studentnumber
    ) {
      flagEdit = false;
    }
  });
  if (flagEdit == true) {
    studentId.map((val,i)=>{
        if (val == oldStudentNumber) {
            studentId.splice(i,1)
        }
    })
    result[getId].fullname = fullName.value;
    result[getId].studentnumber = studentNumber.value;
    result[getId].score = score.value;
    localStorage.setItem('students',JSON.stringify(result))
    editBtn.style.display = "none";
    addBtn.style.display = "flex";
    studentId.push(studentNumber.value);
    resultDiv.children[parseInt(getId) + 2].innerHTML =
      "Fullname : " +
      fullName.value +
      " | Student number : " +
      studentNumber.value +
      " | Score : " +
      score.value +
      `<span onclick="dell(this)" data-id='${getId}'  class="del ps-2 ms-3 text-[red] z-50 relative cursor-pointer">Delete</span>` +
      `<span data-id='${getId}' onclick="editt(this)" class="edit ms-3 ps-2 text-[yellow] cursor-pointer">Edit</span>`;
    fullName.value = "";
    studentNumber.value = "";
    score.value = "";
    fullName.focus();
  }
});

inp.forEach((val,i)=>{
    val.addEventListener('keyup',(e)=>{
        if (i!=3) {
            if ((e.keyCode || e.which) == 13) {
                addBtn.click()
            }
        }
        
    })
})