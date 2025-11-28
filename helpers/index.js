// export const createPostValidator= (req,res, next)=>{
//     // req.check("title", "Need a title").notEmpty();
//     // req.check("title", "Title should be between 4 and 50 characters").isLength({
//     //     min: 4,
//     //     max: 150,
//     // })

//     // req.check("content", "Need non empty content").notEmpty();
//     // req.check("content", "The content should be more than 4 characters").isLength({
//     //     min: 4,
//     //     max: 150,
//     // })


//     // const errors = req.validationErrors()

//     // if(errors){
//     //     const firstError = errors.map(error=> error.msg)[0]
//     //     return  res.status(400).json({error: firstError})
//     // }


//     // next()

//       body('title')
//     .notEmpty().withMessage('Title is required')
//     .isLength({ min: 4 }).withMessage('Title must be at least 4 characters')
//     .isLength({ max: 50 }).withMessage('Title cannot exceed 50 characters'),
  
//   body('content')
//     .notEmpty().withMessage('Content is required')
//     .isLength({ min: 4 }).withMessage('Content must be at least 4 characters'),

//   // Custom middleware to check validation result
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success: false, errors: errors.array() });
//     }
//     next();
//   }

// }




import { body, validationResult } from 'express-validator';

export const createPostValidator = [
  // Validation rules
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 4 }).withMessage('Title must be at least 4 characters')
    .isLength({ max: 50 }).withMessage('Title cannot exceed 50 characters'),
  
  body('content')
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 4 }).withMessage('Content must be at least 4 characters'),

  // Middleware to check validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];
