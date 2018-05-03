import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, { PureComponent, Component } from 'react';
import NodeGroup from 'react-move/NodeGroup';
import Surface from './surface'; // this is just a responsive SVG
import { scaleLinear, scaleBand } from 'd3-scale';
import { easeExpInOut } from 'd3-ease';
import { ascending, max } from 'd3-array';
import '../App.css';
import {get_all_money} from '../actions/mapActions';

// **************************************************
//  SVG Layout
// **************************************************
const view = [1000, 450]; // [width, height]
const trbl = [10, 20, 30, 10]; // [top, right, bottom, left] margins

const dims = [ // Adjusted dimensions [width, height]
  view[0] - trbl[1] - trbl[3],
  view[1] - trbl[0] - trbl[2],
];

function numberToSpan(number) {
  switch(number) {
    case 1: return <span><b>Statistikk om ekstrakostnader</b><br/><br/>Hvor mye ekstrakostnader er det til de forskjellige universitetene?</span>;
    case 2: return <span><b>Statistikk om bokostnader</b><br/><br/>Hvor mye koster det å bo når man studerer ved de forskjellige universitetene?</span>;
    case 3: return <span><b>Statistikk om skolekostnader</b><br/><br/>Hvor mye koster de forskjellige universitetene i skolepenger?</span>;
    default: return <span></span>;
  }
}


class Example extends Component {
  constructor(){
    super()

    this.state = {
      sortAlpha: true,
      statType: "moneySkole",
      showStatType:0,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount(){
    this.props.get_all_money()
  }

  handleLeave(e) {
    if (e.target.id.includes('Btn')) {
      this.setState({showStatType:0})
    }
  }

  handleHover(e) {
    if(e.target.id=='ekstraBtn'){
      this.setState({showStatType:1})
    }
    else if(e.target.id=='boBtn'){
      this.setState({showStatType:2})
    }
    else if(e.target.id=='skoleBtn'){
      this.setState({showStatType:3})
    }

  }

  handleClick(e){

    var varListe;
    if(e.target.id=='ekstraBtn'){
        this.setState({statType: "moneyEkstra"});
  }
    else if(e.target.id=='boBtn'){
        this.setState({statType: "moneyBolig"});
    }

    else if(e.target.id=='skoleBtn'){
        this.setState({statType: "moneySkole"});
    }
  }

  update = () => {
    this.setState((state) => ({
      sortAlpha: !state.sortAlpha,
    }));
  }

  render() {
    const { sortAlpha } = this.state;
    console.log('this.props.money', this.props.money)
    try {


      const sorted = this.props[this.state.statType].sort(sortAlpha ?
      (a, b) => ascending(a.key, b.key) :
      (a, b) => b.val - a.val,
    ).slice(0);

    const scale = scaleBand()
      .rangeRound([0, 250])
      .domain(sorted.map((d) => d.key))
      .padding(0.1);
    const y = scaleLinear()
      .range([dims[1], 0])
      .domain([0, max(this.props[this.state.statType], (d) => d.val)]);
    return (
      <div style={{marginTop: '10vh', minHeight: 1}}>
        <button onClick={this.update} className="sortButton">
          {`Sort ${sortAlpha ? 'Value' : 'Alpha'}`}
        </button>
        <Surface view={view} trbl={trbl}>
          <NodeGroup
            data={sorted}
            keyAccessor={(d) => d.key}

            start={() => ({
              opacity: 1e-6,
              y: 1e-6,
              height: scale.bandwidth()/2,
            })}

            enter={(d) => ({
              opacity: [0.7],
              y: [scale(d.key)],
              timing: { duration: 750, ease: easeExpInOut },
            })}

            update={(d, i) => ({
              opacity: [0.7],
              y: [scale(d.key)],
              height: [scale.bandwidth()],
              timing: { duration: 750, delay: i * 50, ease: easeExpInOut },
            })}

            leave={() => ({
              opacity: [1e-6],
              y: [scale.range()[1]],
              timing: { duration: 750, ease: easeExpInOut },
            })}
          >
            {(nodes) => (
              <g>
                {nodes.map(({ key, data, state }) => {
                  const { x, ...rest } = state;

                  return (
                    <g key={key}>
                      <rect

                        width={dims[1] - y(data.val)}
                        x={300}
                        fill="#ffa500"
                        {...rest}
                      />
                      <text
                        // y={-100}
                        x={0}
                        dy="20"
                        fill="black"
                        font-weight="bold"
                        {...rest}


                      >{data.key.split(',')[0]}</text>
                      <text
                        // y={-100}

                        x={305}
                        dy="20"

                        fill="#333"
                        {...rest}


                      >{data.val} NOK</text>
                    </g>
                  );
                })}
              </g>
            )}
          </NodeGroup>
        </Surface>

        <div class = 'animStatInfo'>
        {(!this.state.showStatType) ? '' : (numberToSpan(this.state.showStatType))}
        </div>

        <div class="btn-group" style={{position: 'absolute', right:'100px', top: '150px'}}>
        <button id ='ekstraBtn' onMouseLeave={this.handleLeave.bind(this)} onMouseOver={this.handleHover.bind(this)} onClick={this.handleClick.bind(this)}>Ekstrakostnader</button>
        <button id = 'boBtn' onMouseLeave={this.handleLeave.bind(this)} onMouseOver={this.handleHover.bind(this)} onClick={this.handleClick.bind(this)}>Bokostnader </button>
        <button id = 'skoleBtn' onMouseLeave={this.handleLeave.bind(this)} onMouseOver={this.handleHover.bind(this)} onClick={this.handleClick.bind(this)}>Skolekostnader </button>

        </div>
      </div>
    );

} catch (e) {
  return (<div style={{marginTop: '10vh'}}>laster</div>)
} finally {

}
}
}

function mapStateToProps(state){
  var a = state.map.money
  // if (a.features){
  //   console.log('obj', a)
  // } else {
  //   console.log('n-obj', a)
  //   a = a.slice(0, 10)
  // }

  var listeSkole= [];
  var listeEkstra= [];
  var listeBolig= [];
  var i;

  for (i = 0; i < a.length; i++) {
      var key = a[i].universitet;
      var val1 = a[i].money_stats.skolepenger;
      var val2 = a[i].money_stats.ekstra;
      var val3 = a[i].money_stats.boligutgifter;
      listeEkstra.push({'key':key, 'val':val2});
      listeSkole.push({'key':key, 'val':val1});
      listeBolig.push({'key':key, 'val':val3});
  }
  function getTop10(list) {
    return list.sort(function(a, b) {
      return a.val < b.val ? 1 : a.val > b.val ? -1 : 0
    }).slice(0, 10)
  }
  listeSkole = getTop10(listeSkole)
  listeEkstra = getTop10(listeEkstra)
  listeBolig = getTop10(listeBolig)
  console.log('list skole',listeSkole )
  console.log('list bolig', listeBolig)
  console.log('list ekstra', listeEkstra)

  return{

    money: a,
    moneySkole: listeSkole,
    moneyBolig: listeBolig,
    moneyEkstra: listeEkstra

}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    get_all_money,

  },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Example);
