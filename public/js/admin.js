/**
 * Select main container to put information in.
 */
const userData = document.getElementById("user-data");

/**
 * Sends request to endpoint retrieving all user info.
 */
async function getUsers() {
    const res = await axios.get("http://localhost:3000/users");
    console.log(res.data);
    return res.data;
}

/**
 * Creates a table structure that can organize each user's information.
 */
function createTable() {
    const table = document.createElement("table");
    const id = document.createElement("th");
    const fName = document.createElement("th");
    const lName = document.createElement("th");
    const email = document.createElement("th");
    const state = document.createElement("th");

    const idTitle = document.createTextNode("ID");
    const fNameTitle = document.createTextNode("First Name");
    const lNameTitle = document.createTextNode("Last Name");
    const emailTitle = document.createTextNode("Email");
    const stateTitle = document.createTextNode("State");
    id.appendChild(idTitle);
    fName.appendChild(fNameTitle);
    lName.appendChild(lNameTitle);
    email.appendChild(emailTitle);
    state.appendChild(stateTitle);
    table.appendChild(id);
    table.appendChild(fName);
    table.appendChild(lName);
    table.appendChild(email);
    table.appendChild(state);
    userData.appendChild(table);
}

async function handleToggle(evt) {
    const target = evt.target.closest("tr");
    const id = target.children[0].innerText;
    const firstName = target.children[1].innerText;
    const lastName = target.children[2].innerText;
    const email = target.children[3].innerText;
    const state = target.children[4].innerText;
    let newState;
    if (state === "active") {
        newState = "inactive";
    } else if (state === "inactive") {
        newState = "pending";
    } else if (state === "pending") {
        newState = "active";
    }
    const updatedUser = await updateState({
        id,
        firstName,
        lastName,
        email,
        state: newState,
    });
    target.children[4].innerText = updatedUser.state;
    target.children[4].classList.remove(state);
    target.children[4].classList.add(newState);
}

async function updateState(user) {
    const { id, firstName, lastName, email, state } = user;
    const res = await axios.put(`http://localhost:3000/users/${id}`, {
        id,
        firstName,
        lastName,
        email,
        state,
    });
    return res.data;
}

/**
 * Creates a table row for each user to display their information accurately.
 */
async function populateTable() {
    const users = await getUsers();
    const table = document.body.querySelector("table");
    for (let user of users) {
        const id = document.createElement("td");
        const fName = document.createElement("td");
        const lName = document.createElement("td");
        const email = document.createElement("td");
        const state = document.createElement("td");
        state.classList.add("state-cell", user.state);
        const newRow = document.createElement("tr");
        id.innerText = user.id;
        fName.innerText = user.firstName;
        lName.innerText = user.lastName;
        email.innerText = user.email;
        state.innerText = user.state;
        state.addEventListener("click", handleToggle);
        newRow.appendChild(id);
        newRow.appendChild(fName);
        newRow.appendChild(lName);
        newRow.appendChild(email);
        newRow.appendChild(state);
        table.appendChild(newRow);
    }
}

createTable();
populateTable();
