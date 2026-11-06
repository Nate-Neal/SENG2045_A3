console.log("Nathanael");

const helloWorldBox = document.getElementById("nate");


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