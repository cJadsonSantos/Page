const postContainer = document.getElementById('photos-container')
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 1;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  return data;
}

async function showPosts() {
  const posts = await getPosts()
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
<body>
    <section class="container hero">
        <div class="container-item">
            <img src="img/mulan.png" alt="">
            <img src="img/bacurau.png" alt="">
            <img src="img/love-and-Monsters.png" alt="">
            <img src="img/emma.png" alt="">
            <img src="img/tenet.png" alt="">
        </div>
        <div class="container-item">
            <img src="img/over-moon.png" alt="">
            <img src="img/Ceu-da-meia-noite.png" alt="">
            <img src="img/another-round.png" alt="">
            <img src="img/chicago7.png" alt="">
            <img src="img/fences.png" alt="">
        </div>
    </section>
</body>
    `;
    postContainer.appendChild(postEl)
  });
}

function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

showPosts();

function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show')
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000)
}

window.addEventListener('scroll', () => {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading()
  }
});