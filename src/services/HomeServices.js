import db from '../models/index'

let getStudentHomeData = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            resolve('data') // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })

    return promise
}

let getTeacherHomeData = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            resolve('data') // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}


module.exports = {
    getStudentHomeData,
    getTeacherHomeData
}
