export function sortedArr(arr) {

//totoro,222,something


let scores = [] 

arr.forEach( (film) => {
	scores.push(film.score)
})

//scores = [50,90,70]

scores = scores.sort( (a,b) => {return a -b} )
scores

let sortedArr = []

for (let i =0;i<arr.length;i++) {
	 for (let j = 0;j < arr.length;j++) {

		 if (arr[j].score == scores[i]) {
			 sortedArr.push(arr[j])
			 break
		 }
		 
		 

	 }
}
return sortedArr

}

 

