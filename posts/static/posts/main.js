
console.log("Nathanael");

const postsBox = document.getElementById("posts-box");
const spinnerBox = document.getElementById("spinner-box");
const loadBtn = document.getElementById("load-more");
const endBox = document.getElementById("end-box");

// Reference: https://docs.djangoproject.com/en/6.1/howto/csrf/
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');
const likUnlikeForms = [...document.getElementsByClassName("like-form")];

postsBox.addEventListener("submit", (e) => {
    if (!e.target.matches(".like-form")) return;

    e.preventDefault();

    const clickedId = e.target.getAttribute("data-post-form");
    const clickedBtn = document.getElementById(`like-unlike-${clickedId}`);

    $.ajax({
        type: "POST",
        url: `/like-unlike/${clickedId}/`,
        data: {
            csrfmiddlewaretoken: csrftoken,
            pk: clickedId
        },
        success: function (response) {
            console.log(response);
            
            if (response.liked) {
                clickedBtn.textContent = `Unlike (${response.count})`;
            } else {
                clickedBtn.textContent = `Like (${response.count})`;
            }
        },
        error: function (error) {
            console.log("error", error);
        }
    });
});

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
                                        <form class="like-form" data-post-form="${el.id}">
                                            <button
                                                type="submit"
                                                class="btn btn-primary"
                                                id="like-unlike-${el.id}">
                                                ${el.liked ? `Unlike (${el.count})` : `Like (${el.count})`}
                                            </button>
                                        </form>
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
loadBtn.addEventListener("click", () => {
    spinnerBox.classList.remove("not-visible");
    visible += 3;
    getdata();
});

getdata();

