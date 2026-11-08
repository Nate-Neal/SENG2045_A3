console.log("Nathanael");

const helloWorldBox = document.getElementById("nate");
const postsBox = document.getElementById("posts-box");

$.ajax({
    type: 'GET',
    url: '/hello-world/',
    success: function(response) {
        console.log('success', response.text)
        helloWorldBox.innerHTML = response.text
    },    
    error: function(error) {
        console.log('error', error)
    }   

})

$.ajax({
    type: 'GET',
    url: '/load-posts/',
    success: function(response) {
        console.log(response)
        const data = response.data
        console.log(data)
        data.forEach(el => {
            postsBox.innerHTML += `
                ${el.title} - <b>${el.body}</b><br>
            `
        });
    },
    error: function(error) {
        console.log('error', error)
    }
})