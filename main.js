import { Home } from "./pages/Home.js";
import { Signup } from "./pages/SignUp.js";
import { Login } from "./pages/Login.js";
import { Profile } from "./pages/Profile.js";

const main = document.getElementById("main");

let paths = [];

let routes = {
  "home": Home,
  "signup": Signup,
  "login": Login,
  "profile": Profile,
};

changeRoute("home");


function changeRoute(newRoute = "home") {
  paths.push(newRoute);
  goToPages();  
}

function goToPages() {
  const route = paths[paths.length - 1];
  main.innerHTML = routes[route]
    ? `<div class="container">
        ${paths.length > 1 ? "<div class\=\"nav\" id=\"back\"><-</div>" : ""}
    ${routes[route]}
    </div>`
    : `<div>
    <div class="nav" id="back"><-</div>
    This page is not found
    </div>`;


  paths.length > 1 && handleBack();

  if (paths[paths.length - 1] == "home") {
    const signupBtn = document.getElementById("signupBtn");
    const loginBtn = document.getElementById("loginBtn");
    signupBtn.addEventListener("click", () => changeRoute("signup"));
    loginBtn.addEventListener("click", () => changeRoute("login"));
  }

  if (paths[paths.length - 1] == "signup") {
    const signForm = document.getElementById("signupForm");
    signForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const birthDate = document.getElementById("birthDate").value;
      localStorage.setItem("user", JSON.stringify({ name, email, password, birthDate }));
      alert("sign up success");
      changeRoute("login");
    });
  }

  if (paths[paths.length - 1] == "login") {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.email === email && user.password === password) {
        alert("Login successful!");

        const age = (new Date()).getFullYear() - (new Date(user.birthDate)).getFullYear();
        changeRoute("profile");

        let profileUsername = document.getElementById("username")
        let profileUserEmail = document.getElementById("userEmail")
        let profileUserAge = document.getElementById("userAge")
        profileUsername.innerHTML = user.name;
        profileUserEmail.innerHTML = user.email;
        profileUserAge.innerHTML = age;
      } else {
        alert("Invalid email or password!");
      }
    });
  }
}


function handleBack (){
  console.log("Back")
  const backBtn = document.getElementById("back")

  backBtn.onclick = (e)=>{
    e.preventDefault();
    paths.pop();
    goToPages();
  }
}