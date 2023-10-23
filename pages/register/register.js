let modalHTML = `
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
            -webkit-text-fill-color: transparent;">Username Already Exist !</p>
        </div>
    </div>
</div>
</div>
`;

const ARR_USER_DATA = localStorage.getItem('userDatabase');

document.body.insertAdjacentHTML('afterbegin', modalHTML);

// Register Set Data to JSON
$('#register-form').submit(function () {
    let dataArray = [];
    let userData = {};
    userData.userName = $('#username-input').val();
    userData.userPassword = $('#password-input').val();
    userData.userFullName = $('#fullname-input').val();
    userData.userBirthday = $('#birthday-input').val();
    userData.userEmail = $('#email-input').val();
    userData.userMobileNumber = $('#number-input').val();

    const ARR_USER_DATA = localStorage.getItem('userDatabase');
    if (ARR_USER_DATA != null) {
        let objectData = JSON.parse(ARR_USER_DATA);

        objectData.forEach(function (data) {
            if (userData.userName != data.userName) {
                objectData.push(userData);
                localStorage.setItem('userDatabase', JSON.stringify(objectData));
            } else {
                return showModal();
            }
        })

    } else {
        dataArray.push(userData);
        localStorage.setItem('userDatabase', JSON.stringify(dataArray));
    }
})

function showModal() {
    $('#staticBackdrop').removeClass("d-none");
    event.preventDefault();
    $("#staticBackdrop").modal('show');
}

function displayNone() {
    $('#staticBackdrop').addClass("d-none");
}