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
  url.searchParams.set('page', page) // url 에 page 추가
  let response = await fetch(url, { headers: header })
  let data = await response.json()

  news = data.articles
  totalPage = data.total_pages
  newsRender()
  pagination()
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
  page = 1 // 새로운 검색,주제 마다 페이지 1로 리셋
  url = new URL(
    'https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10'
  )
  getNews()
}

// topic 뉴스 불러오기
const getNewsByTopic = (e) => {
  page = 1
  let topic = e.target.textContent.toLowerCase()

  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  )
  getNews()
}

// topic 뉴스 불러오기(mobile)
const getNewsByTopicMobile = (e) => {
  page = 1
  let topic = e.target.textContent.toLowerCase()
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  )
  getNews()
}

// 검색키워드 뉴스 불러오기
const getNewsByKeyword = () => {
  page = 1
  let userInput = document.querySelector('.search-input').value

  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${userInput}&countries=KR&page_size=10`
  )
  getNews()
}

const pagination = () => {
  let paginationHTML = ''
  let pageGroup = Math.ceil(page / 5)
  let last = pageGroup * 5
  if (last > totalPage) {
    last = totalPage
  }
  let first = last - 4 <= 0 ? 1 : last - 4

  if (first >= 6) {
    paginationHTML = `<li class="page-item" onclick="pageClick(1)">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&lt&lt;</span>
    </a>
  </li>
  <li class="page-item" onclick="pageClick(${page - 1})">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&lt;</span>
    </a>
  </li>`
  }

  for (let i = first; i <= last; i++) {
    paginationHTML += `<li class="page-item  ${
      i == page ? 'active' : ''
    }"><a class="page-link" href="#" onclick="pageClick(${i})">${i}</a></li>`
  }

  if (last < totalPage) {
    paginationHTML += `<li class="page-item" onclick="pageClick(${page + 1})">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&gt;</span>
      </a>
    </li>
    <li class="page-item" onclick="pageClick(${totalPage})">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&gt&gt;</span>
      </a>
    </li>
    `
  }

  document.querySelector('.pagination').innerHTML = paginationHTML
}

const pageClick = (pageNum) => {
  page = pageNum
  getNews()
}

searchButton.addEventListener('click', getNewsByKeyword)

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
