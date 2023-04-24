import HomeServices from '../services/HomeServices'

let getHomeData = async (req, res) => {
    try {
        const role = req.data.quyen
        let data = {}
        switch(role) {
            case 'HS': {
                data = await HomeServices.getStudentHomeData()
                break
            }

            case 'GV': {
                data = await HomeServices.getTeacherHomeData()
                break
            }

            default: data = await HomeServices.getStudentHomeData()
        }
        
        const schedule = ''
        return res.status(200).json({
            role,
            data,
            schedule
        })
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

module.exports = {
    getHomeData
}