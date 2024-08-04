const addForm = document.getElementById("addForm");
const editForm = document.getElementById("editForm");
const stdEditId = document.getElementById("stdEditId");

async function app() {
  try {
    const res = await fetch("http://localhost:4545/api/New");
    const data = await res.json();
    display(data);
  } catch (error) {
    console.log(error);
  } finally {
  }
}
app();

async function Deletestd(_id) {
  const res = await fetch(`http://localhost:4545/api/New/${_id}`, {
    method: "DELETE",
  });
  window.location.reload();

  const deleteStd = await res.json();
  console.log(deleteStd);
}

editForm.addEventListener("submit", updatestd);

async function updatestd(event) {
  event.preventDefault();
  try {
    const editdata = {
      FirstName: editForm.fname.value,
      LastName: editForm.lname.value,
      RollNumber: editForm.rollNo.value,
      Email: editForm.email.value,
    };
    const res = await fetch(
      `http://localhost:4545/api/New/${editForm.stdId.value}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editdata),
      }
    );
    const updated = await res.json();
    console.log(updated);
  } catch (error) {
    console.log(error);
  } finally {
    // document.getElementById("staticBackdrop").style.display = "none";
  }
}

function display(data) {
  let tableBody = document.getElementById("Tbody");
  console.log(data);
  Object.values(data).forEach((student) => {
    console.log(student._id);
    tableBody.innerHTML += `
    <tr id="${student._id}" class="fst-italic">
    <td>${student.RollNumber}</td>
    <td>${student.FirstName}</td>
    <td>${student.LastName}</td>
    <td>${student.Email}</td>
    <td>
    <button type="button" onClick="Deletestd('${student._id}')" class="btn btn-danger">Delete</button>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
      onClick="pvtm('${student._id}')">
         Edit    
    </button>
    </td>
    </tr>
    `;
  });
}

async function pvtm(a) {
  try {
    const res = await fetch(`http://localhost:4545/api/New/${a}`);
    const data = await res.json();
    console.log(data);
    editForm.stdId.value = data._id;
    editForm.fname.value = data.FirstName;
    editForm.lname.value = data.LastName;
    editForm.rollNo.value = data.RollNumber;
    editForm.email.value = data.Email;
  } catch (error) {
    console.log(error);
  }
}

const send = async (data = {}) => {
  const res = await fetch("http://localhost:4545/api/New", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  window.location.reload();
  const returnData = await res.json();
  return returnData;
};

addForm.addEventListener("submit", newfunc);
function newfunc(event) {
  event.preventDefault();
  data = {
    FirstName: addForm.fname.value,
    LastName: addForm.lname.value,
    RollNumber: addForm.rollNo.value,
    Email: addForm.email.value,
  };
  //   console.log(data);
  send(data)
    .then((returnData) => {
      if (!returnData.message) {
        console.log(returnData);
        alert("Student Added Success Fully");
      } else {
        alert(returnData.message);
      }
    })
    .catch((e) => console.log(e));
}
