import React from 'react';

import logo from './logo.png';
import avatar from './avatar.png';

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


class Lightning {
    constructor(canvas, l, r) {
      var c = canvas
      var size = l;
      c.width = size;
      c.height = 40;
      var ctx = c.getContext("2d");
      var center = {x: 0, y: 20};
      var minSegmentHeight = 10;
      var groundHeight = size - 20;
      var color = "hsl(180, 80%, 80%)";
      var roughness = 2;
      var maxDifference = 15;

      ctx.globalCompositeOperation = "lighter";

      ctx.strokeStyle = color;
      ctx.shadowColor = color;

      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "hsla(0, 0%, 10%, 0.2)";

      function render() {
        ctx.clearRect(0, 0, l, 40);

        ctx.shadowBlur = 0;
        ctx.globalCompositeOperation = "source-over";
        ctx.fillRect(0, 0, size, size);
        ctx.globalCompositeOperation = "lighter";
        ctx.shadowBlur = 15;
        var lightning = createLightning();
        ctx.beginPath();
        ctx.lineWidth = r;
        for (var i = 0; i < lightning.length; i++) {
          ctx.lineTo(lightning[i].x, lightning[i].y);
        }
        ctx.stroke();
      }

      function createLightning() {
        var segmentHeight = groundHeight - center.y;
        var lightning = [];
        lightning.push({x: center.x, y: center.y});
        lightning.push({x: l, y: 20});
        var currDiff = maxDifference;
        while (segmentHeight > minSegmentHeight) {
          var newSegments = [];
          for (var i = 0; i < lightning.length - 1; i++) {
            var start = lightning[i];
            var end = lightning[i + 1];
            var midX = (start.y + end.y) / 2;
            var newX = midX + (Math.random() * 2 - 1) * currDiff;
            newSegments.push(start, {x: (start.x + end.x) / 2, y: newX});
          }

          newSegments.push(lightning.pop());
          lightning = newSegments;

          currDiff /= roughness;
          segmentHeight /= 2;
        }
        return lightning;
      }

      render();
    }
  }

export default class ChainLightingAppNerdlet extends React.Component {
    constructor(props) {
        super(props);
        this.accountId = 2482859;
        this.state = {
            value: "NagiosReport",
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

        setTimeout(function () {
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

        }, 1000)
      }
    render() {
         const nrql="SELECT * FROM NagiosReport SINCE 1 week ago"
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
                      <img src="https://i1.wp.com/sobrebits.com/wp-content/uploads/2018/05/Nagios-logo.png?w=500&ssl=1" alt="description of image"/>
                    </article>
                    <article className="service top-left" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 0%, transparent 0%)'}}>
                      <img src="https://clouding.io/kb/wp-content/uploads/2017/09/Z-Zabbix.png" alt="description of image"/>
                    </article>
                    <article className="service top-right" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'}}>
                      <img src="https://i1.wp.com/miraget.com/wp-content/uploads/2018/11/b488ffd251ebf4fcdd8d2ab1be453989.png?resize=480%2C480&ssl=1" alt="description of image"/>
                    </article>
                    <article className="service right" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'}}>
                      <img src="https://en.groupeaccess.ca/wp-content/uploads/2017/01/Fortinet-logo-313x313.png" alt="description of image"/>
                    </article>
                    <article className="service bottom-right" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'}}>
                      <img src="https://pbs.twimg.com/profile_images/1240920944/letterhead-logo_400x400.jpg" alt="description of image"/>
                    </article>
                    <article className="service bottom-left" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'}}>
                      <img src="https://pbs.twimg.com/profile_images/463695202377420800/Puzeh-5R_400x400.jpeg" alt="description of image"/>
                    </article>

                    <p className="text">Function    <span>80%</span></p>
                    <canvas className="canvas" id="js-function"></canvas>
                    <p className="text">Speed       <span>100%</span></p>
                    <canvas className="canvas" id="js-speed"></canvas>
                    <p className="text">Consistency <span>100%</span></p>
                    <canvas className="canvas" id="js-consistency"></canvas>

                      <JsonChart
                       id="dataTableNagios"
                       query={"SELECT * FROM " + this.state.value + " SINCE 1 week ago LIMIT 1"}
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
