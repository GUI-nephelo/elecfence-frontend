
export let dataSearchColOpt = [
    { label: 'IMEI', value: 'IMEI' },
    { label: 'IMSI', value: 'IMSI' },
    { label: '手机号', value: 'phoneNum' },
]
export let dataSearchCol = dataSearchColOpt.map(x => x.value)

export let protectedPath = [
    "/dashboard/admin",
    "/dashboard/setBlackWhite",
]

export let title = '电子轨迹数据查询分析系统';