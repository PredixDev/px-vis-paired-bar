
suite('Basic Column with include all series', () => {
  let barChart;
  suiteSetup( done => {
    barChart = fixture('px-vis-paired-bar-fixture');
    const width = 800;
    const height = 500;
    const margin = {
      "left": 50,
      "top": 10,
      "bottom": 50,
      "right": 50
    };
    const chartData = [{
      "cat": "A",
      "left": 56,
      "right":50
    },{
      "cat": "B",
      "left": 40,
      "right": 45
    },{
      "cat": "C",
      "left": 43,
      "right": 43
    },{
      "cat": "D",
      "left": 33,
      "right": 29
    },{
      "cat": "E",
      "left": 47,
      "right": 51
    },{
      "cat": "F",
      "left": 41,
      "right": 49
    }];

    const seriesConfig = {
      "left": {
        "y":"cat",
        "x":"left"
      },
      "right": {
        "y":"cat",
        "x":"right"
      }
    };

    let renderingCB = function() {
      barChart.removeEventListener('px-data-vis-colors-applied', colorAppliedCB);
      barChart.removeEventListener('px-vis-bar-svg-rendering-ended', renderingCB);
      done();
    };

    let colorAppliedCB = function() {
      barChart.addEventListener('px-vis-bar-svg-rendering-ended', renderingCB);
    };

    barChart.addEventListener('px-data-vis-colors-applied', colorAppliedCB);

    barChart.setProperties({
      width: width,
      height: height,
      margin: margin,
      chartData: chartData,
      seriesConfig: seriesConfig
    });
  });

  test('completeSeriesConfig', () => {
    const csc = {
      left: {
        color: "rgb(90,191,248)",
        name: "left",
        type: 'bar',
        y: "cat",
        x: "left"
      },
      right: {
        color: "rgb(226,141,23)",
        name: "right",
        type: 'bar',
        y: "cat",
        x: "right"
      },
    };
    assert.deepEqual(barChart.completeSeriesConfig, csc);
  });

  test('_leftData', () => {
    const scd = [
      [0,56],
      [0,40],
      [0,43],
      [0,33],
      [0,47],
      [0,41]
    ];

    assert.deepEqual(JSON.parse(JSON.stringify(barChart._leftData)), scd);
    assert.equal(barChart._leftData.key, "left");
    assert.equal(barChart._leftData.index, 0);
    assert.deepEqual(barChart._leftData[0]['data'], {
      "cat": "A",
      "left": 56,
      "right":50
    });
    assert.deepEqual(barChart._leftData[5]['data'], {
      "cat": "F",
      "left": 41,
      "right": 49
    });
  });

  test('_rightData', () => {
    const scd = [
      [0,50],
      [0,45],
      [0,43],
      [0,29],
      [0,51],
      [0,49]
    ];

    assert.deepEqual(JSON.parse(JSON.stringify(barChart._rightData)), scd);
    assert.equal(barChart._rightData.key, "right");
    assert.equal(barChart._rightData.index, 0);
    assert.deepEqual(barChart._rightData[0]['data'], {
      "cat": "A",
      "left": 56,
      "right":50
    });
    assert.deepEqual(barChart._rightData[5]['data'], {
      "cat": "F",
      "left": 41,
      "right": 49
    });
  });

  test('scales', () => {
    const y = ["A","B","C","D","E","F"];
    const x = [0,56];
    const rl = [350,0];
    const rr = [350,700];

    assert.deepEqual(barChart.x.domain(), x);
    assert.deepEqual(barChart.y.domain(), y);

    assert.deepEqual(barChart._leftX.range(), rl);
    assert.deepEqual(barChart._rightX.range(), rr);

    assert.deepEqual(barChart._leftX.domain(), x);
    assert.deepEqual(barChart._rightX.domain(), x);

  });
});