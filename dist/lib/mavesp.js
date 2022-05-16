"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MavEsp8266=void 0;const events_1=require("events"),dgram_1=require("dgram"),stream_1=require("stream"),mavlink_1=require("./mavlink"),mavlink_2=require("./mavlink"),utils_1=require("./utils");class MavEsp8266 extends events_1.EventEmitter{constructor(){super(),this.ip="",this.sendPort=14555,this.seq=0,this.input=new stream_1.PassThrough,this.processIncommingUDPData=this.processIncommingUDPData.bind(this),this.processIncommingPacket=this.processIncommingPacket.bind(this),this.input.pipe(new mavlink_1.MavLinkPacketSplitter).pipe(new mavlink_1.MavLinkPacketParser).on("data",this.processIncommingPacket)}async start(s=14550,t=14555){return this.sendPort=t,this.socket=(0,dgram_1.createSocket)({type:"udp4",reuseAddr:!0}),this.socket.on("message",this.processIncommingUDPData),new Promise((e,o)=>{this.socket.bind(s,()=>{(0,utils_1.waitFor)(()=>this.ip!=="").then(()=>{e(this.ip)}).catch(i=>{o(i)})})})}send(s,t=mavlink_2.MavLinkProtocol.SYS_ID,e=mavlink_2.MavLinkProtocol.COMP_ID){const i=new mavlink_2.MavLinkProtocolV2(t,e).serialize(s,this.seq++);this.seq&=255,this.sendBuffer(i)}sendSigned(s,t,e=1,o=mavlink_2.MavLinkProtocol.SYS_ID,i=mavlink_2.MavLinkProtocol.COMP_ID){const n=new mavlink_2.MavLinkProtocolV2(o,i,mavlink_2.MavLinkProtocolV2.IFLAG_SIGNED),r=n.serialize(s,this.seq++);this.seq&=255;const c=n.sign(r,e,t);this.sendBuffer(c)}sendBuffer(s){this.socket.send(s,this.sendPort,this.ip)}processIncommingUDPData(s,t){this.ip===""&&(this.ip=t.address),this.input.write(s)}processIncommingPacket(s){this.emit("data",s)}}exports.MavEsp8266=MavEsp8266;