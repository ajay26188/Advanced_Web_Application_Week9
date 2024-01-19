document.addEventListener('DOMContentLoaded',function () {
    console.log('Register page loaded!')
    const registration = document.getElementById('register');

    registration.addEventListener('submit',function (event) {
        event.preventDefault();

        const formData = new FormData(registration);
        const registrationInfo = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        fetch('users/register.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationInfo),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.href = '/login.html';
        })
        .catch(error => console.error(error))
    })

});
