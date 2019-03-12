export const handleSuccess = ({ res, result = null, message = '请求成功' }) => {
    res.send({
        code: 1,
        message,
        result
    })
}
export const handleError = ({
    res,
    err = null,
    message = '请求失败',
}) => {
    res.send({
        code: 0,
        message,
        err
    })
}