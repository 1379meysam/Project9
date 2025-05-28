const apiUrl = "http://localhost:5067/api/student";  // آدرس API را متناسب با پورت خودت تغییر بده

const studentsTableBody = document.querySelector("#studentsTable tbody");
const addBtn = document.getElementById("addBtn");
const addStudentSection = document.getElementById("addStudentSection");
const studentIdInput = document.getElementById("studentIdInput");
const studentNameInput = document.getElementById("studentNameInput");
const saveStudentBtn = document.getElementById("saveStudentBtn");
const cancelBtn = document.getElementById("cancelBtn");

// بارگذاری اولیه لیست دانشجوها
async function loadStudents() {
    try {
        const response = await fetch(apiUrl);
        const students = await response.json();
        renderTable(students);
    } catch (error) {
        alert("خطا در دریافت داده‌ها");
        console.error(error);
    }
}

// رسم جدول بر اساس داده‌ها
function renderTable(students) {
    studentsTableBody.innerHTML = "";
    students.forEach(student => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td><button data-id="${student.id}" class="deleteBtn">حذف</button></td>
        `;
        studentsTableBody.appendChild(tr);
    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", deleteStudent);
    });
}

// حذف دانشجو
async function deleteStudent(event) {
    const id = event.target.getAttribute("data-id");
    try {
        const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (res.ok) {
            loadStudents();
        } else {
            alert("حذف موفق نبود");
        }
    } catch (error) {
        alert("خطا در حذف");
        console.error(error);
    }
}

// نمایش فرم افزودن
addBtn.addEventListener("click", () => {
    addStudentSection.style.display = "block";
});

// لغو افزودن
cancelBtn.addEventListener("click", () => {
    addStudentSection.style.display = "none";
    studentIdInput.value = "";
    studentNameInput.value = "";
});

// ذخیره دانشجوی جدید
saveStudentBtn.addEventListener("click", async () => {
    const id = studentIdInput.value.trim();
    const name = studentNameInput.value.trim();
    if (!id || !name) {
        alert("لطفاً شماره دانشجویی و نام را وارد کنید");
        return;
    }

    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name })
        });
        if (res.ok) {
            addStudentSection.style.display = "none";
            studentIdInput.value = "";
            studentNameInput.value = "";
            loadStudents();
        } else {
            alert("خطا در ذخیره دانشجو");
        }
    } catch (error) {
        alert("خطا در ارسال داده");
        console.error(error);
    }
});

loadStudents();
