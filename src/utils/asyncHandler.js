//We can do it either using trycatch or promises

//Promise method

const asyncHandler =(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}
 export {asyncHandler}

 /* try catch method

Jab function as an argument le tb below syntax use hota h

step 1: const variable= ()=>{}
step 2: const variable = (func)=>{()=>{}}
step 3: const variable = (func)=> ()=>{}

const asyncHandler= (func)=> async (req,res,next)=>{
    try {
        await func(req,res,next)
    } catch (error) {
        res.status(error.status || 500).json({
            success:false,
            message:error.message
        })
    }
} */