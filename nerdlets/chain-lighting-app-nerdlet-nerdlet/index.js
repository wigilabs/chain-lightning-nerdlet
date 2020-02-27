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


function calculateP(a) {

  let n = a.length
  let count = 0

  for (var i = 0; i < n; i++) {
    if(a[i].value) count ++
  }

  return count / n * 100
}

export default class ChainLightingAppNerdlet extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
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
      }
    }

    async componentDidMount() {

      let l = 650
      let speed       = new Lightning(document.getElementById('js-speed'),       l, 3.5)
      let consistency = new Lightning(document.getElementById('js-consistency'), l, 3.5)

      // NAGIOS
      let resNAGIOS = await axios.get('http://localhost:3000/api/nagios-events')
      let nagios_events = resNAGIOS.data
      let nagios_p = calculateP(nagios_events)
      console.log('nagios_p: ', nagios_p)
      this.setState({
        nagiosP: { backgroundImage: 'linear-gradient(90deg, #14FFFF ' + nagios_p + '%, transparent ' + nagios_p + '%)' }
      })

      // ZABBIX
      let resZABBIX = await axios.get('http://localhost:3000/api/zabbix-events')
      let zabbix_events = resZABBIX.data
      let zabbix_p = calculateP(zabbix_events)
      console.log('zabbix_p: ', zabbix_p)
      this.setState({
        zabbixP: { backgroundImage: 'linear-gradient(90deg, #14FFFF ' + zabbix_p + '%, transparent ' + zabbix_p + '%)' }
      })

      // SPLUNK
      let splunk_p = 100
      console.log('splunk_p: ', splunk_p)

      // functionality
      let functionality = ((nagios_p + zabbix_p + splunk_p) / 300 * 100).toFixed(2)
      console.log('functionality: ', functionality)

      this.setState({ functionality })
      new Lightning(document.getElementById('js-function'), l, 2)
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
              <article class="service left" style={this.state.nagiosP}>
                <img src={nagios}/>
                <span>SERVER</span>
              </article>
              <article class="service top-left" style={this.state.zabbixP}>
                <img src={zabbix}/>
                <span>APP</span>
              </article>
              <article class="service top-right" style={this.state.splunkP}>
                <img src={splunk}/>
                <span>LOGS</span>
              </article>
              <article class="service right" style={this.state.fortinetP}>
                <img src={fortinet}/>
                <span>VPN</span>
              </article>
              <article class="service bottom-right" style={this.state.cloudfloorP}>
                <span>CDN</span>
                <img src={cloudfloor}/>
              </article>
              <article class="service bottom-left" style={this.state.geotrustP}>
                <img src={geotrust}/>
                <span>SSH</span>
              </article>

              <p class="text">Function<span>{this.state.functionality}%</span></p>
              <canvas class="canvas" id="js-function"></canvas>

              <p class="text">Speed<span>100%</span></p>
              <canvas class="canvas" id="js-speed"></canvas>

              <p class="text">Consistency<span>100%</span></p>
              <canvas class="canvas" id="js-consistency"></canvas>
            </div>

          </section>

        </div>
      )
    }
}