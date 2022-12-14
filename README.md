# 总结
在 `GitHub Actions` 里面运行的脚步是一次行的，程序里面的定时任务不会跑，不管是用`node ./src/index.js &` 还是 `pm2 start ./src/index.js`。如果要在 `GitHub Actions` 里执行定时任务，只能通过 `github workflow`  的方式（但是这个定时任务的时间很不准）！