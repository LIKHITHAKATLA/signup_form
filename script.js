const passwordInput = document.getElementById("password");
const passwordStrength = document.getElementById("passwordStrength");
const confirmError = document.getElementById("confirmError");
// Password Strength Function 
function checkCustomPasswordStrength(password) {
  let cap = 0,
    small = 0,
    special = 0,
    num = 0;
  let specialChars = "!@#$%^&*()-_=+{}[]:;<>,.?/~`";
  for (let i = 0; i < password.length; i++) {
    let char = password[i];
    if (char >= "A" && char <= "Z") {
      cap++;
    } else if (char >= "a" && char <= "z") {
      small++;
    } else if (specialChars.includes(char)) {
      special++;
    } else if (!isNaN(char) && char !== " ") {
      num++;
    }
  }
  if (password === "") {
    return {
      message: "Please enter your password",
      color: "gray",
      level: 0,
    };
  } else if (
    cap >= 1 &&
    small >= 1 &&
    special >= 1 &&
    num >= 1 &&
    password.length > 7
  ) {
    return { message: "Strong Password", color: "green", level: 3 };
  } else if (
    small >= 1 && special >= 1 && num >= 1 
    || small >= 1 && special >= 1 && cap >=1 
    || cap >=1 && special >= 1 && num >= 1 
) {
    return { message: "Medium Password", color: "orange", level: 2 };
  } else {
    return { message: "Weak Password", color: "red", level: 1 };
  }
}
// Live check while typing
passwordInput.addEventListener("input", function () {
  const password = passwordInput.value;
  const strength = checkCustomPasswordStrength(password);
  passwordStrength.textContent = strength.message;
  passwordStrength.style.color = strength.color;
});
// On submit
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const password = passwordInput.value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const strength = checkCustomPasswordStrength(password); //calls the checkCustomPasswordStrength and checks the password strength 
    confirmError.textContent = "";
    //checking does the password length is >8 or not if not alert will shown
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }
    //checking the password and confirm password matches
    if (password !== confirmPassword) {
      confirmError.textContent = "Passwords do not match.";
      return;
    }
    alert("Sign Up Successful!");
    document.getElementById("signupForm").reset(); //after clicking signup button clearing the input values
    passwordStrength.textContent = ""; //clearing textcontent to empty
  });
