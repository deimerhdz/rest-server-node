const { log } = require('console');
const path = require('path');
const {v4:uuidv4}= require('uuid');

const uploadFile=(files,validExtencions=['png','jpg','jpeg','gif'],folder='')=>{
    return new Promise((resolve,reject)=>{
        const {file} = files;
        const name= file.name.split('.');
        const extension= name[name.length-1];

        //verificar extension
        if(!validExtencions.includes(extension)){
         return reject(`Extension ${extension} is no permited`);
        }
        const nameTemp = uuidv4()+'.'+extension;
        const  uploadPath =path.join(__dirname,'../uploads/',folder,nameTemp);
        file.mv(uploadPath,(err)=>{
         if(err){
             reject(err);
         }
         resolve(nameTemp);
        })
    })
  
}

module.exports = {
    uploadFile
}
