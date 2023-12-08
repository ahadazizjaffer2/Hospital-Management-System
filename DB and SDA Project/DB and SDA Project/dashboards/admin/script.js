// Sidebar toggle functionality
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); // calling the function(optional)
});

document.querySelector('.logout').addEventListener('click', function () {
  // Clear all items in localStorage
    localStorage.clear();
});


// Function to change sidebar button (optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // replacing the icons class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); // replacing the icons class
  }
}

// Function to delete a doctor
async function deleteDoctor() {
  // Get the doctor ID from the input
  const doctorId = document.getElementById('doctorId').value;

  const RequestData = {
    doctorId: doctorId
  }

  try {
    // Send a DELETE request to the server
    const response = await fetch(`http://localhost:3000/user/remove-doctor`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify(RequestData),
    });

    // Check if the request was successful (status code 200-299)
    if (response.ok) {
      // Parse the JSON response
      const data = await response.json();

      // Check the response message
      if (data.success) {
        // Display a success message
        alert('Doctor deleted successfully!');
        // Optionally, update the UI or redirect to another page
      } else {
        // Display an error message
        alert('Error deleting doctor. Please try again.');
      }
    } else {
      // Handle non-successful response (e.g., display an error message)
      alert('Error deleting doctor. Please try again.');
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error:', error);
  }
}

function getAllDoctors() {
  const doctorsContainer = document.getElementById("getAllDoctors");

  if (doctorsContainer) {
    fetch("http://localhost:3000/patient/all-doctors")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const doctorData = data.data;

        doctorData.forEach(doctor => {
          const doctorCard = document.createElement("div");
          doctorCard.innerHTML = `<h3>${doctor.fullName}</h3><p>${doctor.description}</p><p>${doctor.specialization}</p><p>ID: ${doctor.doctorId}</p>`;
          doctorsContainer.appendChild(doctorCard);
        });
      })
      .catch(error => console.error("Error fetching doctors:", error));
  } else {
    console.error("Element with ID 'getAllDoctors' not found.");
  }
}

function CreateSchedule() {
  // Retrieve selected values from the form
  const docID = document.getElementById('doctorId').value;
  const day = document.getElementById('day').value;

  console.log(docID);
  console.log(day);

  const requestData = {
    doctorId: docID,
    day: day,
  };

  // Call the API to fetch doctors based on specialization and day
  fetch('http://localhost:3000/admin/create-doctor-schedule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then(response => response.json())
    .then(data => {
      // Display the list of doctors to the user
      console.log(data.message);
      alert(data.message);
    })
    .catch(error => {
      console.error('Error fetching doctors:', error);
    });

}

function createDoctorProfile() {
  const formID =  document.getElementById("doctorProfileForm");

  const firstNameInput = formID.querySelector('input[name="doctorFirstName"]');
  const lastNameInput = formID.querySelector('input[name="doctorLastName"]');
  const emailInput = formID.querySelector('input[name="doctorEmail"]');
  const passwordInput = formID.querySelector('input[ name="doctorPassword"]');
  const specialization = formID.querySelector('input[name="doctorSpecialty"]');
  const experience = formID.querySelector('input[name="doctorExperience"]');
  const fees = formID.querySelector('input[name="doctorFee"]');
  const desc = formID.querySelector('input[name="doctorDescription"]');

  // Prepare data for the API
  const formData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    specialization: specialization.value,
    experience: experience.value,
    fee: fees.value,
    description: desc.value,
  };

  console.log(formData);
  
  // Send data to the API
  fetch("http://localhost:3000/admin/create-doctor", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Doctor Successfully Created", data);
      alert(data.message);
      // Optionally, you can perform additional actions after successful signup
    })
    .catch(error => console.error("Error during creation:", error));
}
