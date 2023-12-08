let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}

document.getElementById('showSpecializedDoctorsBtn').addEventListener('click', showSpecializedDoctors);

function showSpecializedDoctors() {
  // Retrieve selected values from the form
  const specialization = document.getElementById('doctor').value;
  const day = document.getElementById('day').value;

  console.log(specialization);
  console.log(day);

  const requestData = {
    specialization: specialization,
    day: day,
  };

  // Call the API to fetch doctors based on specialization and day
  fetch('http://localhost:3000/patient/get-specific-doctors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then(response => response.json())
    .then(data => {
      // Display the list of doctors to the user
      const doctorsArray = data.data;
      displayDoctors(doctorsArray);
      //console.log(doctorsArray);
    })
    .catch(error => {
      console.error('Error fetching doctors:', error);
    });

    selectedDoctorId = null;
}

let selectedDoctorId = null;

function displayDoctors(darray) {
  // Assuming response is the API response object
  const doctorsArray = darray; // Access the array of doctors under 'data'

  // Get the container where the doctor list will be displayed
  const doctorListContainer = document.getElementById('doctorList');

  // Clear previous doctor entries
  doctorListContainer.innerHTML = '';

  // Create a list of doctors
  doctorsArray.forEach(doctor => {
    // Create a container for each doctor
    const doctorContainer = document.createElement('div');
    doctorContainer.classList.add('doctor-entry');

    // Create HTML elements for doctor information
    const fullNameElement = document.createElement('p');
    fullNameElement.innerText = `Name: ${doctor.fullName}`;

    const specializationElement = document.createElement('p');
    specializationElement.innerText = `Specialization: ${doctor.specialization}`;

    const experienceElement = document.createElement('p');
    experienceElement.innerText = `Experience: ${doctor.experience} years`;

    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = `Description: ${doctor.description}`;

    // Add a click event listener to handle doctor selection
    doctorContainer.addEventListener('click', () => handleDoctorSelection(doctor));

    // Append elements to the doctor container
    doctorContainer.appendChild(fullNameElement);
    doctorContainer.appendChild(specializationElement);
    doctorContainer.appendChild(experienceElement);
    doctorContainer.appendChild(descriptionElement);

    // Append the doctor container to the doctor list container
    doctorListContainer.appendChild(doctorContainer);
  });
}

// Function to handle doctor selection
function handleDoctorSelection(selectedDoctor) {
  // Update the selected doctor ID variable
  selectedDoctorId = selectedDoctor.doctorId;

  // Highlight the selected doctor (optional, you can add a CSS class or style)
  const doctorContainers = document.querySelectorAll('.doctor-entry');
  doctorContainers.forEach(container => {
    container.classList.remove('selected');
  });

  event.currentTarget.classList.add('selected');

  console.log(selectedDoctor.doctorId);
  console.log(selectedDoctor.fullName);
}

// Function to handle 'Submit Appointment' button click
document.getElementById('CreateappointmentBtn').addEventListener('click', function (event) {
  event.preventDefault();

  // Retrieve selected values from the form
  const selectedDay = document.getElementById('day').value;
  const selectedTime = document.getElementById('time').value;
  const patientId = localStorage.getItem('PatientID');

  const requestData = {
    doctorId: selectedDoctorId,
    patientId: patientId,
    day: selectedDay,
    time: selectedTime
  };

  console.log(requestData);

  // Call the API to submit the appointment request
  // Replace 'YOUR_APPOINTMENT_API_ENDPOINT' with the actual API endpoint
  fetch('http://localhost:3000/patient/create-appointment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the appointment API, e.g., show a confirmation message
      console.log('Appointment request response:', data);
      alert(data.message);
    })
    .catch(error => {
      console.error('Error submitting appointment request:', error);
    });
});

document.querySelector('.logout').addEventListener('click', function () {
  // Clear all items in localStorage
    localStorage.clear();
});


function GetAllAppointments(){

  const patientID = localStorage.getItem('PatientID');
  const userType = "patient";

  const RequestData = {
    userId: patientID,
    userType: userType
  }

  console.log(RequestData);

  fetch('http://localhost:3000/patient/get-all-appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(RequestData),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const appointments = data.data;
    let appointmentsList = document.getElementById("pastAppointmentsList");
    for (let i=1;i<appointments.length;i++){
      const row = document.createElement("tr");
        row.innerHTML = `
          <td>${appointments[i].time}</td>
          <td>${appointments[i].day}</td>
          <td>${appointments[i].status}</td>
          <td>${appointments[i].remarks}</td>
          <td>${appointments[i].prescription}</td>
          <td>${appointments[i].DoctorProfile.specialization}</td>
        `;
        appointmentsList.appendChild(row);
    };
    console.log(data);
  })
  .catch(error => {
      console.error('Error:', error);
  });

}

function getAllDoctors() {
  const doctorsContainer = document.getElementById("getAllDoctors");

  if (doctorsContainer) {
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
      fetch("http://localhost:3000/patient/all-doctors")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const doctorData = data.data;

          const searchTerm = searchInput.value.toLowerCase();

          doctorsContainer.innerHTML = ""; // Clear previous results

          doctorData.forEach(doctor => {
            const fullName = doctor.fullName.toLowerCase();
            const description = doctor.description.toLowerCase();
            const specialization = doctor.specialization.toLowerCase();

            if (fullName.includes(searchTerm) || description.includes(searchTerm) || specialization.includes(searchTerm)) {
              const doctorCard = document.createElement("div");
              doctorCard.innerHTML = `
                <h3>${highlightKeyword(doctor.fullName, searchTerm)}</h3>
                <p>${highlightKeyword(doctor.description, searchTerm)}</p>
                <p>${highlightKeyword(doctor.specialization, searchTerm)}</p>
                
              `;
              doctorsContainer.appendChild(doctorCard);
            }
          });
        })
        .catch(error => console.error("Error fetching doctors:", error));
    } else {
      console.error("Element with ID 'searchInput' not found.");
    }
  } else {
    console.error("Element with ID 'getAllDoctors' not found.");
  }
}

// Function to highlight the search keyword
function highlightKeyword(text, keyword) {
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}

