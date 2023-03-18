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
        const channelImageUrl = item.snippet.channelThumbnails.default.url;

        // Get video views count or show "Live now" or "Upcoming"
        const liveBroadcastContent = item.snippet.liveBroadcastContent;
        const publishedAt = new Date(item.snippet.publishedAt);
        const daysSincePublished = Math.round((new Date() - publishedAt) / (1000 * 60 * 60 * 24));
        let views;
        if (liveBroadcastContent === "live") {
          views = "Live now";
        } else if (liveBroadcastContent === "upcoming") {
          views = "Upcoming";
        } else {
          const viewCount = item.statistics?.viewCount || 0;
          const viewsPerDay = viewCount / daysSincePublished;
          views = `${Math.round(viewsPerDay * 365)} views`;
        }

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
                <p>${views}</p>
              </div>
            </div>
          </div>
        `;

        videoContainer.innerHTML += videoCard;
      });
    })
    .catch((error) => console.error(error));
}
