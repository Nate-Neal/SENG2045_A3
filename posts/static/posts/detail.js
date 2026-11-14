const backBtn = document.getElementById('back-btn')
const updateBtn = document.getElementById('update-btn')
const deleteBtn = document.getElementById('delete-btn')
const url = `${window.location.pathname.replace(/\/$/, '')}/data/`;
const updateUrl = `${window.location.pathname.replace(/\/$/, '')}/update/`;
const deleteUrl = `${window.location.pathname.replace(/\/$/, '')}/delete/`;
const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')
const spinnerBox = document.getElementById('spinner-box')
const postBox = document.getElementById('post-box')
const csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value;
const titleInput = document.getElementById('id_title');
const bodyInput = document.getElementById('id_body');
const alertBox = document.getElementById('alert-box')
console.log(window.location)

$.ajax({
    type: 'GET',
    
    url: url,

    success:function(response){
        console.log(response)
        const data = response.data

        console.log('Author:', data.author)
        console.log('Logged-in user:', data.logged_in)

        if (data.logged_in !== data.author) {
            console.log('different')
        } else {
            console.log('thesame')
            updateBtn.classList.remove('not-visible')
            deleteBtn.classList.remove('not-visible')
        }
        const titleEL = document.createElement('h3')
        titleEL.setAttribute('class', 'mt-3')
        titleEL.setAttribute('id', 'title')


        const bodyEL = document.createElement('p')
        bodyEL.setAttribute('class', 'mt-1')
        bodyEL.setAttribute('id', 'body')

        titleEL.textContent = data.title
        bodyEL.textContent = data.body

        postBox.appendChild(titleEL)
        postBox.appendChild(bodyEL)
        spinnerBox.classList.add('not-visible')
    },
    error: function(error){
        console.log(error)
    }
})


updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const csrf = updateForm.querySelector('[name="csrfmiddlewaretoken"]').value;

    $.ajax({
        type: 'POST',
        url: updateUrl,
        data: {
            'csrfmiddlewaretoken': csrf,
            'title': titleInput.value,
            'body': bodyInput.value,
        },
        success: function(response) {
            console.log(response);
            handleAlerts('success', 'Post has been updated')
            title.textContent = response.title
            body.textContent = response.body
        },
        error: function(error) {
            console.log(error);
        }
    });
});


deleteForm.addEventListener('submit', e => {
    e.preventDefault();

    const csrf = deleteForm.querySelector('[name="csrfmiddlewaretoken"]').value;
    $.ajax({
        type: 'POST',
        url: deleteUrl,
        data: {
            'csrfmiddlewaretoken': csrf,
        },
        success: function(response) {
            console.log(response);
            localStorage.setItem('title', titleInput.value);
            window.location.href = '/';
        },
        error: function(error) {
            console.log(error);
        }
    });
});

