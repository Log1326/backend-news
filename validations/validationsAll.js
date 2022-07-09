import {body,validationResult} from 'express-validator'
export const HandleErrorValidations = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(404).json(errors.array())
    next()
}


export const sign_up_validation = [
    body('email', 'invalid format email').isEmail(),
    body('password', 'password must be min 4 characters').isLength({min: 4}),
    body('firstName', 'first name must be min 1 characters').isLength({min: 1}),
    body('avatarUrl', 'where is the link to the picture').optional().isURL(),
]

export const sign_in_validation = [
    body('email', 'invalid format email').isEmail(),
    body('password', 'password must be min 4 characters').isLength({min: 4}),
]

export const post_create_validation = [
    body('title', 'enter article title').isLength({min: 3}).isString(),
    body('description', 'enter text ').isLength({min: 3}).isString(),
    body('tags', 'invalid tag format').optional().isString(),
    body('imageUrl', 'invalid image link').optional().isString(),
]


export const patch_update_validation = [
    body('title', 'enter article title').isLength({min: 3}).isString(),
    body('description', 'enter text ').isLength({min: 3}).isString(),
    body('tags', 'invalid tag format').optional().isString(),
    body('imageUrl', 'invalid image link').optional().isString(),
]

