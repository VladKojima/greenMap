    function start(data){
        arr=[]
        for(let elem of data){
            if(elem.length!=0){
                arr=[...arr,...elem]
            }
        }
      
        arr.sort((a,b)=>{
            if (a.id > b.id) return 1; 
            if (a.id == b.id) return 0; 
            if (a.id < b.id) return -1;}
        )
        for( let el of  [...new Set(arr.map(res=>{
            let buf =res.name.split(' ')[0].split('')
            buf[0]=buf[0].toUpperCase()
            buf=buf.join('')
            return buf
            }))]){
             
            let option =$('<option>')
            option.append(el)
            $('#point2').append(option)
            let option1 =$('<option>')
            option1.val(el)
            $('#datalistOptions1').append(option1)
            let option2 =$('<option>')
            option2.val(el)
            $('#datalistOptions2').append(option2)
      
        }
        
    let table=$('.table tbody');
    pagin(arr)
    add(Math.floor(arr.length/40),0)
    add2(0)
    }
  
    
      
      
   


    

  
