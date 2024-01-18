document.addEventListener('DOMContentLoaded',function () {
    const login = document.getElementById('login');

    login.addEventListener('submit',function (event) {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const loginInfo = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInfo),
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('auth_token',data.token);

            window.location.href = '/';
        })
    })

});
