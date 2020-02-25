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
          value: "SELECT * FROM NagiosReport SINCE 1 week ago LIMIT 1",

          nagiosP: {
            // backgroundImage: 'linear-gradient(90deg, #14FFFF ' + 100 + '%, transparent ' + 100 + '%)'
            backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'

          },
          zabbixP: {
            // backgroundImage: 'linear-gradient(90deg, #14FFFF ' + 100 + '%, transparent ' + 100 + '%)'
            backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'

          },
          splunkP: {
            // backgroundImage: 'linear-gradient(90deg, #14FFFF ' + 100 + '%, transparent ' + 100 + '%)'
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

        }
    }

    async componentDidMount() {

      let l = 650
      let speed       = new Lightning(document.getElementById('js-speed'),       l, 3.5)
      let consistency = new Lightning(document.getElementById('js-consistency'), l, 3.5)


      let res = await axios.get('http://localhost:3000/api/nagios-events')
      let nagios_events = res.data

      let nagios_p = calculateP(nagios_events)
      console.log('nagios_p: ', nagios_p)

      this.setState({
        nagiosP: {
          backgroundImage: 'linear-gradient(90deg, #14FFFF ' + nagios_p + '%, transparent ' + nagios_p + '%)'
        }
      })
    }

    render() {
      return (
        <div className="wrapper">

          <header className="header">
            <div className="logo">
              <img src={logo}/> Chain <span>Lightning</span>
            </div>

            <div className="avatar">
              <img src={avatar}/>
            </div>
          </header>

          <section>

            <div className="box">
              <article className="service left" style={this.state.nagiosP}>
                <img src={nagios}/>
              </article>
              <article className="service top-left" style={this.state.zabbixP}>
                <img src={zabbix}/>
              </article>
              <article className="service top-right" style={this.state.splunkP}>
                <img src={splunk}/>
              </article>
              <article className="service right" style={this.state.fortinetP}>
                <img src={fortinet}/>
              </article>
              <article className="service bottom-right" style={this.state.cloudfloorP}>
                <img src={cloudfloor}/>
              </article>
              <article className="service bottom-left" style={this.state.geotrustP}>
                <img src={geotrust}/>
              </article>

              <p className="text">Function<span>80%</span></p>
              <canvas className="canvas" id="js-function"></canvas>

              <p className="text">Speed<span>40%</span></p>
              <canvas className="canvas" id="js-speed"></canvas>

              <p className="text">Consistency<span>20%</span></p>
              <canvas className="canvas" id="js-consistency"></canvas>
            </div>

          </section>

        </div>
      )
    }
}