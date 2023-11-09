
export let dataSearchColOpt = [
    { label: 'IMEI', value: 'IMEI' },
    { label: 'IMSI', value: 'IMSI' },
    { label: '手机号', value: 'phoneNum' },
]

export let protectedPath = [
    "/dashboard/admin",
    "/dashboard/setBlackWhite",
]

export let title = '电子轨迹数据查询分析系统';

// 每一等级可以不可查看的数据列
export let levelCol = {
    "A": [],
    "B": [],
    "C": ["IMEI", "model", "samplePos"],
    "D": ["IMEI", "model", "phoneNum", "samplePos"]
}