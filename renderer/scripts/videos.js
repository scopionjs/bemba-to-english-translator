// functions to minimize , maximize and close a window
let minimize =()=>{
    window.api.minimize()
    }
    let maximize =()=>{
        window.api.maximize()
    }
    document.querySelector(".close").addEventListener('click',()=>{
        window.api.close()
    })
//GLOBAL VARIABLES
let video_info
//PROMINENT FUNCTIONS
     //function to process a selected file
let process_selected_file =(e)=>{

    //showing the model
    document.querySelector('.hide-pop-up').classList.remove('hide')
    // hiding  the preceding step if they are visible
    document.querySelector('.hide-pop-up .step2')?.removeAttribute('style')
    document.querySelector('.hide-pop-up .step3')?.classList.add('hide')
    document.querySelector('.hide-pop-up .step4')?.classList.add('hide')
    //step 1 
    document.querySelector('.hide-pop-up .step1').setAttribute('style','display:flex;')
     //check if the file type is the appriopriate one
     if(e.target.files[0].type.includes('video/')){
         // when its a video file
         let video = document.createElement('video')
         let canvas = document.createElement('canvas')
         let ctx = canvas.getContext('2d')
         video.src = e.target.files[0].path
         video.muted=true
         video.onerror=()=>{
             console.log('error')
         }
         video.currentTime=5
         video.oncanplay=()=>{
             video.play()
         }
         video.onplay=()=>{
               //step 2 shown
             ctx.drawImage(video,0,0,canvas.width,canvas.height)
             video_info = {name:e.target.files[0].name,path:e.target.files[0].path,thumbnail:canvas.toDataURL(),fileType:'video',size:e.target.files[0].size*0.000001}
             document.querySelector('.hide-pop-up .step2 .box2 .initial .left img').src=video_info.thumbnail
             document.querySelector('.hide-pop-up .step2 .box2 .initial .right p').innerHTML=video_info.name
             document.querySelector('.hide-pop-up .step1').removeAttribute('style')
             document.querySelector('.hide-pop-up .step2').setAttribute('style','display:flex;')
         }
         
     }else{
         // when it is not a video file
     
     }
 }

//TARGET ELEMENTS

//reacting when there is a selected file
document.querySelector('.add-widget + input').addEventListener('change',process_selected_file)
//recting when user selects the type of hiding preferred(STEP 2)
Array.from(document.querySelectorAll('.hide-pop-up .step2 .box3 div button')).forEach((element)=>{
    element.addEventListener('click',async(e)=>{
        
        //showing (STEP 3)
        if(e.target.innerHTML=='deep hide'){
            document.querySelector('.hide-pop-up .step2')?.removeAttribute('style')
            document.querySelector('.hide-pop-up .step3').classList.remove('hide')
            video_info.hidingType = 'deep'
            let res=await window.api.sendFileToHide(video_info)
            // when a file is hidden 
             if(res==true){
                document.querySelector('.hide-pop-up .step3').classList.add('hide')
                document.querySelector('.hide-pop-up .step2')?.setAttribute('style','display:none;')
                document.querySelector('.hide-pop-up .step4').classList.remove('hide')
             }else{
                // when a file is not hidden
             }
        }else if(e.target.innerHTML=='slight hide'){
            document.querySelector('.hide-pop-up .step2')?.removeAttribute('style')
            document.querySelector('.hide-pop-up .step3').classList.remove('hide')
            video_info.hidingType = 'slight'
            let res = await window.api.sendFileToHide(video_info)
             // when a file is hidden 
             if(res==true){
                document.querySelector('.hide-pop-up .step3').classList.add('hide')
                document.querySelector('.hide-pop-up .step2')?.setAttribute('style','display:none;')
                document.querySelector('.hide-pop-up .step4').classList.remove('hide')
             }else{
                // when a file is not hidden
                console.log('error')
             }
        }
    })
}) 
//attaching event listeners to the close buttons to close pop - up
Array.from(document.querySelector('.hide-pop-up').getElementsByClassName('close')).forEach((element)=>{

    element.addEventListener('click',()=>{
        document.querySelector('.hide-pop-up').classList.add('hide')
    //removing and re-adding an existind input so as to clear the previous selected file in memory
        //removing
    document.querySelector('.add-widget + input').remove()
        // re-adding
    let new_input=document.createElement('input')
    new_input.accept='video/*'
    new_input.onchange=process_selected_file
    new_input.id='vids'
    new_input.style="display:none;"
    new_input.type='file'
    document.querySelector('.add-widget').parentElement.appendChild(new_input)
    })
    })

//minimizing the pop-up
let minimize_modal=(e)=>{
    if(document.querySelector('.hide-pop-up').classList.contains('hide-pop-up-minimized')){

        Array.from(document.querySelector('.hide-pop-up').getElementsByClassName('minimize')).forEach((element)=>{
            element.querySelector('div').removeAttribute('style')
            })

        document.querySelector('.hide-pop-up').classList.remove('hide-pop-up-minimized')

    }else{
        document.querySelector('.hide-pop-up').classList.add('hide-pop-up-minimized')
        Array.from(document.querySelector('.hide-pop-up').getElementsByClassName('minimize')).forEach((element)=>{
        element.querySelector('div').setAttribute('style','height: 12px;width: 12px;background-color: transparent;border: 1.7px white solid;')
        })

    }

    }