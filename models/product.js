const db=require('../database');
const { deleteCategory } = require('./category');

class Product {

    table='item'


    addProduct(pdata)
    {
        return new Promise((resolve,reject)=>{
            try
            {  
                let result =db(this.table).insert(cdata);
                resolve(result);

            }catch(error)
            {
               reject(error)
            }
        });

    }

    updateProduct(id,data)
    {
        
        return new Promise( async (resolve,reject)=>{
            try
            {  
                let result =await db(this.table)
                .update(data, ['id', 'name'])
                .where({id});

                if(result)
                {
                    resolve(result);

                }else{
                    reject('invalid detail')  
                }

            }catch(error)
            {
               reject(error)
            }
        });

    }

    getList()
    {
        return new Promise(async (resolve,reject)=>{

            try
            {

                let result= await db(this.table)
                resolve(result)

            }catch(error)
            {
               reject(error)
            }

        })

    }

    getProductDetail(id)
    {

        
        return new Promise(async (resolve,reject)=>{
            try
            {
                let result= await db(this.table)
                  .where({id})
                  resolve(result)
            }catch(error)
            {
               reject(error)
            }

        });

    }

    deleteProduct(ids)
    {

        return new Promise(async (resolve,reject)=>{
            try
            {
                let result= await db(this.table)
                   .delete()
                  .whereIn('id',ids)
                  if(result)
                  {
                    resolve(result)
                  }else{
                    reject('invalid detail')
                  }
                 
            }catch(error)
            {
               reject(error)
            }

        });

    }
}

module.exports=new Product();