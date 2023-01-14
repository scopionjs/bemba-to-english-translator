const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const { Notification } = require("electron/main");
const { existsSync, createReadStream, createWriteStream } = require("fs");
const { readFile, appendFile, writeFile, unlink } = require("fs/promises");
const os = require("os");
const path =require('path')
let hider =require('hidefile');
let attribute_setter =require('winattr');
const { join } = require("path");
const { async } = require("winattr/lib/checkWindows");
app.disableHardwareAcceleration()
//GLOBAL VARIABLES
let mainWindow
let security_details_db = path.join(__dirname,"/security-details.json")
let hidden_file_db =path.join(__dirname,"/hidden_file.json")

let isHidden =false
let thereIsError=false
let hidding = false
let recent_file =''
// PROMINENT FUNCTIONS
//generate random long string
let rand_string =(max)=>{
  return new Promise((resolve)=>{
    let values =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','p','q','r','s','t','u','v','w','x','y','z',1,2,3,4,5,6,7,8,9,10]
  let x=1
  let a_string=""
  while (x <=max) {
    let rand_num =Math.floor(Math.random()*values.length-1)
    a_string +=values[rand_num]
    if(x==max){
      console.log(a_string)
      resolve(a_string)
    }
    x++
  }
  })
}
//function to create a window
let createWindow=(preload_path,index_path)=>{
mainWindow = new BrowserWindow({
  frame:false,
  minHeight:700,
  minWidth:1000,
  webPreferences:{
    preload:preload_path
  }
})
mainWindow.loadFile(index_path)
mainWindow.isMaximized=false
mainWindow.setBackgroundColor('#0a0b15b1')
}
//a function to hide a file
let hideFile =(event,data)=>{
  return new Promise(async(resolve,reject)=>{
    hidding=true
//when its deep hiding
  if(data.hidingType=='deep'){
    //generating a long random string of the new path
    let new_path = path.join(__dirname /*app.getPath("userData")*/,`/${await rand_string(25)}.txt`)
    // if db file exists
    if (existsSync(hidden_file_db)) {
      let target_file = createReadStream(data.path)
      let new_src = createWriteStream(new_path)
      target_file.pipe(new_src)
      target_file.on('end',()=>{
        hider.hide(new_path,async(error,new_location)=>{
          // when there is no error during hiding
          if(error==null){
            data.newPath = new_location
            let file_info =await readFile(hidden_file_db,'utf-8')
            if (file_info) {
              let {files}= JSON.parse(file_info)
            files.push(data)
            await unlink(hidden_file_db)
            let appended = await appendFile(hidden_file_db,JSON.stringify({files:files}),'utf-8')
            if(appended == undefined){
              isHidden=true
              hidding = false
              resolve(true)
              new Notification({title:'calculator plus',body:'successfully concealed '+data.name}).show()
            }
          }
          }else{
            // when there is an error
            thereIsError=true
            isHidden=false
            hidding=false
            console.log(error.message)
            reject(false)
          }
        })
      })
    } else {
      try {
        // creating a new db  if db file dont exist
      let isDone= await writeFile(hidden_file_db,JSON.stringify({files:[]}),'utf-8')
      if(isDone==undefined){
        let target_file = createReadStream(data.path)
      let new_src = createWriteStream(new_path)
      target_file.pipe(new_src)
      target_file.on('end',()=>{
        hider.hide(new_path,async(error,new_location)=>{
          // when there is no error during hiding
          if(error==null){
            data.newPath = new_location
            let file_info =await readFile(hidden_file_db,'utf-8')
            if (file_info) {
              let {files}= JSON.parse(file_info)
            files.push(data)
            await unlink(hidden_file_db)
            let appended = await appendFile(hidden_file_db,JSON.stringify({files:files}),'utf-8')
            if(appended == undefined){
              isHidden=true
              hidding = false
              resolve(true)
              new Notification({title:'calculator plus',body:'successfully concealed '+data.name}).show()
            }
          }
          }else{
            // when there is an error
            thereIsError=true
            isHidden=false
            hidding=false
            console.log(error.message)
            reject(false)
          }
        })
      })
      }
      } catch (error) {
        resolve(false)
      }
    }
  }else{
// when its light hiding
  hidding = true
  recent_file=data.path
  // checking if the hidden files database exist
  if (existsSync(hidden_file_db)) {
    console.log()
    hider.hide(data.path,async(error,new_location)=>{
      // when there is no error during hiding
      console.log()
      if(error==null){
        data.newPath = new_location
        let file_info =await readFile(hidden_file_db,'utf-8')
        console.log()
        if (file_info) {
          console.log()
          let {files}= JSON.parse(file_info)
        files.push(data)
        await unlink(hidden_file_db)
        let appended = await appendFile(hidden_file_db,JSON.stringify({files:files}),'utf-8')
        if(appended == undefined){
          isHidden=true
          hidding =false
          resolve(true)
          new Notification({title:'calculator plus',body:'successfully concealed '+data.name}).show()
          console.log()
        }
      }
      }else{
        // when there is an error
        reject(false)
        thereIsError=true
        console.log(error.message)
        console.log()
        isHidden=false
        hidding = false
      }
    })
  }else{
// when db dont exist
let isDone= await writeFile(hidden_file_db,JSON.stringify({files:[]}),'utf-8')
if(isDone==undefined){
  console.log()
  hider.hide(data.path,async(error,new_location)=>{
    // when there is no error during hiding
    console.log(1)
    if(error==null){
      data.newPath = new_location
      let file_info =await readFile(hidden_file_db,'utf-8')
      console.log(2)
      if (file_info) {
        let {files}= JSON.parse(file_info)
      files.push(data)
      await unlink(hidden_file_db)
      console.log(3)
      let appended = await appendFile(hidden_file_db,JSON.stringify({files:files}),'utf-8')
      if(appended == undefined){
        isHidden=true
        hidding =false
        resolve(true)
        new Notification({title:'calculator plus',body:'successfully concealed '+data.name}).show()
        console.log(4)
      }
    }
    }else{
      // when there is an error
      reject(false)
      thereIsError=true
      console.log(error.message)
      isHidden=false
      hidding = false
      console.log()
    }
  })
}
  }
  
  }
  
  })
  }

//LOAD A WINDOW WHEN THE APP IS READY
app.on('ready',async()=>{
  //globalShortcut.register('Control+Shift+I',()=>{})
  /*
  let data =await readFile(hidden_file_db,'utf-8')
  let {files}=JSON.parse(data)
  files.forEach(element => {

    if(element.hidingType=='deep'){
      hider.reveal(element.newPath,async(err,newp)=>{
        if(err==null){
          let deleted = await unlink(newp)
          if(deleted==undefined){
            console.log('done deleting')
          }else{
            console.log(' not done deleting')
          }
        }else{
          console.log(1,err.message)
        }
      })
    }else{
      hider.reveal(element.newPath,(err,newp)=>{
        if(err==null){
          console.log('un hiden')
        }else{
          console.log(2,err.message)
        }
      })
    }

  });
  */ 
  createWindow(path.join(__dirname,'/renderer/preload/preload.js'),path.join(__dirname,'/renderer/templates/index.html'))
})
app.on("window-all-closed",()=>{
  app.quit()
})
// close window
ipcMain.on("close",()=>{
mainWindow.close()
})
// toggle maximizing 
ipcMain.on("maximize",()=>{

 if(mainWindow.isMaximized){
  mainWindow.unmaximize()
  mainWindow.isMaximized=false
 }else{
  mainWindow.maximize()
  mainWindow.isMaximized=true
 }

  })

  ipcMain.on("minimize",()=>{
    mainWindow.minimize()
    })
  ipcMain.handle("verify-pin",async(event , data)=>{
try {
  // when file  exists e
    //verifying
  if(existsSync(security_details_db)){
    let security_info=await readFile(path.join(__dirname,"/security-details.json"),'utf-8')
    let{passWords} = JSON.parse(security_info)
    return passWords.includes(data)? true:false;
  }else{
    // when file exists
      // recreating the db
    (async()=>{
      let obj={
        recovery_question:'',recovery_answer:'',passWords:[]
      }
      await appendFile(security_details_db,JSON.stringify(obj),'utf-8')
    })()
    return false
  }
} catch (error) {
  console.log(error.message)
}

  })
  //
ipcMain.handle('hide-file',async(event,data)=>{
  let res =await hideFile(event,data)
  console.log('returned'+res)
  return res
})
