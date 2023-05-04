let form =$('.form-filter')
function yesNo(filter,trs,point,id){
    if(filter.val()!="Нависание над тротуаром" && filter.val()!='Нависание над проводами' && filter.val()!='Нависание над дорогой'){
       
        if( filter.attr('id')==point){
            for(let tr of trs){
                if(filter.val()=='Да'){
                    if(tr.children[id].innerHTML!='есть'){
                        $(tr).remove()
                    }
                }
                if(filter.val()=='Нет'){
                    if(tr.children[id].innerHTML!='нет'){
                        $(tr).remove()
                    }
                  }
            }
        }
    }
}
function select(filter,trs,point,id){
    if(filter.val()!='Вид' && filter.val()!='Площадка' ){
    if( filter.attr('id')==point){
        for(let tr of trs){
            if(!(tr.children[id].innerHTML.toUpperCase()).includes(filter.val().toUpperCase())){
                    $(tr).remove()
            }
        }
    }}
}

form.on('change', sorted)