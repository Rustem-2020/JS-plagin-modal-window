Element.prototype.appendAfter = function(element){
    element.parentNode.insertBefore(this, element.nextSibling);

}
function noop(){

}
function _createModalFooter(buttons = []){
    if (buttons.length === 0){
        return document.createElement('div')
    }
    const wrap = document.createElement('div')

    buttons.forEach(
        btn => {//btn = item
            const $btn = document.createElement('button')
            $btn.textContent = btn.text
            $btn.classList.add('btn')
            $btn.classList.add(`btn-${btn.type || 'seconady'}`)
            $btn.onclick = btn.handler || noop
            wrap.appendChild($btn)


        }
    )
    wrap.classList.add('modal-footer')
    return wrap

}
function _createModal(options){
    const DEFAULT_WIDTH = '600PX'
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close='overlay'>
            <div class="modal-window" style="width:${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Default Title'}</span>
                    ${ options.closable ? `<span class="modal-close" data-close='times' >&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    <p>${options.content || ''}</p>
                   
                </div>
                
            </div>
        </div>   
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)   
    return modal    
     
}
/**
 * 
 * title =>options
 * closable (show close button )
 * content: string
 * width: 400px;
 * destroy()убрать слушатели и модалку из дом
 */
$.modal = function(options){
   const $modal = _createModal(options)
   const ANIMATION_SPEED = 300
   let closing = false
   let destroyed = false
   const modal = {
    open(){     
        if(destroyed){
            console.log('Modal is destroyed')
        }          
        $modal.classList.remove('hide')
        !closing && $modal.classList.add('open') 
        
        
                    
    },
    close(){
        closing = true
        $modal.classList.remove('open')
        $modal.classList.add('hide')
        setTimeout( 
            ()=>{                
                $modal.classList.remove('open')
                closing = false
                if(typeof options.onClose == 'function'){
                    options.onClose()
                }
            },ANIMATION_SPEED
        )           
    }

   }
   const listener = event => {
    //console.log(event.target.dataset.close)
    if (event.target.dataset.close) {
        modal.close()
    }

   }
   $modal.addEventListener('click', listener)

   
    return Object.assign(modal, {
        destroy(){
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click',listener)
            destroyed = true
        },
        setContent(html){
           $modal.querySelector('[data-content]').innerHTML= html
        }

    })
    
}