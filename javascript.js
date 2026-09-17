// // EmailJS Initialization
// (function () {
//   emailjs.init("_BrC7wu4_hA-vmC5C");
// })();

// // DOM Elements
// const modal = document.getElementById("modal");
// const joinBtn = document.getElementById("joinBtn");
// const closeBtn = document.getElementById("closeBtn");
// const joinForm = document.getElementById("joinForm");

// // 1. Open Modal when "Join Now" is clicked
// joinBtn.onclick = function (e) {
//   e.preventDefault();
//   modal.style.display = "flex";
// };

// // 2. Close Modal when 'x' is clicked
// closeBtn.onclick = function () {
//   modal.style.display = "none";
// };

// // 3. Close Modal when clicking outside the box
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };


// joinForm.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const submitBtn = document.getElementById("submitBtn");
//   submitBtn.innerText = "Sending...";
//   submitBtn.disabled = true;

//   const templateParams = {
//     from_name: document.getElementById("user_name").value,
//     email: document.getElementById("user_email").value,
//     phone_number: document.getElementById("user_phone").value,
//     order_details: "Selected Plan: " + document.getElementById("user_plan").value,
//     shipping_address: "Gym Membership Signup"
//   };

//   emailjs
//     .send("service_ngs68t5", "template_o9r9y24", templateParams)
//     .then(() => {
//       alert("Registration Successful! Details received.");
//       joinForm.reset();
//       modal.style.display = "none";
//       submitBtn.innerText = "Submit Details";
//       submitBtn.disabled = false;
//     })
//     .catch((error) => {
//       alert("Failed to send message: " + JSON.stringify(error));
//       submitBtn.innerText = "Submit Details";
//       submitBtn.disabled = false;
//     });
// });


// EmailJS Initialization
(function () {
  emailjs.init("_BrC7wu4_hA-vmC5C");
})();

// DOM Elements
const authScreen = document.getElementById("authScreen");
const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const mainContent = document.getElementById("mainContent");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const logoutBtn = document.getElementById("logoutBtn");

const modal = document.getElementById("modal");
const joinBtn = document.getElementById("joinBtn");
const closeBtn = document.getElementById("closeBtn");
const joinForm = document.getElementById("joinForm");

// Check Active Session on Page Load
window.onload = function() {
  if (localStorage.getItem("isLoggedIn") === "true") {
    authScreen.style.display = "none";
    mainContent.style.display = "block";
  }
};

// Toggle Between Login & Sign Up Screens
showSignup.addEventListener("click", function(e) {
  e.preventDefault();
  loginBox.style.display = "none";
  signupBox.style.display = "block";
});

showLogin.addEventListener("click", function(e) {
  e.preventDefault();
  signupBox.style.display = "none";
  loginBox.style.display = "block";
});

// 1. SIGN UP LOGIC (Save Account in LocalStorage)
signupForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const userData = {
    name: name,
    email: email,
    password: password
  };

  localStorage.setItem("registeredUser", JSON.stringify(userData));
  alert("Account Created Successfully! Ab Login Karein.");
  
  signupForm.reset();
  signupBox.style.display = "none";
  loginBox.style.display = "block";
});

// 2. LOGIN LOGIC (Verify Credentials)
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (savedUser && savedUser.email === email && savedUser.password === password) {
    localStorage.setItem("isLoggedIn", "true");
    authScreen.style.display = "none";
    mainContent.style.display = "block";
  } else {
    alert("Invalid Email/Password or Account does not exist! Pehle Sign Up karein.");
  }
});

// 3. LOGOUT LOGIC
logoutBtn.addEventListener("click", function() {
  localStorage.removeItem("isLoggedIn");
  location.reload();
});

// 4. JOIN MODAL LOGIC
joinBtn.onclick = function (e) {
  e.preventDefault();
  modal.classList.add("active");
};

closeBtn.onclick = function () {
  modal.classList.remove("active");
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("active");
  }
};

// 5. EMAILJS FORM SUBMISSION
joinForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.innerText = "Sending Message...";
  submitBtn.disabled = true;

  const templateParams = {
    from_name: document.getElementById("user_name").value,
    email: document.getElementById("user_email").value,
    phone_number: document.getElementById("user_phone").value,
    order_details: "Plan Selected: " + document.getElementById("user_plan").value,
    shipping_address: "Gym Membership Inquiry"
  };

  emailjs
    .send("service_ngs68t5", "template_o9r9y24", templateParams)
    .then(() => {
      alert("Message Sent Successfully! We will contact you soon.");
      joinForm.reset();
      modal.classList.remove("active");
      submitBtn.innerText = "Send Message";
      submitBtn.disabled = false;
    })
    .catch((error) => {
      alert("Failed to send message: " + JSON.stringify(error));
      submitBtn.innerText = "Send Message";
      submitBtn.disabled = false;
    });
});