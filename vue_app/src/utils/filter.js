// 定义过滤器 目的：将数值123456 || '123456' => 123,456
export function numFormat (num) {
	if (typeof num === 'undefined' || num === null) {
		return '-'
	} else {
		let res = num.toString().replace(/\d+/, n => {
			// 先提取整数部分
			return n.replace(/(\d)(?=(\d{3})+$)/g, $1 => {
				return $1 + ','
			})
		})
		return res
	}
}
