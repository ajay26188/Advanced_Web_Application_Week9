document.addEventListener('DOMContentLoaded',function () {
    const registration = document.getElementById('register');

    registration.addEventListener('submit',function (event) {
        event.preventDefault();

        const formData = new FormData(registration);
        const registrationInfo = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationInfo),
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = '/login.html';
        })
    })

});
