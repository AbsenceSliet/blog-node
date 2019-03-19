export const handleSuccess = ({ res, code, result = null, message = '请求成功' }) => {
    res.send({
        code: code,
        message,
        result
    })
}
export const handleError = ({
    res,
    err = null,
    message = '请求失败',
    code = 0,
}) => {
    res.send({
        code: code,
        message,
        err
    })
}