import React from 'react';
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

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class ChainLightingAppNerdlet extends React.Component {
    constructor(props) {
        super(props);
        this.accountId = 2482859;
        this.state = {
            value: "NagiosReport",
            showModal: false
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
    render() {
        const nrql="SELECT * FROM NagiosReport SINCE 1 week ago"
        const innerText = require('react-innertext');
         console.log("js: working!")
        return (
            <Stack
            fullWidth
            horizontalType={Stack.HORIZONTAL_TYPE.FILL}
            directionType={Stack.DIRECTION_TYPE.VERTICAL}>
            <Grid>
            <GridItem
                columnSpan={6}
                style={{backgroundColor: ""}}
            >
            <h1>Chain <span>Lightning</span></h1>
            </GridItem>
            <GridItem
                columnSpan={4}
                style={{backgroundColor: ""}}
            >
            </GridItem>
            <GridItem
                columnSpan={2}
                style={{backgroundColor: ""}}
            >
               <img src="https://imgur.com/j2lbSUt" alt="description of image"/>
            </GridItem>
        </Grid>
        <StackItem>
        <ul>
    <li>Current Load1</li>
    <li>Current Users1</li>
    <li>HTTP1</li>
    <li>PING1</li>
    <li>Root Partition1</li>
    <li>SSH1</li>
    <li>Swap Usage1</li>
    <li>Total Processes1</li>
    <li>8</li>
        </ul>
        </StackItem>
        <StackItem >
        <div className="box">
            <article className="service left" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'}}>
              <img src="https://i1.wp.com/sobrebits.com/wp-content/uploads/2018/05/Nagios-logo.png?w=500&ssl=1" alt="description of image"/>
            </article>
            <article className="service top-left" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 0%, transparent 0%)'}}>
              <img src="https://clouding.io/kb/wp-content/uploads/2017/09/Z-Zabbix.png" alt="description of image"/>
            </article>
            <article className="service top-right" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 100%, transparent 100%)'}}>
              <img src="https://i1.wp.com/miraget.com/wp-content/uploads/2018/11/b488ffd251ebf4fcdd8d2ab1be453989.png?resize=480%2C480&ssl=1" alt="description of image"/>
            </article>
            <article className="service right" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 25%, transparent 25%)'}}>
              <img src="https://en.groupeaccess.ca/wp-content/uploads/2017/01/Fortinet-logo-313x313.png" alt="description of image"/>
            </article>
            <article className="service bottom-right" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 75%, transparent 75%)'}}>
              <img src="https://pbs.twimg.com/profile_images/1240920944/letterhead-logo_400x400.jpg" alt="description of image"/>
            </article>
            <article className="service bottom-left" style={{backgroundImage: 'linear-gradient(90deg, #14FFFF 30%, transparent 30%)'}}>
              <img src="https://pbs.twimg.com/profile_images/463695202377420800/Puzeh-5R_400x400.jpeg" alt="description of image"/>
            </article>
              <JsonChart
               id="dataTableNagios"
               query={"SELECT * FROM " + this.state.value + " SINCE 1 week ago LIMIT 1"}
               accountId={this.accountId}
               className="chart2"
              />
          </div>
            </StackItem>
        </Stack>
        );
        var nuke = document.getElementById("dataTableNagios").innerText
        console.log(nuke)
    }
}
