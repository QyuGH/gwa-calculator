const course = document.getElementById('course-table');
const addBtn = document.getElementById('add');
const tableBody = document.getElementById('table-body');
const message = document.getElementById('message');
const courseCode = document.getElementById('course-code');
const gradeInput = document.getElementById('grades');
const unitInput = document.getElementById('unit');
const calculate = document.getElementById('calculate');

let courses = [];
let courseId = 0;
let counter = 1;

const savedCourses = sessionStorage.getItem('courses');
const savedId = sessionStorage.getItem('courseId');
const savedCounter = sessionStorage.getItem('counter');
if (savedCourses && savedId && savedCounter) {
    courses = JSON.parse(savedCourses);
    courseId = parseInt(savedId);
    counter = parseInt(savedCounter);
    appendTable(courses, tableBody, message);
}   

function addCourse(){
    let courseCodeValue = courseCode.value;
    let gradeValue = gradeInput.value;
    let unitValue = parseInt(unitInput.value);
    let uniqueId = "c" + courseId;

    if (courseCodeValue === ""){
        courseCodeValue = "COURSE " + counter;
        counter++;
        sessionStorage.setItem('counter', counter.toString());
    }
    courseId++;

    courses.push({courseId: uniqueId, course: courseCodeValue, grade: gradeValue, unit: unitValue});
    sessionStorage.setItem('courses', JSON.stringify(courses));
    sessionStorage.setItem('courseId', courseId.toString());

    appendTable(courses, tableBody, message);
    resultContainer.style.display = "none";
    courseCode.value = "";
    gradeInput.selectedIndex = 0;
    unitInput.value = 3;
}

function appendTable(courses, tableBody, message){
    message.innerHTML = "";
    tableBody.innerHTML = "";

    courses.forEach(course => {
        let row = `
            <tr id="${course.courseId}" class="row">
                <td class="td-border caret-container">
                    <div class="course-code-container">
                        <p class="td-title">Course Code </i></p>
                        <span class="value course">${course.course}</span>
                    </div>
                    <button class="caret-btn" data-target="${course.courseId}">
                        <i class="fa-solid fa-caret-down"></i>
                    </button>
                </td>
                <td class="center-td td-border">
                    <p class="td-title">Grade</p>
                    <span class="value grade">${course.grade}</span>
                </td>
                <td class="center-td td-border">
                    <p class="td-title">Unit</p>
                    <span class="value unit">${course.unit}</span>
                </td>
                <td class="center-td table-btn">
                    <button data-target="${course.courseId}" class="trash-btn trash-icon">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                    <button data-target="${course.courseId}" class="trash-btn text-btn">
                        Delete Course
                    </button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}

let creditUnit = 0;
let totalUnit = 0;
let gwa = 0;
const resultContainer = document.getElementById("result");

function calculateGWA(){

    if (courses.length === 0){
        resultContainer.style.display = "block";
        resultContainer.innerHTML = "No courses added!";
        return;
    }

    courses.forEach(course => {
        creditUnit += course.grade * course.unit;
        totalUnit += parseInt(course.unit);
    });

    gwa = creditUnit / totalUnit;
    resultContainer.style.display = "block";
    resultContainer.innerHTML = `
        <div class="gwa-result">
            <p><strong>📊 Your General Weighted Average (GWA) is:</strong></p>
            <h2>${gwa.toFixed(2)}</h2>
        </div>
    `;

}

tableBody.addEventListener("click", function(e) {
    const trashBtn = e.target.closest(".trash-btn");
    const caretBtn = e.target.closest(".caret-btn");
    
    if (trashBtn) {
        const id = trashBtn.dataset.target;
        
        const index = courses.findIndex(course => course.courseId === id);
        
        if (index !== -1) {
            courses.splice(index, 1);
            sessionStorage.setItem("courses", JSON.stringify(courses));
            appendTable(courses, tableBody, message);
            
            if (courses.length === 0) {
                message.innerHTML = "<p>No course added yet...</p>";
            }
        }
    }

    if (caretBtn) {
        const targetId = caretBtn.dataset.target;
        const targetRow = document.getElementById(targetId);
        
        if (targetRow) {
            
            const centerTds = targetRow.querySelectorAll('.center-td');
            const caretIcon = caretBtn.querySelector('i');
            
            centerTds.forEach(td => {
                if (td.style.display === 'none' || td.style.display === '') {
                    td.style.display = 'flex';
                    caretIcon.classList.remove('close');
                    caretIcon.classList.add('rotate');
                } else {
                    td.style.display = 'none';
                    caretIcon.classList.remove('rotate');
                    caretIcon.classList.add('close')
                }
            });
        }
    }

});

addBtn.addEventListener("click", () => addCourse());
calculate.addEventListener("click", () => calculateGWA()); 