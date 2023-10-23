let modalWrongLogin = `
<div class="modal fade d-none" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel" style="font-size: 2em; color: #e32b44;">Warning</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="displayNone();"></button>
        </div>
        <div class="modal-body d-flex flex-column justify-content-center align-items-center py-4">
            <p class="fs-3 fs-lg-5" style="
            font-weight: 800;
            background: #e32b44;
            background-clip: border-box;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">Wrong Username / Password !</p>
        </div>
    </div>
</div>
</div>
`;

let modalAlreadyLogged = `
<div class="modal fade d-none" id="staticBackdropLogged" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel" style="font-size: 2em; color: #e32b44;">Warning</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="redirectLogged();"></button>
        </div>
        <div class="modal-body d-flex flex-column justify-content-center align-items-center py-4">
            <p class="fs-3 fs-lg-5" style="
            font-weight: 800;
            background: #e32b44;
            background-clip: border-box;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">Already logged in !</p>
        </div>
    </div>
</div>
</div>
`;

document.body.insertAdjacentHTML('afterbegin', modalWrongLogin);
document.body.insertAdjacentHTML('afterbegin', modalAlreadyLogged);

// If already have user login Session / haven't logged out yet
const CURRENT_USER = localStorage.getItem('currentUser');

$(() => {
    if (CURRENT_USER != null) {
        showLoggedModal();
    }
})

// Verify username and password
const DATA_USER = localStorage.getItem("userDatabase");;
let dataObject;

if (DATA_USER != null) {
    dataObject = JSON.parse(DATA_USER);
}

function checkLogin() {
    if (dataObject == null) {
        showModal();
    } else {
        dataObject.forEach(function (data) {
            if (document.getElementById('username-login').value == data.userName && document.getElementById('password-login').value == data.userPassword) {
                // Set Which user does the login.
                let currentUser = document.getElementById('username-login').value;
                localStorage.setItem('currentUser', currentUser);

                setTimeout(function () { window.location = "../home/index.html" });
            } else {
                showModal();
            }
        })
    }
}

function showModal() {
    $('#staticBackdrop').removeClass("d-none");
    event.preventDefault();
    $("#staticBackdrop").modal('show');
}

function showLoggedModal() {
    $('#staticBackdropLogged').removeClass("d-none");
    $("#staticBackdropLogged").modal('show');
}

function displayNone() {
    $('#staticBackdrop').addClass("d-none");
}

function redirectLogged() {
    $('#staticBackdropLogged').addClass("d-none");
    setTimeout(function () { window.location = "../home/index.html" });
}