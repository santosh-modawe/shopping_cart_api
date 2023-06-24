const fs=require('fs')
const path = require('path')
class Utility {

   

    base64_encode(file,mime) {
      return   new Promise((resolve,reject)=>{
            try
            {
            let base64str= "data:"+mime+";base64,"+file.toString();
             resolve(base64str)
            }catch(error)
            {
                 reject(error)
            }
            
        });
    }

    uploadFile(req)
    {
        return new Promise((resolve,reject)=>{

            req.files.image.mv(path.join(__dirname,'../uploads/'+req.files.image.name),(error)=>{
                if(error)
                {
                    reject(error)
                }
                resolve(true)
       
            });

        });
    }

    

}

module.exports=new Utility();