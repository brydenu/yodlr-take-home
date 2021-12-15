const signupForm = document.getElementById("signup-form");
const fNameInput = document.getElementById("fn-input");
const lNameInput = document.getElementById("ln-input");
const emailInput = document.getElementById("email-input");
const formBtn = document.getElementById("form-btn");

async function handleSubmit(evt) {
    evt.preventDefault();
    const userInfo = {
        firstName: fNameInput.value,
        lastName: lNameInput.value,
        email: emailInput.value,
    };
    const res = await axios.post("http://localhost:3000/users", userInfo);
    console.log(res.data);
    window.location.replace("index.html");
    return res.data;
}

signupForm.addEventListener("submit", handleSubmit);
