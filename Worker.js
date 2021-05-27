const electron = require('electron'); 

const BrowserWindow = electron.BrowserWindow; 
const app = electron.app; 
let mainWindow; 

async function createMainWindow() { 
  mainWindow = new BrowserWindow({ 
    width: 1200, 
    height: 800, 
    title: 'React Worker',
  }); 

  // pencerenin içerisinde açılacak olan html sayfasının belirlenmesi 
  mainWindow.loadURL('http://localhost:3000');  
} 

// uygulamanın başlatılması 
app.on('ready', createMainWindow); 