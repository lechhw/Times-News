const API_KEY = 'a3QsE118j_MC1etXCP2-1l8J9U-pfhge1o2PTg2tjGE'

let sidebar = document.querySelector('.side-bar')
let sidebarOverlay = document.querySelector('.overlay')

let menuList = document.querySelectorAll('.tab-item button')
let sidebarMenuList = document.querySelectorAll('.side-menu-item a')
let searchButton = document.querySelector('.input-button')

let url = ''
let news = ''
let page = 1
let totalPage = 0

const getNews = async () => {
  let header = new Headers()
  header.append('x-api-key', API_KEY)
  let response = await fetch(url, { headers: header })
  let data = await response.json()

  news = data.articles
  totalPage = data.total_pages
  newsRender()
}

const newsRender = () => {
  let newsHTML = ''

  newsHTML = news.map((item) => {
    return `<li class="news">
    <div class="news-image">
      <img
        src=" ${
          item.media ||
          'https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png'
        } "/>
    </div>

    <div class="news-content">
      <h1>
      ${item.title}
      </h1>
      <p>
      ${
        item.summary.length == 0
          ? '내용없음'
          : item.summary.length >= 200
          ? item.summary.substring(0, 200) + '...'
          : item.summary
      }
      
      </p>
      <span>${item.rights || 'no source'} * 
      ${item.published_date}</span>
    </div>
  </li>`
  })

  document.querySelector('.news-list').innerHTML = newsHTML.join('')
}

const getLatestNews = () => {
  url = new URL(
    'https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10'
  )
  getNews()
}

// topic 뉴스 불러오기
const getNewsByTopic = (e) => {
  let topic = e.target.textContent.toLowerCase()

  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  )
  getNews()
}

// topic 뉴스 불러오기(mobile)
const getNewsByTopicMobile = (e) => {
  let topic = e.target.textContent.toLowerCase()
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  )
  getNews()
}

sidebarMenuList.forEach((menu) => {
  menu.addEventListener('click', (e) => getNewsByTopicMobile(e))
})

menuList.forEach((menu) => {
  menu.addEventListener('click', (e) => getNewsByTopic(e))
})

getLatestNews()

const closeSidebar = () => {
  sidebar.style.width = '0'
  sidebarOverlay.style.display = 'none'
}

const openSidebar = () => {
  sidebar.style.width = '50vw'
  sidebarOverlay.style.display = 'block'
}

const toggleSearchInput = () => {
  const inputGroup = document.querySelector('.input-group')
  if (inputGroup.style.display == 'block') {
    inputGroup.style.display = 'none'
  } else {
    inputGroup.style.display = 'block'
  }
}
