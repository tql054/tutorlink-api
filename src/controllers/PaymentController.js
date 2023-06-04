import PaymentServices from '../services/PaymentServices'
import TeacherServices from '../services/TeacherServices'
const addTeachingDatePayment = async (req, res) => {
    try {
        let response = await PaymentServices.insertPayMent(req.data.phoneNumber, req.body)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const getAllPaymentByTeacher = async (req, res) => {
    try {
        const data = await PaymentServices.getAllPaymentByTeacher(req.params.teacherPhone)
        const teacherInfo = await TeacherServices.getTeacherByPhone(req.params.teacherPhone)
        res.render('TeacherPayment', {data, teacherInfo: teacherInfo[0]})
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

module.exports = {
    addTeachingDatePayment,
    getAllPaymentByTeacher
}
