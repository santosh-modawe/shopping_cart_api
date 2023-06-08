const express = require('express');
const router = express.Router();
const model = require("../models")
const fs = require('fs').promises;
const path = require('path')
/** category apis */
router.get('/category/:id',(req,res,next)=>{

    let error=[]
   
    if(!req.params['id'] || !req.params['id'].length)
    {
        error.push({field:'id',message:'id value missing'})
    }
   
    if(error.length)
    {
        return res.status(400).send({message:'Bad request',error:error})
    }

    model.category.getCategoryDetail(req.params['id'])
    .then((result)=>{
       return  res.status(200).send({data:result})
    })
    .catch((error)=>{
      return  res.status(500).send({message:'Something went wrong',error:error})
    })
})

router.get('/category',(req,res,next)=>{

    model.category.getList()
    .then((result)=>{
       return  res.status(200).send({data:result})
    })
    .catch((error)=>{
      return  res.status(500).send({message:'Something went wrong',error:error})
    })
})


router.post('/category', async (req,res,next)=>{
  
    let data={}
    let error=[]
    if(!req.body['name'] || !req.body['name'].length)
    {
        error.push({field:'name',message:'Name should not be empty'})
    }

    if(error.length)
    {
        return res.status(400).send({message:'Bad request',error:error})
    }

    let cat_result = await model.category.getCategoryByName(req.body['name'])
    if(cat_result.length)
    {
        error.push({field:'name',message:'Category with same name already exist'})
    }

    if(error.length)
    {
        return res.status(400).send({message:'Bad request',error:error})
    }


     
     
    data['name']=req.body['name'];

    model.category.addCategory(data)
    .then(()=>{
       return  res.status(200).send({message:'Category added successfully'})
    })
    .catch((error)=>{
      return  res.status(500).send({message:'Something went wrong',error:error})
    })
    

})

router.put('/category',async (req,res,next)=>{


    let data={}
    let error=[]
    if(!req.body['name'] || !req.body['name'].length)
    {
        error.push({field:'name',message:'Name should not be empty'})
    }
    if(!req.body['id'] || !req.body['id'].length)
    {
        error.push({field:'id',message:'id value missing'})
    }
   
    if(error.length)
    {
        return res.status(400).send({message:'Bad request',error:error})
    }

    
    let cat_result = await model.category.getCategoryByName(req.body['name'])
    if(cat_result.length)
    {
        error.push({field:'name',message:'Category with same name already exist'})
    }

    if(error.length)
    {
        return res.status(400).send({message:'Bad request',error:error})
    }


     
    data['name']=req.body['name'];

    model.category.updateCategory(req.body['id'],data)
    .then(()=>{
       return  res.status(200).send({message:'Category updated successfully'})
    })
    .catch((error)=>{
      return  res.status(500).send({message:'Something went wrong',error:error})
    })

})

router.delete('/category/:id?',(req,res,next)=>{
    
    let error=[];
    let ids=[];
    if(req.params['id'])
    {
        ids.push(req.params['id'])
    }

    if(req.body['ids'])
    {
          ids=ids.concat(req.body['ids'])
    }

   
    if(!ids.length)
    {
        return res.status(400).send({message:'Bad request',error:'Atleast one id required'})
    }

    model.category.deleteCategory(ids)
    .then(()=>{
       return  res.status(200).send({message:'Category deleted successfully'})
    })
    .catch((error)=>{
      return  res.status(500).send({message:'Something went wrong',error:error})
    })


})

/** category apis end here */


/** product  apis start here */

router.get('/product/:id',(req,res,next)=>{

    let error=[]
   
    if(!req.params['id'] || !req.params['id'].length)
    {
        error.push({field:'id',message:'id value missing'})
    }
   
    if(error.length)
    {
        return res.status(400).send({message:'Bad request',error:error})
    }

    model.product.getProductDetail(req.params['id'])
    .then((result)=>{
       return  res.status(200).send({data:result})
    })
    .catch((error)=>{
      return  res.status(500).send({message:'Something went wrong',error:error})
    })
})

router.get('/product',(req,res,next)=>{

    model.product.getList()
    .then((result)=>{
       return  res.status(200).send({data:result})
    })
    .catch((error)=>{
      return  res.status(500).send({message:'Something went wrong',error:error})
    })
})


router.post('/product', async (req,res,next)=>{
  
    let data={}
    let error=[]
    if(!req.body['name'] || !req.body['name'].length)
    {
        error.push({field:'name',message:'Name should not be empty'})
    }
    if(!req.body['description'] || !req.body['description'].length)
    {
        error.push({field:'description',message:'Description should not be empty'})
    }
    if(!req.body['category_id'] || !req.body['category_id'].length)
    {
        error.push({field:'category_id',message:'category_id should not be empty'})
    }
     req.files.image.mv(path.join(__dirname,'../uploads/'+req.files.image.name),(error)=>{

        console.log(error)
     });

    if(error.length)
    {
        return res.status(400).send({message:'Bad request',error:error})
    }

     
     
    data['name']=req.body['name'];

    model.category.addCategory(data)
    .then(()=>{
       return  res.status(200).send({message:'Product added successfully'})
    })
    .catch((error)=>{
      return  res.status(500).send({message:'Something went wrong',error:error})
    })
    

})

router.put('/product',async (req,res,next)=>{


    let data={}
    let error=[]
    if(!req.body['name'] || !req.body['name'].length)
    {
        error.push({field:'name',message:'Name should not be empty'})
    }
    if(!req.body['id'] || !req.body['id'].length)
    {
        error.push({field:'id',message:'id value missing'})
    }
   
    if(error.length)
    {
        return res.status(400).send({message:'Bad request',error:error})
    }

    
    let cat_result = await model.category.getCategoryByName(req.body['name'])
    if(cat_result.length)
    {
        error.push({field:'name',message:'Category with same name already exist'})
    }

    if(error.length)
    {
        return res.status(400).send({message:'Bad request',error:error})
    }


     
    data['name']=req.body['name'];

    model.product.updateProduct(req.body['id'],data)
    .then(()=>{
       return  res.status(200).send({message:'Product updated successfully'})
    })
    .catch((error)=>{
      return  res.status(500).send({message:'Something went wrong',error:error})
    })

})

router.delete('/product/:id?',(req,res,next)=>{
    
    let error=[];
    let ids=[];
    if(req.params['id'])
    {
        ids.push(req.params['id'])
    }

    if(req.body['ids'])
    {
          ids=ids.concat(req.body['ids'])
    }

   
    if(!ids.length)
    {
        return res.status(400).send({message:'Bad request',error:'Atleast one id required'})
    }

    model.product.deleteProduct(ids)
    .then(()=>{
       return  res.status(200).send({message:'Product deleted successfully'})
    })
    .catch((error)=>{
      return  res.status(500).send({message:'Something went wrong',error:error})
    })


})
/** product  apis end here */


module.exports = router