# Times-News

NewsCatcher News API 를 이용한 뉴스 웹사이트 입니다.

<br/>

- Desktop

<img width="1200" alt="데스크탑 버전" src="https://user-images.githubusercontent.com/99241230/164413923-a682bd9b-1658-4e4e-b4de-025cfab5d02c.png">

<br/>

- Mobile
<div align=center>
<img width="250" alt="모바일버전 첫 화면" src="https://user-images.githubusercontent.com/99241230/164415851-ffd04c93-b41d-45a4-a7db-c54ee97bd8c5.png">
<img width="250" alt="모바일버전 사이드메뉴" src="https://user-images.githubusercontent.com/99241230/164415888-b02d5da5-990c-40e5-b9c8-3dbfe5e358c6.png">
</div>
<br/>
<br/>

결과물 주소 👉 https://lechhw-times-news.netlify.app
<br/>

(\* api key 의 유효기간이 지나면 안보일 수 있습니다...)

---

<br/>

## 사용 기술

<br/>

- HTML
  <br/>

- CSS
  <br/>

- Vanilla Javascript
  <br/>

- Bootstrap

<br/>

## 구현 기능

<br/>

- topic 을 클릭하면 클릭한 topic 의 뉴스들을 불러옵니다.
  <br/>

- 사용자가 입력한 검색 키워드에 맞는 뉴스들을 불러옵니다.
  <br/>

- 통신 에러, 검색한 값이 없을 때는 따로 설정해 놓은 에러 화면이 구현됩니다.

<br/>

## 프로젝트 구현 과정

<br/>

- fetch() 함수를 사용하여 API를 호출하였습니다.

- Try Catch 문을 사용하여 에러 핸들링을 하는 법을 익혔습니다.

<br/>

```js
const getNews = async () => {
  try {
    let header = new Headers()
    header.append('x-api-key', API_KEY)
    url.searchParams.set('page', page) // url 에 page 추가

    let response = await fetch(url, { headers: header })
    let data = await response.json()

    if (response.status == 200) {
      if (data.total_hits > 0) {
        news = data.articles
        totalPage = data.total_pages
        newsRender()
        pagination()
      } else {
        throw new Error('검색 내용이 없습니다.')
      }
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    errorRender(error.message)
  }
}
```

<br/>

- Bootstrap 에서 제공하는 pagination 컴포넌트를 이용하여 paginaiton을 구현하였습니다.

<br/>

```js
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
```
