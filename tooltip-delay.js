(function (H) {
    H.wrap(H.Tooltip.prototype, 'refresh', function (proceed) {
        var point = arguments[1];
        var chart = this.chart;
        var tooltip = this;
        var refreshArguments = arguments;
        if (typeof chart.options.tooltip.showDelay === 'object')
        {
            var delay = H.pick(chart.options.tooltip.showDelay.delay, 1000);
            var delayOnMove = H.pick(chart.options.tooltip.showDelay.delayOnMove, true);
            if (tooltip.isHidden || delayOnMove) {
                clearTimeout(tooltip.showTimer);
                tooltip.showTimer = setTimeout(function () {
                    if (point === chart.hoverPoint || $.inArray(chart.hoverPoint, point) > -1) {
                        proceed.apply(tooltip, Array.prototype.slice.call(refreshArguments, 1));
                    }
                }, delay);
            } else {
                proceed.apply(tooltip, Array.prototype.slice.call(refreshArguments, 1));
            }
        } else {
            proceed.apply(tooltip, Array.prototype.slice.call(refreshArguments, 1));
        }
    });
}(Highcharts));
