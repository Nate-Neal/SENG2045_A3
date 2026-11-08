console.log("Nathanael");

const helloWorldBox = document.getElementById("nate");
const postsBox = document.getElementById("posts-box");
const spinnerBox = document.getElementById("spinner-box");

$.ajax({
  type: "GET",
  url: "/hello-world/",
  success: function (response) {
    console.log("success", response.text);
    helloWorldBox.innerHTML = response.text;
  },
  error: function (error) {
    console.log("error", error);
  },
});

$.ajax({
  type: "GET",
  url: "/load-posts/",
  success: function (response) {
    console.log(response);
    const data = response.data;
    setTimeout(() => {
      spinnerBox.classList.add("not-visible");
      console.log(data);
      // Card Reference: https://getbootstrap.com/docs/6.0/components/card/
      data.forEach((el) => { 
        postsBox.innerHTML += `
            <div class="card mb-2">
                <div class="card-body">
                    <h5 class="card-title">${el.title}</h5>
                    <p class="card-text">${el.body}</p>
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col-1">
                        <a href="#" class="btn btn-primary">Details</a>
                    </div>
                    <div class="col-1">
                        <a href="#" class="btn btn-primary">Like</a>
                      </div>
                    </div>
                  </div>
                </div>
          `
      });
    }, 100);
  },
  error: function (error) {
    console.log("error", error);
  },
});
