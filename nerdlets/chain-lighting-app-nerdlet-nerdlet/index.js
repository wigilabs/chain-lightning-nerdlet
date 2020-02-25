import React from 'react';

import logo from './logo.png';
import avatar from './avatar.png';
import nagios     from './img/nagios.png'
import zabbix     from './img/zabbix.svg'
import splunk     from './img/splunk.png'
import fortinet   from './img/fortinet.png'
import cloudfloor from './img/cloudfloor.png'
import geotrust   from './img/geotrust.png'
import innerText from 'react-innertext';
import {
    Grid,
    GridItem,
    Stack,
    StackItem,
    HistogramChart,
    ChartGroup,
    AreaChart,
    BarChart,
    LineChart,
    TableChart,
    PieChart,
    Button,
    HeadingText,
    TextField,
    Modal,
    Toast,
    FunnelChart,
    NagiosReport,
    splunkHttp,
    zabbixHostLocal,
    zabbixHostRemote,
    JsonChart
} from "nr1";

import Lightning from "./lib.js"

export default class ChainLightingAppNerdlet extends React.Component {
    constructor(props) {
        super(props);
        this.accountId = 2482859;
        this.state = {
            value: "SELECT * FROM NagiosReport SINCE 1 week ago LIMIT 1",
            showModal: false,
            nagiosP: 100,
            zabbixP: 100,
            splunkP: 100
          };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({ value: e.target.value });
      }
      onSubmit(e) {
        e.preventDefault();
      }

    componentDidMount() {
        console.log('componentDidMount ...')

        let l = 650
        // let fun = new Lightning(document.getElementById('js-function'), l, 3.5)

        let speed       = new Lightning(document.getElementById('js-speed'),       l, 3.5)
        let consistency = new Lightning(document.getElementById('js-consistency'), l, 3.5)

        let self = this
        function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
                            }
        setTimeout(async function () {
         const nrql1="SELECT * FROM NagiosReport SINCE 1 week ago LIMIT 1"
         const nrql2="SELECT description from ZabbixHTTP SINCE 1 week ago LIMIT 1"
         const nrql3="SELECT description from ZabbixSSH SINCE 1 week ago LIMIT 1"
         const nrql4="SELECT description from ZabbixAgent SINCE 1 week ago LIMIT 1"
            let container = document.querySelector('.AFAEAU--vz--chart-container')
            console.log('container: ', container)
            let content = JSON.parse(container.innerText)
            console.log('content: ', content)
            let obj = content[0].data[0]
            obj.x="***"
            obj.timestamp="***"
            console.log('obj: ', obj)
            let stat=0
            for (var k in obj) {
                let val = obj[k]
                console.log('k: ', k)
                console.log('val: ', val)
                var v=val.includes("OK");
                if (v) {
                    stat=stat+1 //sum 1
                       } else {
                    stat=stat //default
                          }
                console.log("SCORE : " + stat)
                        }
            console.log("FINAL RESULT : " + stat/8)


            let p = stat / 8 * 100
            console.log('p: ', p)

            self.setState({nagiosP: p});
            console.log('self.state.nagiosP: ', self.state.nagiosP)
            //ZabbixScore
            let zabbixScore=0;
            console.log("=> Initial Score ")
            //ZabbixHTTP
            self.setState({value :"SELECT description from ZabbixHTTP SINCE 1 week ago LIMIT 1" })
            await sleep(4000);
            console.log('query update: ', self.state.value)
            let container1 = document.querySelector('.chart2')
            console.log('container1: ', container1)
            let content1 = JSON.parse(container1.innerText)
            console.log('content1: ', content1)
            let obj1=content1[0].data[0]
            console.log(" > Status", obj1.description)
            let eval1=obj1.description
            if (eval1.includes("is unreachable")){
                zabbixScore=zabbixScore
                //o poner hacer nada, no se yo prefiero que haga algo :)
            } else {
                zabbixScore=zabbixScore+1
                //suma un punto
            } 
            //ZabbixSSH
            self.setState({value :"SELECT description from ZabbixSSH SINCE 1 week ago LIMIT 1" })
            await sleep(4000);
            console.log('query update: ', self.state.value)
            let container2 = document.querySelector('.chart2')
            console.log('container2: ', container2)
            let content2 = JSON.parse(container2.innerText)
            console.log('content2: ', content2)
              let obj2=content2[0].data[0]
            console.log(" > Status", obj2.description)
            let eval2=obj2.description
            if(eval2.includes("is unreachable")){
                 zabbixScore=zabbixScore
                //o poner hacer nada, no se yo prefiero que haga algo :)
            } else {
                 zabbixScore=zabbixScore+1
                //suma un punto
            }
            //ZabbixAgent
            self.setState({value :"SELECT description from ZabbixAgent SINCE 1 week ago LIMIT 1" })
            await sleep(4000);
            console.log('query update: ', self.state.value)
            let container3 = document.querySelector('.chart2')
            console.log('container3: ', container3)
            let content3 = JSON.parse(container3.innerText)
            console.log('content3: ', content3)
            let obj3=content3[0].data[0]
            console.log(" > Status", obj3.description)
            let eval3=obj3.description
            if(eval3.includes("is unreachable")){
              zabbixScore=zabbixScore  
            } else {
              zabbixScore=zabbixScore+1  
            }
            let zabbixAudit=zabbixScore/3*100
            console.log("Zabbix status=> ",zabbixAudit,"%")
            self.setState({"zabbixP":zabbixAudit})
            //Splunk
            
        }, 1000)
      }
    render() {
         const innerText = require('react-innertext');
         console.log("js: working!")
         console.log('JsonChart: ', JsonChart)

        return (
            <Stack
            fullWidth
            horizontalType={Stack.HORIZONTAL_TYPE.FILL}
            directionType={Stack.DIRECTION_TYPE.VERTICAL}>
        <StackItem >
        <div className="wrapper">
            <header className="header">
              <div className="logo">
                <img src={logo} /> Chain <span>Lightning</span>
              </div>
              <div className="avatar">
                <img src={avatar} />
              </div>
            </header>
            <section>
                <div className="box">
                    <article className="service left" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF ' + this.state.nagiosP+ '%, transparent ' + this.state.nagiosP+ '%)'}}>
                      <img src={nagios} alt="description of image"/>
                    </article>
                    <article className="service top-left" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF ' + this.state.zabbixP + '%, transparent ' + this.state.zabbixP + '%)'}}>
                      <img src={zabbix} alt="description of image"/>
                    </article>
                    <article className="service top-right" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF ' + this.state.splunkP + '%, transparent ' + this.state.splunkP + '%)'}}>
                      <img src={splunk} alt="description of image"/>
                    </article>
                    <article className="service right" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'}}>
                      <img src="https://en.groupeaccess.ca/wp-content/uploads/2017/01/Fortinet-logo-313x313.png" alt="description of image"/>
                    </article>
                    <article className="service bottom-right" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'}}>
                      <img src="https://pbs.twimg.com/profile_images/1240920944/letterhead-logo_400x400.jpg" alt="description of image"/>
                    </article>
                    <article className="service bottom-left" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'}}>
                      {/*<img src="https://pbs.twimg.com/profile_images/463695202377420800/Puzeh-5R_400x400.jpeg" alt="description of image"/>*/}
                      <img src="https://i.pinimg.com/originals/79/a0/df/79a0df035fdaab8a09b3260e2ce2da09.png" alt="description of image"/>
                    </article>
                    <p className="text">Function    <span>80%</span></p>
                    <canvas className="canvas" id="js-function"></canvas>
                    <p className="text">Speed       <span>100%</span></p>
                    <canvas className="canvas" id="js-speed"></canvas>
                    <p className="text">Consistency <span>100%</span></p>
                    <canvas className="canvas" id="js-consistency"></canvas>
                      <JsonChart
                       id="dataTableNagios"
                       query={this.state.value}
                       accountId={this.accountId}
                       className="chart2"
                      />
                  </div>
              </section>
          </div>
            </StackItem>
        </Stack>
        );
    }
}