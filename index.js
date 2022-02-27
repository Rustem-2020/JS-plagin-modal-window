let fruits = [
    {id:1, title:'Apple', price:10 , img:'https://cdn.pixabay.com/photo/2016/08/28/03/13/apple-1625381_960_720.png' },
    {id:2, title:'Orange', price:20 , img:'https://www.thetreecenter.com/c/uploads/washington-navel-orange-1.jpg' },
    {id:3, title:'Banan', price:30 , img:'https://cs10.pikabu.ru/post_img/2020/04/29/8/1588167688199670041.jpg' }

]
const toHTML = fruit =>
`<div class="card">
    <img src="${ fruit.img }" class="card-img-top" >
    <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <p class="card-tex">Some quick example text </p>
        <a href="#" class="btn btn-primary" data-btn="price" data-id=${fruit.id}>Price</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id=${fruit.id}>Delete</a>
    </div>
</div> `
function render(){
    //const html = fruits.map(fruit => toHTML(fruit))
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}
render()

const priceModal = $.modal( {
    title : "Цена на товар",
    closable : true,    
    width : '550px',
    footerButtons: [        
        {text:'Закрыть', type:'primary', handler(){
            console.log('Primary btn clicked')
            priceModal.close()
        }}
        
    ]
})



  
document.addEventListener( 'click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id // + Convert to Number
    const fruit = fruits.find(f => f.id === id) 
    if (btnType == 'price'){              
        priceModal.setContent(`
        <p>Цена на ${fruit.title} <b>${fruit.price}<b></p>
        `)
        priceModal.open()
    }
    else if(btnType == 'remove'){
        $.confirm({
            title:'Are you sure?',
            content: `You are going to delete ${fruit.title}`
        })
        .then(
            () =>{
                console.log('Removed')
                fruits = fruits.filter(f => f.id !== id)
                render()
            }
            )
        .catch(() =>{console.log('Cancel')})
   
    }
    

})

