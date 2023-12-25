const input = document.querySelector('input')
const ul = document.querySelector('#ul')
input.addEventListener('keyup', () => {
    const value = input.value
    console.log(value)
    getSearchData(value)
})

async function getSearchData(key){
    const res = await fetch('http://localhost:3000/abort?key='+key)
    const data = await res.json()
    console.log(data);
    ul.innerHTML = data.reduce((pre,cur)=> pre +=`<li>${cur}</li>`, '')
    
}

