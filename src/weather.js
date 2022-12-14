const url =
  'https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city='

const getWeatherContent = info => {
  const { city, wea, tem, tem1, tem2, humidity } = info
  return `
  Hello ${city}同学
  今天天气${wea}
  当前气温${tem}
  最高气温${tem1}
  最低气温${tem2}
  湿度${humidity}
  `.trim()
}

const getWeatherInfo = async (city = '长沙') => {
  const res = await fetch(url + city).then(r => r.json())
  // console.log(res)
  const todyInfo = res.data[1]
  const info = {
    city: city,
    wea: todyInfo.wea, // 天气
    tem: todyInfo.tem, // 当前温度
    tem1: todyInfo.tem1, // 最高温度
    tem2: todyInfo.tem2, // 最低温度
    humidity: todyInfo.humidity // 空气湿度
  }
  // console.log(info)
  return getWeatherContent(info)
}

module.exports = getWeatherInfo
