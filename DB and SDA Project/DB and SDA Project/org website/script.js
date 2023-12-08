document.addEventListener('DOMContentLoaded', function () {
  // Selecting elements
  const formOpenBtn1 = document.querySelector("#form-open-1");
  const formOpenBtn2 = document.querySelector("#form-open-2");
  const formOpenBtn3 = document.querySelector("#form-open-3");
  const formCloseBtn = document.querySelector(".form_close");
  const home = document.querySelector(".home");
  const formContainer = document.querySelector(".form_container");
  const pwShowHide = document.querySelectorAll(".pw_hide");

  // Event listeners for opening and closing the forms
  formOpenBtn1.addEventListener("click", () => showForm("login-form-1"));
  formOpenBtn2.addEventListener("click", () => showForm("login-form-2"));
  formOpenBtn3.addEventListener("click", () => showForm("login-form-3"));
  formCloseBtn.addEventListener("click", () => hideForm());

  const signupNowBtn = document.querySelector("#signupsubmit");
  const newSignupNowBtn = document.querySelector("#newsignup");

  // Event listener for signup button
  signupNowBtn.addEventListener("click", (event) => {
    event.preventDefault();
    handleSignupForm("signup-form-1");
  });
  newSignupNowBtn.addEventListener("click", (event) => {
    event.preventDefault();
    showForm("signup-form-1");
  });

  // Add these lines for each login button
  const login1 = document.querySelector("#loginbtn1");
  const login2 = document.querySelector("#loginbtn2");
  const login3 = document.querySelector("#loginbtn3");

  login1.addEventListener("click", (event) => {
    event.preventDefault();
    handleLoginForm("login-form-1", "loginbtn1");
  });

  login2.addEventListener("click", (event) => {
    event.preventDefault();
    handleLoginForm("login-form-2", "loginbtn2");
  });

  login3.addEventListener("click", (event) => {
    event.preventDefault();
    handleLoginForm("login-form-3", "loginbtn3");
  });


  // Event listener for toggling password visibility
  pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => togglePasswordVisibility(icon));
  });

  // Event listeners for showing the signup forms from login forms
  document.querySelectorAll('.login_signup a').forEach((signupLink) => {
    signupLink.addEventListener("click", function(e) {
      e.preventDefault();
      // Find the closest login form
      const loginForm = this.closest(".form");
      // Extract the number from the login form's ID
      const loginFormNumber = loginForm.id.replace("login-form-", "");
      // Construct the ID of the corresponding signup form
      const signupFormId = "signup-form-" + loginFormNumber;
      // Hide the login form
      loginForm.style.display = "none";
      // Show the corresponding signup form
      const signupForm = document.getElementById(signupFormId);
      signupForm.style.display = "block";
    });
  });

  // Event listeners for showing the login forms from signup forms
  document.querySelectorAll('.login_signup a').forEach((loginLink) => {
    loginLink.addEventListener("click", function(e) {
      e.preventDefault();
      // Find the closest signup form
      const signupForm = this.closest(".form");
      // Extract the number from the signup form's ID
      const signupFormNumber = signupForm.id.replace("signup-form-", "");
      // Construct the ID of the corresponding login form
      const loginFormId = "login-form-" + signupFormNumber;
      // Hide the signup form
      signupForm.style.display = "none";
      // Show the corresponding login form
      const loginForm = document.getElementById(loginFormId);
  //    loginForm.style.display = "block";
    });
  });

  // Function to show the specified form
  function showForm(formId) {
    // Show the form container
    formContainer.style.opacity = "1";
    formContainer.style.pointerEvents = "auto";

    // Show the home section
    home.classList.add("show");

    // Hide all forms
    document.querySelectorAll(".form").forEach((form) => {
      form.style.display = "none";
    });

    // Show the selected form
    const selectedForm = document.getElementById(formId);
    selectedForm.style.display = "block";
  }

  // Function to hide the form
  function hideForm() {
    // Hide the form container
    formContainer.style.opacity = "0";
    formContainer.style.pointerEvents = "none";

    // Hide all forms
    document.querySelectorAll(".form").forEach((form) => {
      form.style.display = "none";
    });

    // Hide the home section
    home.classList.remove("show");
  }

  // Function to toggle password visibility
  function togglePasswordVisibility(icon) {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  }

  // Function to handle signup form submission
  function handleSignupForm(formId) {
    const signupForm = document.getElementById(formId);
    const firstNameInput = signupForm.querySelector('input[name="firstName"]');
    const lastNameInput = signupForm.querySelector('input[name="lastName"]');
    const emailInput = signupForm.querySelector('input[type="email"]');
    const passwordInput = signupForm.querySelector('input[type="password"]');
    const bloodGroupInput = signupForm.querySelector('input[name="bloodGroup"]');
    const genderInput = signupForm.querySelector('select[name="genders"]');
    const ageInput = signupForm.querySelector('input[name="age"]');

    // Prepare data for the API
    const formData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      bloodGroup: bloodGroupInput.value,
      age: ageInput.value,
      gender: genderInput.value,
      
      // Add other properties as needed
    };
    console.log(formData);
    
    // Send data to the API
    fetch("http://localhost:3000/patient/create-patient", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Signup successful:", data);
        alert("Done");
        // Optionally, you can perform additional actions after successful signup
      })
      .catch(error => console.error("Error during signup:", error));
  }


  // Function to handle login form submission
  function handleLoginForm(formId, loginBtnId) {
    const loginForm = document.getElementById(formId);
    const emailInput = loginForm.querySelector('input[name="email"]');
    const passwordInput = loginForm.querySelector('input[name="password"]');

  // Check if the elements are found
    if (!emailInput || !passwordInput) {
      alert("Error: Email or password input not found.");
      return;
    }

    // Get the dashboard link corresponding to the form
    let dashboardLink;
    switch (formId) {
      case "login-form-1":
        dashboardLink = '../dashboards/patient/dashboard.html'; // Replace with the actual link for patient dashboard
        break;
      case "login-form-2":
        dashboardLink = '../dashboards/doctor/dashboard.html'; // Replace with the actual link for doctor dashboard
        break;
      case "login-form-3":
        dashboardLink = '../dashboards/admin/dashboard.html'; // Replace with the actual link for admin dashboard
        break;
      default:
        console.error("Invalid form ID");
        return;
    }

    // Prepare data for the API
    const formData = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    console.log(formData);

    // Replace 'YOUR_LOGIN_API_ENDPOINT' with the actual endpoint for the current form
    let loginApiEndpoint;
    switch (formId) {
      case "login-form-1":
        loginApiEndpoint = 'http://localhost:3000/auth/patient-login';
        break;
      case "login-form-2":
        loginApiEndpoint = 'http://localhost:3000/auth/doctor-login';
        break;
      case "login-form-3":
        loginApiEndpoint = 'http://localhost:3000/auth/admin-login';
        break;
      default:
        console.error("Invalid form ID");
        return;
    }

    // Send data to the API
    fetch(loginApiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        console.log(response.status);
        if (!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Check if login was successful
        if (data) {
          console.log("Login successful:", data.message);

          // Store the access token (replace 'yourAccessTokenKey' with an appropriate key)
          localStorage.setItem('yourAccessTokenKey', data.data.accessToken);

          switch (formId) {
            case "login-form-1":
              localStorage.setItem(`FirstName`, data.data.patient.firstName);
              localStorage.setItem(`LastName`, data.data.patient.lastName);
              localStorage.setItem(`Email`, data.data.patient.email);
              localStorage.setItem(`BloodGroup`, data.data.patient.PatientProfile.bloodGroup);
              localStorage.setItem(`Age`, data.data.patient.PatientProfile.age);
              localStorage.setItem(`Gender`, data.data.patient.PatientProfile.gender);
              localStorage.setItem(`PatientID`, data.data.patient.PatientProfile.id);

              break;
            case "login-form-2":
              localStorage.setItem(`FirstName`, data.data.doctor.firstName);
              localStorage.setItem(`LastName`, data.data.doctor.lastName);
              localStorage.setItem(`Email`, data.data.doctor.email);
              localStorage.setItem(`Specialization`, data.data.doctor.DoctorProfile.specialization);
              localStorage.setItem(`Experience`, data.data.doctor.DoctorProfile.experience);
              localStorage.setItem(`Description`, data.data.doctor.DoctorProfile.description);
              break;
            case "login-form-3":
              localStorage.setItem(`FirstName`, data.data.admin.firstName);
              localStorage.setItem(`LastName`, data.data.admin.lastName);
              localStorage.setItem(`Email`, data.data.admin.email);
              break;
            default:
              console.error("Invalid form ID");
              return;
          }

          window.location.href = dashboardLink;
        } else {
          console.log("Login failed:", data.message);
          // Handle login failure, e.g., show an error message to the user
        }
      })
      .catch(error => console.error("Error during login:", error));
  }

});

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
          doctorCard.innerHTML = `<h3>${doctor.fullName}</h3><p>${doctor.description}</p><p>${doctor.specialization}</p><hr>`;
          doctorsContainer.appendChild(doctorCard);
        });
      })
      .catch(error => console.error("Error fetching doctors:", error));
  } else {
    console.error("Element with ID 'getAllDoctors' not found.");
  }
}