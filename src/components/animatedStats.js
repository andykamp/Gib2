
import React, { PureComponent } from 'react';
import NodeGroup from 'react-move/NodeGroup';
import Surface from './surface'; // this is just a responsive SVG
import { scaleLinear, scaleBand } from 'd3-scale';
import { easeExpInOut } from 'd3-ease';
import { ascending, max } from 'd3-array';

// **************************************************
//  SVG Layout
// **************************************************
const view = [1000, 450]; // [width, height]
const trbl = [10, 10, 30, 10]; // [top, right, bottom, left] margins

const dims = [ // Adjusted dimensions [width, height]
  view[0] - trbl[1] - trbl[3],
  view[1] - trbl[0] - trbl[2],
];

// **************************************************
//  Mock Data
// **************************************************
const letters = [
  { letter: 'Asia', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02780 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02022 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06973 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00747 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02517 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00098 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06333 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.01037 },
  { letter: 'W', frequency: 0.02465 },
  { letter: 'X', frequency: 0.00150 },
  { letter: 'Y', frequency: 0.01971 },
  { letter: 'Z', frequency: 0.00074 },
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

  render() {
    const { sortAlpha } = this.state;

    const sorted = letters.sort(sortAlpha ?
      (a, b) => ascending(a.letter, b.letter) :
      (a, b) => b.frequency - a.frequency,
    ).slice(0);

    const scale = scaleBand()
      .rangeRound([0, 400])
      .domain(sorted.map((d) => d.letter))
      .padding(0.1);

    return (
      <div style={{marginTop: '10vh', minHeight: 1}}>
        <button onClick={this.update} className="sortButton">
          {`Sort ${sortAlpha ? 'Value' : 'Alpha'}`}
        </button>
        <Surface view={view} trbl={trbl}>
          <NodeGroup
            data={sorted}
            keyAccessor={(d) => d.letter}

            start={() => ({
              opacity: 1e-6,
              y: 1e-6,
              height: scale.bandwidth(),
            })}

            enter={(d) => ({
              opacity: [0.7],
              y: [scale(d.letter)],
              timing: { duration: 750, ease: easeExpInOut },
            })}

            update={(d, i) => ({
              opacity: [0.7],
              y: [scale(d.letter)],
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
                        width={dims[1] - y(data.frequency)}
                        x={100}
                        fill="#00a7d8"
                        y={10}
                        {...rest}
                      />
                      <text
                        // y={-100}
                        x={0}
                        dy="10"
                        fill="#333"
                        {...rest}


                      >{data.letter}</text>
                      <text
                        // y={-100}
                        x={100}
                        dy="10"
                        fill="#333"
                        {...rest}


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
