const asyncHandler = async (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            // res.status(err.statusCode).send(err);
            console.log("Hello from async handler", err);
            res.json({ error: err });
            throw new APIError(400, err?.message);
        });
    };
};

export default asyncHandler;
