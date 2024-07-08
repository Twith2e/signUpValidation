let userName = document.getElementById("userName");
let userMail = document.getElementById("email");
let userContact = document.getElementById("phoneNumber");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("password1");
let correctPassword = "";

let userDatabase = JSON.parse(localStorage.getItem("userDetails")) || [];

function storeDetails() {
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{4,15}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const numberRegex = /^0[789]\d{9}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/;

  if (usernameRegex.test(userName.value)) {
    if (emailRegex.test(userMail.value)) {
      if (numberRegex.test(userContact.value)) {
        if (password.value === confirmPassword.value) {
          if (passwordRegex.test(password.value)) {
            correctPassword = password.value;
            let confirmedUserInfo = {
              name: userName.value,
              mail: userMail.value,
              contact: userContact.value,
              password: correctPassword,
            };
            let userNameMatch = userDatabase.find(
              (data) => data.name === userName.value
            );
            let mailMatch = userDatabase.find(
              (data) => data.mail === userMail.value
            );
            if (mailMatch) {
              alert("You already have an acoount");
            } else if (userNameMatch) {
              alert("Username isn't available");
            }

            if (!mailMatch && !userNameMatch) {
              userDatabase.push(confirmedUserInfo);
              location.reload();
            }
            localStorage.setItem("userDetails", JSON.stringify(userDatabase));
          } else {
            alert(
              "Password must contain atleast one uppercase, one lowercase, one digit and a special character and must be atleast 8 digits long"
            );
          }
        } else {
          alert("make passwords are the same");
        }
      } else {
        alert("check your number again");
      }
    } else {
      alert("Input a correct email format");
    }
  } else {
    alert(
      "Input a username with min of 4 characters and max of 15 characters containing lowercase, uppercase, digits or special characters: _ and -"
    );
  }
}

function checkLoginDetails() {
  let mMatch = userDatabase.find((info) => info.mail === loginMail.value);
  if (mMatch) {
    if (mMatch.password === loginPassword.value) {
      alert("Login Successful!");
    } else {
      alert("Go and sign up");
      login.style.transform = "translateY(-200px)";
      location.reload();
    }
  } else {
    alert("Go and sign up");
    login.style.transform = "translateY(-200px)";
    location.reload();
  }
}
