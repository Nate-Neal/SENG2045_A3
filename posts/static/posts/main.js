console.log("Nathanael");


const postsBox = document.getElementById("posts-box");
const spinnerBox = document.getElementById("spinner-box");
const loadBtn = document.getElementById("load-more");
const endBox = document.getElementById("end-box");
let visible = 3

const getdata = () => {
  $.ajax({
  type: "GET",
  url: `/load-posts/${visible}/`,
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
                    <div class="col-2">
                        <a href="#" class="btn btn-primary">Details</a>
                    </div>
                    <div class="col-2">
                        <a href="#" class="btn btn-primary">${el.liked ? `Unlike (${el.count})` : `Like (${el.count})`}</a>
                      </div>
                    </div>
                  </div>
                </div>
          `
      });
    }, 100)
    console.log(response.size)
    if (response.size == 0) {
      endBox.textContent = "No posts added yet...";
    }
    else if (response.size <= visible) {
      loadBtn.classList.add("not-visible");
      endBox.textContent = "No more posts to load...";
    }
  },
  error: function (error) {
    console.log("error", error);
  },
});
}

const loadMBtn = document.getElementById("load-more");
loadBtn.addEventListener("click", () => {
    spinnerBox.classList.remove("not-visible");
    visible += 3;
    getdata();

})

 getdata();


