const grade = document.getElementById("grades");

const grades = [
    {grade : "1.0 - 95", value : 1.0},
    {grade : "1.1 - 94", value : 1.1},
    {grade : "1.2 - 93", value : 1.2},
    {grade : "1.3 - 92", value : 1.3},
    {grade : "1.4 - 91", value : 1.4},
    {grade : "1.5 - 90", value : 1.5},
    {grade : "1.6 - 89", value : 1.6},
    {grade : "1.7 - 88", value : 1.7},
    {grade : "1.8 - 87", value : 1.8},
    {grade : "1.9 - 86", value : 1.9},
    {grade : "2.0 - 85", value : 2.0},
    {grade : "2.1 - 84", value : 2.1},
    {grade : "2.2 - 83", value : 2.2},
    {grade : "2.3 - 82", value : 2.3},
    {grade : "2.4 - 81", value : 2.4},
    {grade : "2.5 - 80", value : 2.5},
    {grade : "2.6 - 79", value : 2.6},
    {grade : "2.7 - 78", value : 2.7},
    {grade : "2.8 - 77", value : 2.8},
    {grade : "2.9 - 76", value : 2.9},
    {grade : "3.0 - 75", value : 3.0},
    {grade : "5.0 - Failure", value : 5.0},
];

function gradeOption(tagId, grades){
    grades.forEach((grade) => {
        let item = `
            <option value="${grade.value}">
                ${grade.grade}
            </option>
        `;

        tagId.innerHTML += item;
    });
}

gradeOption(grade, grades);