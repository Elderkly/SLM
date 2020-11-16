function formatData(time) {
    const data = new Date(parseInt(time))
    const [year,mon,day] = [
        data.getFullYear(),
        data.getMonth() + 1,
        data.getDate()
    ]
    return year + '-' + mon + '-' + day
}

export {
    formatData
}