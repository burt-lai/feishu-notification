const feishu = require('./feishu')
const schedule = require('node-schedule')

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

// 全部任务都仅周一到周五执行！！！
// 1-每天8点发送当前的气温情况
schedule.scheduleJob('每天8点', '0 0 8 * * 1-6', () => {
  const info = getWeatherInfo('长沙')
  feishu('天气情况', getWeatherContent(info))
})
schedule.scheduleJob('每天10点', '0 0 10 * * 1-6', () => {
  feishu('喝水提醒', '10点了，起来喝杯水吧')
})
schedule.scheduleJob('每天14点', '0 0 14 * * 1-6', () => {
  feishu('喝水提醒', '14点了，起来喝杯水吧')
})
schedule.scheduleJob('每天18点', '0 0 18 * * 1-6', () => {
  feishu('下班提醒', '18点了，下班了，可以干饭了')
})
schedule.scheduleJob('每天22点催你回家', '0 0 22 * * 1-6', () => {
  feishu('催你回家', '22点了，还不下班？？')
})
