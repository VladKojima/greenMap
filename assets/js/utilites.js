function sorted(){
    let trs=$('tbody tr')
    $('tbody').empty()
    add(Math.floor(arr.length/40),0)
    const selects=$('.form-filter .form-element-input')
    for(let elem of trs){
        if($(elem).css('display')=='none')
        $(elem).css('display','table-row')
    }

    for(let s of selects){
        s=$(s)
        trs=$('tbody tr')
       
        if(s.attr('id')=='point1'){
            select(s,trs,'point1',3)
        }
        else{ trs=$('tbody tr')
            if(s.attr('id')=='point2'){
                select(s,trs,'point2',2)
            }
            else{ trs=$('tbody tr')
                if(s.attr('id')=='point3'){
                    yesNo(s,trs,'point3',12)
                }
                else{ trs=$('tbody tr')
                    if(s.attr('id')=='point4'){
                        yesNo(s,trs,'point4',13)
                    }
                    else{ trs=$('tbody tr')
                    
                        if(s.attr('id')=='point5'){
                            yesNo(s,trs,'point5',14)
                        }
                    }
                }
           
            }
    }
    }
    add2(0)
    let count=0;
    for(let s of selects){
        if($(s).val()!=$(s.children[0]).val()){
            count++
        }
        
    }
    if(count!=0){
        
        trs=$('tbody tr')
        $('.nav1').empty()
        $('.nav2').empty()
        pagin(trs)

    }
    else{

        trs=$('tbody tr')
        $('.nav1').empty()
        $('.nav2').empty()
        pagin(trs)
        add2(0)

    }
   
 
    if(trs.length==0){
        if($('.alert').length==0){
            $('table').append('<p class="alert">Нет элементов, подходящих под выбранные критерии</p>')
        }
    }
   else{
    $('.alert').remove()
   }

}
function pagin(obj){
    
    let buf=0
    let buf2=0
    let ul=$('.nav1')
    let ul2=$('.nav2')
    let prev=$('<li>');
    let prev2=$('<li>');
    let prev_1=$('<li>');
    let prev_2=$('<li>');
    prev.addClass('page-item')
    prev.append($('<a class="page-link">Назад</a>'))
    prev.on('click',()=>{
      if(buf>0){
    
        add2(buf-1);
        buf--;
        buf2--;
        for(let r of ul.children()){
          $(r).children().css('background','white')
        }
        for(let r of ul2.children()){
          $(r).children().css('background','white')
        }
        
        $('#'+buf).children().css('background','lightgrey');
        $('#'+'o'+buf2).children().css('background','lightgrey')      
     
        
        }
      })
      prev_1.addClass('page-item')
      prev_1.append($('<a class="page-link">Назад</a>'))
      prev_1.on('click',()=>{
        if(buf2>0){
    
          add2(buf-1);
          buf--;
          buf2--;
          for(let r of ul.children()){
            $(r).children().css('background','white')
          }
          for(let r of ul2.children()){
            $(r).children().css('background','white')
          }
          
          $('#'+buf).children().css('background','lightgrey');
          $('#'+'o'+buf2).children().css('background','lightgrey')
        
          
         
        }
        })
      
    
    ul.append(prev)
    ul2.append(prev_1)
    for(let i=0; i<Math.floor(obj.length/40)+1;i++){
      let li =$('<li>')
      li.addClass('page-item')
      li.attr('id',i)
      li.append($('<a class="page-link">'+(i+1)+'</a>'))
      li.on('click',(e)=>{
        for(let r of ul.children()){
          $(r).children().css('background','white')
        }
        for(let r of ul2.children()){
          $(r).children().css('background','white')
        }
        $(e.target).css('background','lightgrey')
        $('#o'+i).children().css('background','lightgrey')
    
        add2(i)
  
        buf=i
        buf2=i
        
      })
      let li2 =$('<li>')
      li2.addClass('page-item')
      li2.attr('id','o'+i)
      li2.append($('<a class="page-link">'+(i+1)+'</a>'))
      li2.on('click',(e)=>{
        for(let r of ul.children()){
          $(r).children().css('background','white')
        }
        for(let r of ul2.children()){
          $(r).children().css('background','white')
        }
        $(e.target).css('background','lightgrey')
        $('#'+i).children().css('background','lightgrey')
     
        add2(i)
    
        buf2=i
        buf=i
        
      })
      ul.append(li)
      ul2.append(li2)
     
    }
    prev2.addClass('page-item')
    prev2.append($('<a class="page-link">Вперед</a>'))
    prev2.on('click',()=>{
      if(buf<Math.floor(obj.length/40)){
     
        add2(buf+1);
        buf++
        buf2++
        for(let r of ul.children()){
          $(r).children().css('background','white')
        }
        for(let r of ul2.children()){
          $(r).children().css('background','white')
        }
        $('#'+buf).children().css('background','lightgrey')
        $('#'+'o'+buf2).children().css('background','lightgrey')
      }
      })
    ul.append(prev2)
    prev_2.addClass('page-item')
    prev_2.append($('<a class="page-link">Вперед</a>'))
    prev_2.on('click',()=>{
      if(buf2<Math.floor(obj.length/40)){
        add2(buf+1);
        buf++;
        buf2++;
        for(let r of ul.children()){
          $(r).children().css('background','white')
        }
        for(let r of ul2.children()){
          $(r).children().css('background','white')
        }
        $('#'+buf).children().css('background','lightgrey');
        $('#o'+buf).children().css('background','lightgrey');
      }
      })
    
    ul2.append(prev_2)
    $(ul.children()[1]).children().css('background','lightgrey')
    $(ul2.children()[1]).children().css('background','lightgrey')
  }   

  function add2(j){
    let trs=$('tbody tr')
    for(let elem of trs){
        $(elem).css('display','none')
    }
    for (let i=40*j;i<40*(j+1);i++){
        $(trs[i]).css('display','table-row')

    }

  }
  function add(j,o=j){
    let serverURL_pics = 'https://inpit.sstu.ru/greenmapServer';
    let table=$('.table tbody');
    for (let i=40*o;i<40*(j+1);i++){
        let v= arr[i]
        if(v!=undefined){
        let tr=$('<tr>');
        let td1=$('<td>');
        let td2=$('<td>');
        let td3=$('<td>');
        let td4=$('<td>');
        let td5=$('<td>');
        let td6=$('<td>');
        let td7=$('<td>');
        let td8=$('<td>');
        let td9=$('<td>');
        let td10=$('<td>');
        let td11=$('<td>');
        let td12=$('<td>');
        let td13=$('<td>');
        let td14=$('<td>');
        let td15=$('<td>');
        let td16=$('<td>');
        let td17=$('<td>');
        td1.append(v.id)
        let aa=$('<a>')
        aa.attr('data-bs-toggle','modal')
        aa.attr('data-bs-target','#photoModal')
        aa.attr('href','#')
        let img=$('<img>')
        if(v.photo!=undefined){
          if(v.photo!=''){
            img.attr('src',serverURL_pics+'/'+v.photo)
          }
        }
     
     
        img.addClass('img-fluid', 'table_img')
        img.on('load',()=>{   aa.append(img)})
        td2.append(aa)
        td3.append(v.name)
        td4.append('Площадка №'+v.location)
        td5.append(v.height)
        td6.append(v.cdiameter)
        td7.append(v.tdiameter)
        td8.append(v.dry===true?'есть':'нет')
        td9.append(v.detachment===true?'есть':'нет')
        td10.append(v.cracks===true?'есть':'нет')
        td11.append(v.drips===true?'есть':'нет')
        td12.append(v.tilt)
        td13.append(v.overhanging_t===true?'есть':'нет')
        td14.append(v.overhanging_p===true?'есть':'нет')
        td15.append(v.overhanging_d===true?'есть':'нет')
        td16.append(v.latitude
          +', '+v.longitude
          )
        let a=$('<a>');
        a.attr('data-bs-toggle','modal')
        a.attr('data-bs-target','#editModal')
        a.attr('href','#')
        let img2=$('<img>')
        img2.attr('src','../assets/images/edit.png')
        img2.addClass('img_edit')
        img2.attr('alt','edit')
        a.append(img2)
        td17.append(a)
        tr.append(td1)
        tr.append(td2)
        tr.append(td3)
        tr.append(td4)
        tr.append(td5)
        tr.append(td6)
        tr.append(td7)
        tr.append(td8)
        tr.append(td9)
        tr.append(td10)
        tr.append(td11)
        tr.append(td12)
        tr.append(td12)
        tr.append(td13)
        tr.append(td14)
        tr.append(td15)
        tr.append(td16)
        tr.append(td17)
      
      table.append(tr)

    }}}
    async function getTrees(location_id) {
      // это get-Запрос, поэтому id тоже пойдет с url
      return await axios.get(serverURL + url_gettrees + '/' + location_id).then(response => {
          trees = response.data; // trees - json с полученными данными
          // обратите внимание: инсерт с joinами, поэтому есть не только id статуса, породы и площадки, но и их названия (name_location, name_species, name_status)
        return trees
      });
  }

  async function getAllTrees(locations){
    let t= await  Promise.allSettled(
      locations.map(loc=>{
        return getTrees(loc)
      }))
      return t
  }
  async function getLocations() {
      // await - признак того, что метод работает асинхронно
      return await axios.get(serverURL + url_getLocations).then(response => {
          locations = response.data; // Locations - json с полученными данными
          return locations
      });
  }
  function onFileSelected() {
    let event=$('.input_file')
    var selectedFile = event.prop('files')[0];
    if((event.prop('files')[0].type).split('/')[0]=='image' && ((event.prop('files')[0].type).split('/')[1]=="png"||(event.prop('files')[0].type).split('/')[1]=="jpg")){
      var reader = new FileReader();
    var imgtag = $('.tree_img')
   
    reader.onload = function(event) {
      imgtag.attr('src',reader.result)
    };
    reader.readAsDataURL(selectedFile);
    }
    else{
      alert('выберите другое изображение')
    }
 
  }

  
  async function addTree(jsondata) {
    if(jsondata[1].value && jsondata[2].value && jsondata[3].value && jsondata[4].value && jsondata[5].value && jsondata[6].value && jsondata[7].value
    && jsondata[8].value && jsondata[9].value && jsondata[10].value && jsondata[11].value && jsondata[12].value && jsondata[13].value && jsondata[14].value
    && jsondata[15].value
    ){
      var jsonbody = {}; 
      var data2 = new FormData(); 
      data2.append('treeImage', $('.input_file').prop('files')[0]); 
      jsonbody['species'] = 1;
      jsonbody['name'] = jsondata[1].value;
      jsonbody['location'] = Number((jsondata[9].value)[jsondata[9].value.length-1])
      jsonbody['coordinates'] = [jsondata[7].value, jsondata[8].value];
      jsonbody['cdiameter'] = jsondata[6].value;
      jsonbody['height'] = jsondata[3].value;
      jsonbody['tdiameter'] = jsondata[4].value;
      jsonbody['year'] = 2001;
      jsonbody['dry'] = jsondata[11].value==='Есть'?1:0;
      jsonbody['detachment'] = jsondata[12].value==='Есть'?1:0;
      jsonbody['cracks'] = jsondata[14].value==='Есть'?1:0;;
      jsonbody['drips'] = jsondata[16].value==='Есть'?1:0;
      jsonbody['overhanging_t'] = jsondata[15].value==='Есть'?1:0;;
      jsonbody['overhanging_p'] = jsondata[10].value==='Есть'?1:0
      jsonbody['overhanging_d'] = jsondata[13].value==='Есть'?1:0;
      jsonbody['overhanging_comments'] = jsondata[2].value?jsondata[2].value:null;
      jsonbody['tilt'] = jsondata[5].value?jsondata[5].value:0;
      const blob = new Blob([JSON.stringify(jsonbody)], {
        type: 'application/json'
      });
      data2.append('jsonbody', blob);
      await axios.post(serverURL + url_addtree, data2).then(response => {
        alert('Дерево добавлено успешно')
        $('#addModal').modal('hide');
        for(let el of jsondata){
          el.value=''
        }
      }).catch((error) => {
        alert('Ошибки на сервере, попробуйте позже')
      });
    }
    else{
      alert('Заполните все поля')
    }
      
   }

  