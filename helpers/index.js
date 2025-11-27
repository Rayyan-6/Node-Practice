export const createPostValidator= (req,res, next)=>{
    req.check("title", "Need a title").notEmpty();
    req.check("title", "Title should be between 4 and 50 characters").isLength({
        min: 4,
        max: 150,
    })

    req.check("content", "Need non empty content").notEmpty();
    req.check("content", "The content should be more than 4 characters").isLength({
        min: 4,
        max: 150,
    })


    const errors = req.validationErrors()

    if(errors){
        const firstError = errors.map(error=> error.msg)[0]
        return  res.status(400).json({error: firstError})
    }


    next()


}