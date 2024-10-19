async function handleFormSubmit(event) {
  event.preventDefault();

  const userDetails = {
    name: event.target.name.value,
    phone: event.target.phone.value,
    email: event.target.email.value,
  };

  // axios post api
  try {
    console.log("inside post api");
    response = await axios.post("http://localhost:3000/api/users", userDetails);
    console.log(response);
  } catch (error) {
    console.log("Error:", error.message);
  }


  // Clear the input fields
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";

  // reload the page
  window.location.reload();
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("inside get api");
    const response = await axios.get("http://localhost:3000/api/users");
    for (let i = 0; i < response.data.length; i++) {
      displayUserOnScreen(response.data[i]);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
});

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.name}    ${userDetails.phone}    ${userDetails.email}`
    )
  );
  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", (event) => {
    handleDelete(event, userList, userDetails);
  });

  editBtn.addEventListener("click", (event) => {
    document.getElementById("name").value = userDetails.name;
    document.getElementById("phone").value = userDetails.phone;
    document.getElementById("email").value = userDetails.email;
    userList.removeChild(event.target.parentElement);
    // Handle the edit submission
    const submitBtn = document.querySelector("form button");
    submitBtn.innerText = "Update";

    submitBtn.onclick = (event) => {
      event.preventDefault();
      userDetails.name = document.getElementById("name").value;
      userDetails.phone = document.getElementById("phone").value;
      userDetails.email = document.getElementById("email").value;

      handleEdit(userDetails);
      submitBtn.innerText = "Submit";
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("email").value = "";

      displayUserOnScreen(userDetails);
    };
  });
}

async function handleDelete(event, userList, userDetails) {
  userList.removeChild(event.target.parentElement);
  deleteUser(userDetails);
}

// update api
async function handleEdit(userDetails) {
  console.log("inside edit api");
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/users/${userDetails.id}`,
      {
        name: userDetails.name,
        phone: userDetails.phone,
        email: userDetails.email,
      }
    );
    console.log(response);
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

// delete api
async function deleteUser(userDetails) {
  console.log("inside delete api");
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/users/${userDetails.id}`
    );
    console.log(response);
  } catch (error) {
    console.log("Error:", error.message);
  }
}
