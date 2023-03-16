const API_KEY = 'AIzaSyATnaMLe2oAsrc_ctnzA2CLUZijotYcojg';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';
const MAX_RESULTS = 20;

const form = document.querySelector('form');
const videosDiv = document.querySelector('#videos');

form.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = event.target.querySelector('input').value;
  searchVideos(searchTerm);
});

async function searchVideos(searchTerm) {
  const response = await fetch(`${API_URL}?part=snippet&maxResults=${MAX_RESULTS}&q=${searchTerm}&type=video&key=${API_KEY}`);
  const data = await response.json();
  showVideos(data.items);
}

function showVideos(videos) {
  videosDiv.innerHTML = '';
  videos.forEach(video => {
    const videoDiv = document.createElement('div');
    videoDiv.classList.add('video');

    if (video.id.videoId) {
      videoDiv.innerHTML = `
        <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
      `;
    } else if (video.id.channelId) {
      videoDiv.innerHTML = `
        <h2>${video.snippet.title}</h2>
        <div class="channel">
          <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.channelTitle} logo">
          <p>${video.snippet.channelTitle}</p>
        </div>
        <p class="description">${video.snippet.description}</p>
      `;
    } else {
      videoDiv.innerHTML = `
        <h2>${video.snippet.title}</h2>
        <div class="channel">
          <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.channelTitle} logo">
          <p>${video.snippet.channelTitle}</p>
        </div>
        <div class="embed">${video.snippet.embedHtml}</div>
      `;
    }

    const viewsDiv = document.createElement('div');
    viewsDiv.classList.add('views');
    viewsDiv.textContent = `${formatNumber(video.statistics.viewCount)} views`;

    const likesDiv = document.createElement('div');
    likesDiv.classList.add('likes');
    likesDiv.textContent = `${formatNumber(video.statistics.likeCount)} likes`;

    videoDiv.appendChild(viewsDiv);
    videoDiv.appendChild(likesDiv);
    videosDiv.appendChild(videoDiv);
  });
}

function formatNumber(number) {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M; } else if (number >= 1000) { return ${(number / 1000).toFixed(1)}K`;
    } else {
      return number;
    }
}
