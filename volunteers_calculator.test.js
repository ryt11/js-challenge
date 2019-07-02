#!/usr/bin/env node

// install jest with `npm install -g --save-dev jest`
var VolunteersCalculator = require("./volunteers_calculator");

test('processFile', function() {
  var calculator = new VolunteersCalculator();
  calculator.processFile('food_shelf_north.txt', function(daysCount, data) {
    expect(data.length).toEqual(5);
    expect(calculator.daysCount).toEqual(5);
  });
});

test('testBagsStillNeeded', function() {
  var calculator = new VolunteersCalculator();
  var data = [[10,20,17],
              [13,22,8]];

  calculator.data = data;
  calculator.daysCount = 2;

  var computedBagsStillNeeded = calculator.getBagsStillNeeded()

  expect(computedBagsStillNeeded[0]).toEqual(3);
  expect(computedBagsStillNeeded[1]).toEqual(14);
});

test('testBagsStockedPerVolunteer', function() {
  var calculator = new VolunteersCalculator();

  var data = [[15,45,35],
              [16,44,32],
              [12,33,22]];

  calculator.data = data;
  calculator.daysCount = 3;

  var computedBagsStockedPerVolunteer = calculator.getBagsStockedPerVolunteer()

  expect(computedBagsStockedPerVolunteer[0].toFixed(2)).toEqual('2.33');
  expect(computedBagsStockedPerVolunteer[1].toFixed(2)).toEqual('2.00');
  expect(computedBagsStockedPerVolunteer[2].toFixed(2)).toEqual('1.83');
});

test('testVolunteersNeeded', function() {
  var calculator = new VolunteersCalculator();

  calculator.bagsStillNeeded = [17,20,1];
  calculator.bagsStockedPerVolunteer = [12,17.55,4.18];
  calculator.daysCount = 3;

  var computedVolunteersNeeded = calculator.getVolunteersNeeded();

  expect(computedVolunteersNeeded[0]).toEqual('1.42');
  expect(computedVolunteersNeeded[1]).toEqual('1.14');
  expect(computedVolunteersNeeded[2]).toEqual('0.24');
});

test('testResultsWithoutDayNames', function() {
  var calculator = new VolunteersCalculator();

  var data = [[10,20,10],
              [20,40,20]];

  calculator.data = data;
  calculator.daysCount = data.length;

  var volunteers = calculator.getVolunteersNeeded();

  var computedResults = calculator.getResults(volunteers);

  expect(computedResults[0]).toEqual('10.00 additional volunteers are needed on day 0')
  expect(computedResults[1]).toEqual('20.00 additional volunteers are needed on day 1')
});

test('testResultsWithDayNames', function() {
  var calculator = new VolunteersCalculator();
  var data = [[10,20,10,'Monday'],
              [20,40,20,'Tuesday']];

  calculator.data = data;
  calculator.daysCount = data.length;

  var volunteers = calculator.getVolunteersNeeded();

  var computedResults = calculator.getResults(volunteers);

  expect(computedResults[0]).toEqual('10.00 additional volunteers are needed on Monday')
  expect(computedResults[1]).toEqual('20.00 additional volunteers are needed on Tuesday')
});
