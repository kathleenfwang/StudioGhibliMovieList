 

const app = document.getElementById('root') //<div id ="root"></div> 
 

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(logo)
app.appendChild(container)

let url = 'https://ghibliapi.herokuapp.com/films'; 

//helper function:
function sortedArr (arr) {
  let scores = [] 

  arr.forEach( (film) => {
    scores.push(film.score)
  })
 
//scores = [50,90,70]
scores = scores.sort( (a,b) => {return b-a} )
let sortedArr = []
 
for (let a =0;a<arr.length;a++) {
   for (let b = 0;b < arr.length;b++) {
   
      if (arr[b].score == scores[a] && !sortedArr.includes(arr[b].title)) {
       
       sortedArr.push(arr[b].title,arr[b])
     }
     } 
   }
 
return sortedArr.filter( (film) =>{
  return typeof film == 'object'
})

}

const request = async () => {
    const response = await fetch(url);
    const json = await response.json();
   
   // films = [ {title: something, desc: something}, {title: ...}]
    let films = [] 
    json.forEach( film => 
    {

      films.push({title:film.title, description:film.description,release:film.release_date,score: parseInt(film.rt_score)})
    })
 
// {title: totoro, rt_score: 80}, {rt_score:70} 

  sortedFilms = (sortedArr(films))
    sortedFilms.forEach( (film) =>{

      //creating div with card class 
      const card = document.createElement('div')
      card.setAttribute('class','card')

      //create h1 for film's title
      const h1 = document.createElement('h1')
      h1.textContent = film.title
    
    //h2 for Release Date
    const h2 = document.createElement('h2')
    h2.textContent = 'Released: ' + film.release
    if (film.release > 2000) {
      h2.classList.add('recent')
    }
     
    else {
      h2.classList.add('old')
    }

    //h3 for Rotton Tomato Score 
    const h3 = document.createElement('h3')
    h3.textContent = 'Rotten Tomato Score: ' + film.score

      //create p for film's description
      const p = document.createElement('p')
      let firstPart = film.description.substring(0,300) // limit description to 300 words

      // only add elipses if there is more text past 
       if (firstPart !== film.description) p.textContent = firstPart + '...' 
       else {p.textContent = firstPart}
    


      //creating "read more button"
      const button = document.createElement('BUTTON')
      button.setAttribute('class','btn')
      button.textContent = "Read more..."

      //toggle the button on click
      button.onclick = function() {
         
        p.textContent == film.description ? p.textContent = firstPart + '...' : p.textContent = film.description
         
        
      }

      //appending all the elements to "root" in HTMl
      container.appendChild(card) 

      card.appendChild(h1)
      card.appendChild(h2)
      card.appendChild(h3)
      card.appendChild(p)
     

      // only append button if there is "read more" option
      if (firstPart !== film.description) card.appendChild(button)
      
    })
}

request();
 


 