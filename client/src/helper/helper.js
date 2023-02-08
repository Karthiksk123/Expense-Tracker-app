import _ from "lodash";

export function getTotal(transaction){
  return _.sum(getSum(transaction))
}

export function chart_data(transaction, custom) {
  let datavalue = getSum(transaction);

  let bg = _.map(transaction, (a) => a.color);
  bg = _.uniq(bg);
  const config = {
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: datavalue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return custom ?? config;
}

export function getSum(transaction, type) {
  let sum = _(transaction)
    .groupBy("type")
    .map((objs, key) => {
      if (!type) return _.sumBy(objs, "amount");
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, "amount"),
      };
    })
    .value();

  return sum;
}

export function getLabels(transaction) {
  let amountSum = getSum(transaction, "type");
  let total = _.sum(getSum(transaction));

  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / total }))
    .value();

  return percent;
}
