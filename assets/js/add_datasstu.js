    function start(data){
        arr=[]
        for(let elem of data){
            if(elem.length!=0){
                arr=[...arr,...elem]
            }
        }
        arr.sort((a,b)=>{if (a.id > b.id) return 1; 
        if (a.id == b.id) return 0; 
        if (a.id < b.id) return -1;})
    let table=$('.table tbody');
    pagin(arr)
    add(Math.floor(arr.length/40),0)
    add2(0)
    }
  
    
      
      
   


    

  
