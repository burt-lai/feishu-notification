const feishu = require('./feishu')
const schedule = require('node-schedule')
const getWeatherInfo = require('./weather')

const getRuleByHour = hour => {
  const DIFF_HOUR = -8 // 我们在东8区，比0时区块8h，所以要减去8
  return {
    second: 0,
    minute: 20,
    hour: hour + DIFF_HOUR,
    dayOfWeek: [new schedule.Range(1, 6)], // 目前只在工作日执行！
    tz: 'Etc/UTC'
  }
}
// 全部任务都仅周一到周五执行！！！
// 1-每天8点发送当前的气温情况
schedule.scheduleJob('每天8点', getRuleByHour(8), async fireDate => {
  feishu('天气情况', await getWeatherInfo('长沙'))
})
schedule.scheduleJob('每天10点', getRuleByHour(10), () => {
  feishu('喝水提醒', '10点了，起来喝杯水吧')
})
schedule.scheduleJob('每天14点', getRuleByHour(14), () => {
  feishu('起床提醒', '14点了，起来喝杯水吧')
})
schedule.scheduleJob('每天18点', getRuleByHour(18), () => {
  feishu('下班提醒', '18点了，下班了，可以干饭了')
})
schedule.scheduleJob('每天22点催你回家', getRuleByHour(22), () => {
  feishu('催你回家', '22点了，还不下班？？')
})
schedule.scheduleJob('每10S执行', '0/10 * * * * *', () => {
  feishu('测试', '10S执行一次 - by PM2')
})
feishu('测试', '执行一次 - by PM2')
