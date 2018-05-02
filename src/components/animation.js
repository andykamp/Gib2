
import React, { PureComponent } from 'react';
import NodeGroup from 'react-move/NodeGroup';
import Surface from './surface'; // this is just a responsive SVG
import { scaleLinear, scaleBand } from 'd3-scale';
import { easeExpInOut } from 'd3-ease';
import { ascending, max } from 'd3-array';

// **************************************************
//  SVG Layout
// **************************************************
const view = [1000, 550]; // [width, height]
const trbl = [10, 10, 30, 10]; // [top, right, bottom, left] margins

const dims = [ // Adjusted dimensions [width, height]
  view[0] - trbl[1] - trbl[3],
  view[1] - trbl[0] - trbl[2],
];

// **************************************************
//  Mock Data
// **************************************************
let letters = [
  { letter: 'Anbefaler ikke', frequency: 80},
  { letter: 'Anbefaler ', frequency: 80 },

];

const y = scaleLinear()
  .range([dims[1], 0])
  .domain([0, max(letters, (d) => d.frequency)]);

class Example extends PureComponent {
  state = {
    sortAlpha: true,
  }

  update = () => {
    this.setState((state) => ({
      sortAlpha: !state.sortAlpha,
    }));
  }
  componentWillMount(){
    letters[0]["frequency"] = this.props.anbefaler
    letters[1]["frequency"] = this.props.anbefalerikke

  }
  render() {
    const { sortAlpha } = this.state;

    const sorted = letters.sort(sortAlpha ?
      (a, b) => ascending(a.letter, b.letter) :
      (a, b) => b.frequency - a.frequency,
    ).slice(0);

    const scale = scaleBand()
      .rangeRound([0, dims[0]])
      .domain(sorted.map((d) => d.letter))
      .padding(0.1);

    return (
      <div style={{height: 100, width: 200, marginBottom: 5}}>
        {/* <button onClick={this.update}>
          {`Sort ${sortAlpha ? 'Value' : 'Alpha'}`}
        </button> */}
        <Surface view={view} trbl={trbl}>
          <NodeGroup
            data={sorted}
            keyAccessor={(d) => d.letter}

            start={() => ({
              opacity: 1e-6,
              x: 1e-6,
              width: scale.bandwidth(),
            })}

            enter={(d) => ({
              opacity: [0.7],
              x: [scale(d.letter)],
              timing: { duration: 750, ease: easeExpInOut },
            })}

            update={(d, i) => ({
              opacity: [0.7],
              x: [scale(d.letter)],
              width: [scale.bandwidth()],
              timing: { duration: 750, delay: i * 50, ease: easeExpInOut },
            })}

            leave={() => ({
              opacity: [1e-6],
              x: [scale.range()[1]],
              timing: { duration: 750, ease: easeExpInOut },
            })}
          >
            {(nodes) => (
              <g>
                {nodes.map(({ key, data, state }) => {
                  const { x, ...rest } = state;

                  return (
                    <g key={key} transform={`translate(${x},0)`}>
                      <rect
                        height={dims[1] - y(data.frequency)}
                        y={y(data.frequency)}
                        fill="#00a7d8"
                        {...rest}
                      />
                      <text
                        x={scale.bandwidth() / 3}
                        y={dims[1] + 50}
                        dx="-.35em"
                        fill="#333"
                        fontSize="50px"
                      >{data.letter}</text>
                    </g>
                  );
                })}
              </g>
            )}
          </NodeGroup>
        </Surface>
      </div>
    );
  }
}

export default Example;
