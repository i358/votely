import React, { useState, useEffect } from "react";
import "./App.scss";
import Settings from "./common/00";
// eslint-disable-next-line
import { RiRadioButtonLine } from "react-icons/ri";
import { FaAlignJustify } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
// eslint-disable-next-line
import { SiDiscord } from "react-icons/si";
// eslint-disable-next-line
import Badge from "./components/Badge";
// eslint-disable-next-line
import ToggleButtons from "./components/ToggleButtons";
import Navbar from "./components/Navbar";
import socketIOClient from "socket.io-client";

export default function App() {
  const [theme, setTheme] = useState(Settings.DEFAULT_THEME);
  const [navbarStatus, setNavbarStatus] = useState("0");
  const [search, setSearch] = useState("");

  var serverList = [];
  const socket = socketIOClient(Settings.API_ENDPOINT, {transports: ['websocket']});
 
  socket.on("updateVoice", (data)=>{
console.log("New update ")
console.log(data)
var guild = servers.filter((s)=>s.id===data.gid)
const newVoice = {"id":data.gid, "icon":guild.icon, "voiceUp":data.newCount}
var cache = servers.filter((s)=>s.id!==data.gid)
setServers([cache, newVoice])

  })
  const [servers, setServers] = useState(serverList);


  function FETCH_SERVERS() { 
    useEffect(() => {
      fetch(`${Settings.API_ENDPOINT}/api/servers`, {
        method: "post",
        headers: new Headers({
          "Authorization": "Bearer " + Settings.CLIENT.TOKEN
        })
      }).then((res) => res.json()).then((result) => { serverList=result.sort((a, b)=>b.voiceUp - a.voiceUp); setServers(result.sort((a, b) => b.voiceUp - a.voiceUp)) })
    }, [])
  }

  function searchAndList(key) {
    setSearch(key);
    if (key.length < 1)
      return setServers(serverList.sort((a, b) => b.voiceUp - a.voiceUp));
    var filter = serverList.filter((data, d) =>
      data.name.toLowerCase().includes(key.toLowerCase())
    );
    var filterv = serverList.filter((data, t) =>
      data.name
        .split(" ")
        .join("")
        .toLowerCase()
        .includes(key.split(" ").join("").toLowerCase())
    );
    const filter2 = () =>
      filterv.length > 0 ? setServers(filterv) : setServers([]);
    filter.length > 0 ? setServers(filter) : filter2();
  }

  if (theme === "dark") {
    return (
      <div className="env">
        <div className={theme}>
          <title>{Settings.SERVER_NAME} ~ Home</title>
          <div
            className={
              navbarStatus ? "navbar--top" : "navbar--top navbar--open"
            }
          >
            <Navbar
              Role="navbar-brand"
              Content={Settings.SERVER_NAME}
              To="home"
            />

            <Navbar Active="1" Content="Anasayfa" To="home" />
            <Navbar Content="Sunucular" To="guilds" />
            <Navbar Content="Discord" To="discord" />
            <Navbar Content="İletişim" To="contact" />

            <div
              onClick={() => setNavbarStatus(!navbarStatus)}
              className="toggleOpen"
            >
              <FaAlignJustify />
            </div>
            <div className="toggleButtons">
              <button>
                {" "}
                <BiPlus /> Botu ekle{" "}
              </button>
            </div>
          </div>

          <center>
            <h1>{Settings.SERVER_NAME}</h1>
            <p style={{ width: "500px", color: "#fff" }}>
              Discord'da yer alan Public & Private ve bir çok kategoriye sahip
              sunucuların anlık ses sıralamasını gösteren bir proje.
            </p>
            <br />
            <form onSubmit={(e) => e.preventDefault()} className="search">
              <input
                type="text"
                placeholder="Bir sunucu adı yazarak aramaya başla..."
                value={search}
                onChange={(e) => searchAndList(e.target.value)}
              /> 
              <BiSearchAlt className="icon" />
            </form>
            <br />
            <h1 className="title-hr"><hr /><b>İstatistikler</b><hr /></h1>
            <br />
            {FETCH_SERVERS()}
            {servers.length > 0 ? servers.map((server, key) => (
            
              <div key={key} id={"server-" + key} className="card">
                <img src={server.icon} alt="Server Icon" className="img" />
                <p className="serverName">{server.name}</p>
                <p className="stat">{server.voiceUp}</p> &nbsp;{" "}
                <AiFillSound className="stat2" />
              </div>
              
            )) : <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
            <br />
          </center>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="error"
        style={{
          background: "black",
          color: "white",
          height: "100%",
          width: "100%",
          position: "absolute",
          paddingTop: "5px",
          paddingLeft: "3px",
        }}
      >
        Beyaz Mod şu an ki sürümde desteklenmemektedir, karanlık moda geçmek
        için <b onClick={() => setTheme("dark")}>buraya</b> tıklayabilirsiniz.
      </div>
    );
  }
}
