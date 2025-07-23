export const createError = (status, message)=> {
    const err = new Error()
    err.status = status
    err.message = message
    return err
}

export const sendError = (res, status, message) => {
    res.status(status).json({
        success: false,
        status,
        message
    });
};