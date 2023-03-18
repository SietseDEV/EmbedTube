const API_KEY = "AIzaSyATnaMLe2oAsrc_ctnzA2CLUZijotYcojg";
const MAX_RESULTS = 20;

function searchVideos() {
  const query = document.getElementById("searchInput").value;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=${MAX_RESULTS}&q=${query}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const videoContainer = document.getElementById("videoContainer");
      videoContainer.innerHTML = "";

      data.items.forEach((item) => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnailUrl = item.snippet.thumbnails.medium.url;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        const videoCard = `
          <div class="video-card">
            <a href="${videoUrl}" target="_blank"><img src="${thumbnailUrl}" alt="${title}"></a>
            <h3><a href="${videoUrl}" target="_blank">${title}</a></h3>
          </div>
        `;

        videoContainer.insertAdjacentHTML("beforeend", videoCard);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
