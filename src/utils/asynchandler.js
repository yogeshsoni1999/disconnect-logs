const asyncHandler = (requestHandler) =>{
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((error) => next(error));
    }
}

export {asyncHandler}
// this function generally called higher order function