const { app, BrowserWindow } = require('electron')
const WinState  = require('electron-win-state').default
const path = require('path')
const createWindow = () => {
    const winState = new WinState({
        defaultWidth:1000,
        defaultHeight:800
    })
    const win = new BrowserWindow({
        //自定义窗口状态
        ...winState.winOptions,
        webPreferences:{
            //定义预加载的js
            preload: path.join(__dirname, './preload/index.js'),
        }
    })

    win.loadURL('http://localhost:5173/')

    // 开启调试
    win.webContents.openDevTools();
    winState.manage(win)
}

app.whenReady().then(()=>{
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
  
