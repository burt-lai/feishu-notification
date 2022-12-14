const myTeam =
  'https://open.work.sany.com.cn/open-apis/bot/v2/hook/53fe3079-b06b-4861-bed6-837e1ffd0f9b'
const ourTeam =
  'https://open.work.sany.com.cn/open-apis/bot/v2/hook/0e480326-1c22-40bd-aff2-c981fda737ba'

const FEISHU_WEBHOOK = process.env.FEISHU_WEBHOOK || ourTeam

const SUCCESS_CODE = 0

const feishu = async (title = '', content = '') => {
  try {
    await fetch(FEISHU_WEBHOOK, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(template(title, content))
    })
      .then(r => r.json())
      .then(response => {
        // console.log(response) // { Extra: null, StatusCode: 0, StatusMessage: 'success' }
        if (response.StatusCode !== SUCCESS_CODE) {
          throw new Error(response.StatusMessage)
        }
      })
  } catch (error) {
    console.log(error.stack)
  }
}

const template = (title, content) => ({
  msg_type: 'interactive',
  card: {
    header: {
      title: {
        tag: 'plain_text',
        content: title
      }
    },
    elements: [
      {
        tag: 'div',
        text: {
          content,
          tag: 'lark_md'
        }
      }
    ]
  }
})

module.exports = feishu
