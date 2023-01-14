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