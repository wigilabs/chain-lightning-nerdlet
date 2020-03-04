import React from 'react'

import axios from 'axios'



import logo   from './img/logo.png'

import avatar from './img/avatar.png'



import nagios     from './img/nagios.png'

import zabbix     from './img/zabbix.svg'

import splunk     from './img/splunk.png'

import fortinet   from './img/fortinet.png'

import cloudfloor from './img/cloudfloor.png'

import geotrust   from './img/geotrust.png'



import Lightning from './js/lightning.js'

import Utils from './js/utils.js'







export default class ChainLightingAppNerdlet extends React.Component {

    constructor(props) {

      super(props)

      this.state = {

        nagiosData: {},

        zabbixData: {},

        splunkData: {},



        nagiosFun: 100,

        zabbixFun: 100,

        splunkFun: 100,



        nagiosP: {

          backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'

        },

        zabbixP: {

          backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'

        },

        splunkP: {

          backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'

        },

        fortinetP: {

          backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'

        },

        cloudfloorP: {

          backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'

        },

        geotrustP: {

          backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'

        },



        functionality: 100,



        details: false,



        currentName: '',

        currentImage: nagios,

        currentTag: 'SERVER',

        currentList: ['1', '2', '3', '4', '5'],

        currentFun: 100,

      }



      this.showDetail = this.showDetail.bind(this)

      this.close = this.close.bind(this)

    }



    close() {

      this.setState({ details: false })

    }



    showDetail(service) {



      this.setState({ details: true })



      if(service == 'nagios') {



        let list = this.state.nagiosData

        let nagiosFun = this.state.nagiosFun



        this.setState({ currentName: 'Nagios' })

        this.setState({ currentImage: nagios })

        this.setState({ currentTag: 'SERVER' })

        this.setState({ currentList: list })

        this.setState({ currentFun: nagiosFun })

      }



      if(service == 'zabbix') {

        let list = this.state.zabbixData

        let zabbixFun = this.state.zabbixFun

        this.setState({ currentName: 'Zabbixs' })

        this.setState({ currentImage: zabbix })

        this.setState({ currentTag: 'APP' })

        this.setState({ currentList: list })

        this.setState({ currentFun: zabbixFun })

      }

    }



    async componentDidMount() {



      // console.log('componentDidMount ...')



      let l = 650

      let speed       = new Lightning(document.getElementById('js-speed'),       l, 3.5)

      let consistency = new Lightning(document.getElementById('js-consistency'), l, 3.5)



      // NAGIOS

      let resNAGIOS = await axios.get('https://chain-lightning-server.now.sh/api/nagios-events')

      let nagios_events = resNAGIOS.data

      this.setState({ nagiosData: nagios_events })



      let nagios_p = Utils.calculateP(nagios_events)

      this.setState({ nagiosFun: nagios_p })

      this.setState({

        nagiosP: { backgroundImage: 'linear-gradient(90deg, #14FFFF ' + nagios_p + '%, transparent ' + nagios_p + '%)' }

      })



      // ZABBIX

      let resZABBIX = await axios.get('https://chain-lightning-server.now.sh/api/zabbix-events')

      let zabbix_events = resZABBIX.data

      console.log('zabbix_events: ', zabbix_events)

      this.setState({ zabbixData: zabbix_events })



      let zabbix_p = Utils.calculateP(zabbix_events)

      this.setState({ zabbixFun: zabbix_p })

      this.setState({

        zabbixP: { backgroundImage: 'linear-gradient(90deg, #14FFFF ' + zabbix_p + '%, transparent ' + zabbix_p + '%)' }

      })



      // SPLUNK

      let splunk_p = 100

      // console.log('splunk_p: ', splunk_p)



      // functionality

      let functionality = ((nagios_p + zabbix_p + splunk_p) / 300 * 100).toFixed(2)

      // console.log('functionality: ', functionality)



      this.setState({ functionality })

      new Lightning(document.getElementById('js-function'), l, 2)



      this.componentDidMount()

    }



    render() {

      return (

        <div class="wrapper">



          <header class="header">

            <div class="logo">

              <img src={logo}/> Chain <span>Lightning</span>

            </div>



            <div class="avatar">

              <img src={avatar}/>

            </div>

          </header>



          <section>

            <div class="box">

              <article class="service left" style={this.state.nagiosP} onClick={() => this.showDetail('nagios')}>

                <img src={nagios}/>

                <span class="tag">SERVER</span>

                <span class="line left"></span>

              </article>

              <article class="service top-left" style={this.state.zabbixP} onClick={() => this.showDetail('zabbix')}>

                <img src={zabbix}/>

                <span class="tag">APP</span>

                <span class="line top"></span>

              </article>

              <article class="service top-right" style={this.state.splunkP}>

                <img src={splunk}/>

                <span class="tag">LOGS</span>

                <span class="line top"></span>

              </article>

              <article class="service right" style={this.state.fortinetP}>

                <img src={fortinet}/>

                <span class="tag">VPN</span>

                <span class="line right"></span>

              </article>

              <article class="service bottom-right" style={this.state.cloudfloorP}>

                <img src={cloudfloor}/>

                <span class="tag bottom">CDN</span>

                <span class="line bottom"></span>

              </article>

              <article class="service bottom-left" style={this.state.geotrustP}>

                <img src={geotrust}/>

                <span class="tag bottom">SSH</span>

                <span class="line bottom"></span>

              </article>



              <div className={!this.state.details ? '' : 'hide'}>

                <p class="text">Function<span>{this.state.functionality}%</span></p>

                <canvas class="canvas" id="js-function"></canvas>



                <p class="text">Speed<span>100%</span></p>

                <canvas class="canvas" id="js-speed"></canvas>



                <p class="text">Consistency<span>100%</span></p>

                <canvas class="canvas" id="js-consistency"></canvas>

              </div>



              <div className={this.state.details ? '' : 'hide'}>

                <div class="details">

                  <span class="close" onClick={this.close}>X</span>

                  <header>

                    <img src={this.state.currentImage} />&nbsp; {this.state.currentName}&nbsp;&nbsp; <span>{this.state.currentTag}</span>

                  </header>

                  <div class="sections">

                    <div class="sections-headers">

                      <p class="selected">Function {this.state.currentFun}%</p>

                      <p>Speed 100%</p>

                      <p>Consistency 100%</p>

                    </div>

                    <section class="sections-body">

                      {this.state.currentList.map((item, index) => (



                        <div class="element">

                          <span class="circle"></span>

                          {(() => {

                            switch (item.state) {

                              case 0:  return <span class="circle CRITICAL"></span>;

                              case 1:  return <span class="circle WARNING"></span>;

                              case 2:  return <span class="circle"></span>;

                            }

                          })()}

                          <p><b>{item.name}</b>:&nbsp;&nbsp;<small>{item.msg}</small></p>

                        </div>



                      ))}

                    </section>

                  </div>

                </div>

              </div>



            </div>

          </section>



        </div>

      )

    }

}