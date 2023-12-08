const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector("#btn");

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
// Function to fetch and display all doctors
async function displayDoctors() {
  try {
    const response = await fetch('/api/get-doctors'); // Replace with your actual endpoint
    if (response.ok) {
      const doctors = await response.json();
      const doctorsTable = document.getElementById('doctorsTable');
      const tbody = doctorsTable.querySelector('tbody');

      // Clear existing rows
      tbody.innerHTML = '';

      // Populate the table with doctor data
      doctors.forEach((doctor) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${doctor.id}</td><td>${doctor.name}</td>`; // Add more columns as needed
        tbody.appendChild(row);
      });
    } else {
      console.error('Error fetching doctors:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

document.querySelector('.logout').addEventListener('click', function () {
  // Clear all items in localStorage
    localStorage.clear();
});


// Function to delete a doctor by ID
async function deleteDoctor() {
  const doctorId = document.getElementById('doctorId').value;

  try {
    const response = await fetch(`/api/delete-doctor/${doctorId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        // Display a success message
        alert('Doctor deleted successfully!');
        // Refresh the table to reflect the changes
        displayDoctors();
      } else {
        alert('Error deleting doctor. Please try again.');
      }
    } else {
      alert('Error deleting doctor. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Initial display of doctors when the page loads
//displayDoctors();
