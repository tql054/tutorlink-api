import PaymentServices from '../services/PaymentServices'
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

module.exports = {
    addTeachingDatePayment
}
