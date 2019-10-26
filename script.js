const app = document.getElementById('root') //<div id ="root"></div> 
 

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(logo)
app.appendChild(container)

let url = 'https://ghibliapi.herokuapp.com/films'; 

const request = async () => {
    const response = await fetch(url);
    const json = await response.json();
   
   // films = [ {title: something, desc: something}, {title: ...}]
    let films = [] 
    json.forEach( film => 
    {

    	films.push({title:film.title, description:film.description})
    })
     

  	films.forEach( (film) =>{

  		//creating div with card class 
  		const card = document.createElement('div')
  		card.setAttribute('class','card')

  		//create h1 for film's title
  		const h1 = document.createElement('h1')
  		h1.textContent = film.title

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

  		//creating a "Watched" icon
  		const checked = document.createElement("INPUT")
  		checked.setAttribute("type", "checkbox")
  		checked.classList.add("checked")

  		//appending all the elements to "root" in HTMl
  		container.appendChild(card) 

  		card.appendChild(h1)
  		card.appendChild(p)
  		h1.appendChild(checked)

  		// only append button if there is "read more" option
  		if (firstPart !== film.description) card.appendChild(button)
  		
  	})
}

request();
 


 