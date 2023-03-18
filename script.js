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
        const channelTitle = item.snippet.channelTitle;
        const channelId = item.snippet.channelId;
        const channelImageUrl = item.snippet.thumbnails.default.url;
        const views = item.statistics?.viewCount || 'N/A';

        const videoCard = `
          <div class="video-card">
            <a href="${videoUrl}">
              <img src="${thumbnailUrl}" alt="${title}">
              <h3>${title}</h3>
            </a>
            <div class="channel-info">
              <img src="${channelImageUrl}" alt="${channelTitle} profile picture">
              <div>
                <p>${channelTitle}</p>
                <p>${views} views</p>
              </div>
            </div>
          </div>
        `;

        videoContainer.innerHTML += videoCard;
      });
    })
    .catch((error) => console.error(error));
}
