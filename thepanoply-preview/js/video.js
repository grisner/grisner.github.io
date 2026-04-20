const video = document.getElementById('video');


// Show controls when the video is clicked
// video.addEventListener('click', function() {
//   if (!video.controls) {
//     video.controls = true;
//   }
// });

const enableVideo = () => {
  console.log('test')
  const video = document.getElementById('video');
  video.controls = true;
} 