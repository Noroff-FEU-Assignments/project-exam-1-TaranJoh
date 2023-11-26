import { displayError } from "./components/error.js";

const url = "https://chapterandverse.taranj.no/wp-json/wp/v2/posts?_embed";

const latestPosts = document.querySelector(".latest-posts");

// fetches posts from wordpress
async function fetchAPI() {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    console.log(posts);

    for (let i = 0; i < posts.length; i++) {
      latestPosts.innerHTML += `<div class="post-thumbnail"><a href="blog-post.html?id=${posts[i].id}"><img src="${posts[i]._embedded["wp:featuredmedia"][0].source_url}" alt="Book cover for ${posts[i]._embedded["wp:term"][1][0].name}">
                            <h3>"${posts[i].title.rendered}"</h3>
                            <p>${posts[i]._embedded["wp:term"][1][0].name}</p></div>`;
    }
  } catch {
    {
      latestPosts.innerHTML = displayError("An error occurred when calling the API");
    }
  }
}

fetchAPI();

// carousel
const initSlider = () => {
  const reviewList = document.querySelector(".carousel");
  const slideButtons = document.querySelectorAll(".slide-button");
  const maxScrollLeft = reviewList.scrollWidth - reviewList.clientWidth;

  // slide through posts according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = reviewList.clientWidth * direction;
      reviewList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  const handleSlideButtons = () => {
    slideButtons[0].style.display = reviewList.scrollLeft <= 0 ? "none" : "block";
    // slideButtons[1].style.display = reviewList.scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  reviewList.addEventListener("scroll", () => {
    handleSlideButtons();
  });
};

window.addEventListener("load", initSlider);
