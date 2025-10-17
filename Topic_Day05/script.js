window.onload = function () {
  const canvas = document.getElementById("myChart");
  if (!canvas) {
    console.error("Không tìm thấy phần tử canvas!");
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Không thể lấy bối cảnh 2D của canvas!");
    return;
  }

  const PADDING = 60;
  const LEGEND_AREA_WIDTH = 160;
  const TEXT_COLOR = "#555";
  const AXIS_COLOR = "#333";
  const GRID_COLOR = "#e9e9e9";
  const FONT_FAMILY = "Arial, sans-serif";

  const chartWidth = canvas.width - 2 * PADDING - LEGEND_AREA_WIDTH;
  const chartHeight = canvas.height - 2 * PADDING;
  const data = chartData.data;
  const maxValue = 4;

  function drawAxes() {
    ctx.beginPath();
    ctx.strokeStyle = AXIS_COLOR;
    ctx.lineWidth = 1.5;
    ctx.moveTo(PADDING, PADDING);
    ctx.lineTo(PADDING, canvas.height - PADDING);
    ctx.lineTo(PADDING + chartWidth, canvas.height - PADDING);
    ctx.stroke();
  }

  function drawLabelsAndGrid() {
    ctx.fillStyle = TEXT_COLOR;
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.font = `14px ${FONT_FAMILY}`;
    const yAxisLabels = 5;
    for (let i = 0; i < yAxisLabels; i++) {
      const y = canvas.height - PADDING - (i / (yAxisLabels - 1)) * chartHeight;
      ctx.fillText(i, PADDING - 10, y);
      ctx.beginPath();
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;
      ctx.moveTo(PADDING, y);
      ctx.lineTo(PADDING + chartWidth, y);
      ctx.stroke();
    }

    ctx.textAlign = "center";
    const barSpacing = 2;
    const barWidth = chartWidth / (data.length * barSpacing);
    data.forEach((point, i) => {
      const x = PADDING + (i * barSpacing + barSpacing / 2) * barWidth;
      ctx.fillText(point.label, x, canvas.height - PADDING + 20);
    });

    ctx.save();
    ctx.font = `16px ${FONT_FAMILY}`;
    ctx.translate(25, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(chartData.yAxisLabel.toUpperCase(), 0, 0);
    ctx.restore();

    ctx.fillText(
      chartData.xAxisLabel.toUpperCase(),
      (PADDING + chartWidth + PADDING) / 2,
      canvas.height - PADDING / 2
    );

    ctx.font = `bold 22px ${FONT_FAMILY}`;
    ctx.fillStyle = "#000";
    ctx.fillText(chartData.title.toUpperCase(), canvas.width / 2, PADDING / 2);
  }

  function drawBars() {
    const barSpacing = 2;
    const barWidth = chartWidth / (data.length * barSpacing);
    data.forEach((point, i) => {
      const barHeight = (point.value / maxValue) * chartHeight;
      const x = PADDING + (i * barSpacing + (barSpacing - 1) / 2) * barWidth;
      const y = canvas.height - PADDING - barHeight;
      ctx.fillStyle = chartData.barColor;
      ctx.fillRect(x, y, barWidth, barHeight);
    });
  }

  function drawLegend() {
    const lines = chartData.legendLabel;
    const rectSize = 15;
    const spacing = 8;
    const lineHeight = 20;

    const legendX = PADDING + chartWidth + 40;
    const legendY = PADDING + 20;

    ctx.fillStyle = chartData.barColor;
    ctx.fillRect(legendX, legendY - rectSize / 2, rectSize, rectSize);

    ctx.fillStyle = TEXT_COLOR;
    ctx.font = `14px ${FONT_FAMILY}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    lines.forEach((line, index) => {
      const textY = legendY + index * lineHeight;
      ctx.fillText(line.toUpperCase(), legendX + rectSize + spacing, textY);
    });
  }

  function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    drawLabelsAndGrid();
    drawBars();
    drawLegend();
  }

  drawChart();
};
