const url = "https://chapterandverse.taranj.no/wp-json/wp/v2/posts";

// only displayes games that are on sale
async function getAPI() {
  const response = await fetch(url);
  const posts = await response.json();

  console.log(posts);
}

getAPI();
