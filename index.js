const electron = require('electron')
const axios = require('axios')

require('dotenv').config({ path: __dirname + '/.env' })
const URL = 'https://api.nature.global/1/devices';
const API_KEY = process.env["NATURE-REMO-API-KEY"]

let tray = null;  // GC でトレイアイコンが消えないようにする : https://qiita.com/hibara/items/4a3c26817e5449ebf722


electron.app.on('ready', async () => {

  if (process.platform === 'darwin') electron.app.dock.hide();  // Dock は非表示にする
  // Windows タスクトレイでは ICO 形式を使う必要がある
  // ファイル名が `icon` だとビルド時にアプリアイコン用のアセットと勘違いされるので異なる名前を付けておく
  // ビルド後にパスが狂わないよう `__dirname` を使う
  tray = new electron.Tray(`${__dirname}/ondo96_blackTemplate@4x.png`);
  tray.setTitle(`準備中..`)

  setInterval(() => {
    axios.get(URL, {
        headers: {
          "Authorization": 'Bearer ' + API_KEY
        }
      }
    ).then((res) => {

      const te = `${res.data[0].newest_events.te.val}`
      const hu = `${res.data[0].newest_events.hu.val}`
      const il = `${res.data[0].newest_events.il.val}`
      const absHumidity = calculateAbsHumidity(te, hu)
      tray.setTitle(`${te}° / 💧${hu}% / 💡${il} / ${absHumidity}(g/m3)`)
    }).catch((e) => {
      console.log(e)
    })

    // console.log('res')
    // console.log(res.data[0].newest_events)

  }, 1000 * 60);

  tray.setContextMenu(electron.Menu.buildFromTemplate([
    {
      label: 'おうちの環境',
      click: () => {
        electron.dialog.showMessageBoxSync({
          title: 'おうちの環境'
        });
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Exit',
      role: 'quit'
    }
  ]));
});


// https://www.motohasi.net/blog/?p=3498
// 絶対湿度を計算する
const calculateAbsHumidity = (temperature, humidity) => {
  // console.log({temperature, humidity})
  temperature = Number(temperature)
  humidity = Number(humidity)
  const eT = 6.1078 * Math.pow(10, (7.5 * temperature / (237.3 + temperature)))
  const result = 217 * (eT * humidity / 100) / (temperature + 273.15)

  return result.toFixed(1)
}