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
// attaching event listeners to the buttuns
Array.from(document.querySelector('.buttons-area').children).forEach(element=>{
    element.addEventListener('click',calculate)
})
     //TARGETING SOME ELEMENTS
    let expressions_area= document.querySelector('.expressions-area p')
    let answer_area = document.querySelector('.answer-area p')
    // GLOBAL VARIABLE
    let display_expression =''
    // CACULATOR'S FUNCTIONALITIES
// function to give an answer
function calculate(e){
    // when numbers are clicked
  if(e.target.className == 'number' || e.target.className.includes('number') == true  ){
      // only displaying and processing  a number none other than zero when when zero is the first  value
    if( e.target.textContent ==0 && display_expression.length == 1 && display_expression[0] =='0' ){
    }else{
        display_expression +=e.target.textContent
        expressions_area.innerHTML = display_expression 
    }
  }else{
    // WHEN OPERATORS ARE CLICKED
        // clearing every thing on the screen
    if(e.target.id == 'ce'){
        display_expression=''
        answer_area.innerHTML =0
        expressions_area.innerHTML = 0
        // deleting the last value (backspace)
    }else if(e.target.id == 'del'){
        display_expression=display_expression.slice(0,display_expression.length-1)
        expressions_area.innerHTML = display_expression
        // showing the result(answer) if an expression does not contain any operators
    }else if(e.target.id == 'equals'){
        if(display_expression.length !==0 && display_expression[display_expression.length-1].includes('.') ==false && display_expression[display_expression.length-1].includes('-') ==false && display_expression[display_expression.length-1].includes('*') ==false && display_expression[display_expression.length-1].includes('+') ==false && display_expression[display_expression.length-1].includes('/') ==false && display_expression[display_expression.length-1].includes('%') ==false){
            if(display_expression.includes('.') || display_expression.includes('*') || display_expression.includes('/') || display_expression.includes('+') || display_expression.includes('%') || display_expression.includes('-') ){
                answer_area.innerHTML = eval(display_expression)
            }else{
                // sending the entered pin to the reload ---- main
                (async()=>{
                    
                    let isPasword = await window.api.verifyPin(+display_expression)
                    if(isPasword){
                        //redirecting to the hidden filles when the password is true
                        location.assign('./videos.html')
                    }else{
                        //showing the answer when the entered pasword is not true
                        answer_area.innerHTML = eval(display_expression)
                    }
                })()
            }
            
        }
    }else{
        if(display_expression.length !== 0){
            if(display_expression[display_expression.length-1] !==e.target.innerHTML && display_expression[display_expression.length-1].includes('.') ==false && display_expression[display_expression.length-1].includes('-') ==false && display_expression[display_expression.length-1].includes('*') ==false && display_expression[display_expression.length-1].includes('+') ==false && display_expression[display_expression.length-1].includes('/') ==false && display_expression[display_expression.length-1].includes('%') ==false){
                display_expression +=e.target.textContent
                expressions_area.innerHTML = display_expression
            }
        }
    }

  }

}