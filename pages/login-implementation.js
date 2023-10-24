let bootstrapModal = `
    <div class="modal fade d-none" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel" style="font-size: 2em; color: #e32b44;">Warning</h5>
                    <button type="button" class="btn-close text-light" data-bs-dismiss="modal" aria-label="Close"
                    onclick="return redirectLogin();"></button>
                </div>
                <div class="modal-body d-flex flex-column justify-content-center align-items-center py-4">
                    <p class="fs-3 fs-lg-5" style="
                        font-weight: 800;
                        background: #e32b44;
                        background-clip: border-box;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;">Please Sign In First !</p>
                    <button type="button" class="btn btn-danger"
                            style="width: 50%; border-radius: 25px; font-size: 1.5rem;" onclick="return redirectLogin();">Log In</button>
                </div>
            </div>
        </div>
    </div>
    `;

document.body.insertAdjacentHTML("beforeend", bootstrapModal);

const DATA_USER = localStorage.getItem("userDatabase");
const CURRENT_USER = localStorage.getItem('currentUser');

let dataObject;

// Document Ready function
$(() => {
    if (CURRENT_USER == null) {
        $('#staticBackdrop').removeClass("d-none");
        $("#staticBackdrop").modal('show');
    } else {
        dataObject = JSON.parse(DATA_USER);

        // For Profile Page to fetch and put innerHTML according to currentUser
        dataObject.forEach(function (data) {
            if (CURRENT_USER == data.userName) {
                document.getElementById('username').innerHTML = data.userName;
                // document.getElementById('password').innerHTML = data.userPassword;
                document.getElementById('nomor').innerHTML = data.userMobileNumber;
                document.getElementById('fullname').innerHTML = data.userFullName;
                document.getElementById('birthday').innerHTML = data.userBirthday;
                document.getElementById('email').innerHTML = data.userEmail;
            }
        });
    }
})

function redirectLogin() {
    $('#staticBackdrop').addClass("d-none");
    setTimeout(function () { window.location = "../login/login.html" });
}

function logout() {
    localStorage.removeItem('currentUser');
    setTimeout(function () { window.location = "../login/login.html" });
}