const { desktopCapturer, contextBridge, ipcRenderer, dialog } = require("electron");
const { writeFile } = require("original-fs");
const { async } = require("winattr/lib/checkWindows");

contextBridge.exposeInMainWorld("api",{getSources:async()=>{
let sources=await ipcRenderer.invoke("get-sources")
return sources
},close:()=>{
    ipcRenderer.send("close")
},minimize:()=>{
    ipcRenderer.send("minimize")
},maximize:()=>{
    ipcRenderer.send("maximize")
},verifyPin:async(pin)=>{
    let isPassWord=await ipcRenderer.invoke("verify-pin",pin)
    return isPassWord
},sendFileToHide:async(file_object)=>{
    let isHidden=await ipcRenderer.invoke("hide-file",file_object)
    return isHidden
},hasFileFinished:async(file_path)=>{
    let isFinished = await ipcRenderer.invoke("is-finished",file_path)
    return isFinished
},fetchFile:async(details)=>{}
})
