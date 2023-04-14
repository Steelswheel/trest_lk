import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ThemeProvider, SvgWrapper } from "@nivo/core";
import { BoxLegendSvg } from "@nivo/legends";
import { cloneDeep } from 'lodash';

export function Statistic({data}: {data: any}) {
    const [chartData, setChartData] = useState(data);

    useEffect(() => {
        if (data) {
            let newData = cloneDeep(data);

            newData.forEach((item: any) => {
                item.data.forEach((i: any) => {
                    i.x = i.x.replace(/\d/gm, '');
                })
            });

            setChartData(newData);
        }
    }, [data]);

    function DashedSolidLine({ series, lineGenerator, xScale, yScale }: { series: any, lineGenerator: any, xScale: any, yScale: any }) {
        return series.map(({ id, data, color }: {id: any, data: any, color: any}, index: number) => (
            <path
                key={id}
                d={lineGenerator(
                    data.map((d: any) => ({
                        x: xScale(d.data.x),
                        y: yScale(d.data.y)
                    }))
                )}
                fill="none"
                stroke={color}
                style={
                    {
                        strokeDasharray: index === 2 ? "6, 6" : '',
                        strokeWidth: index === 0 ? 3 : 1
                    }
                }
            />
        ));
    };

    return (
        <div className="dashboard-card">
            <div className="dashboard-card-header">
                Cтатистика по заявкам
            </div>
            <div className="dashboard-card-content">
                <div className="dashboard-statistic-chart-legend">
                    <ThemeProvider>
                        <SvgWrapper
                            height={42}
                            width={200}
                            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        >
                            <BoxLegendSvg
                                anchor="top-left"
                                data={data}
                                containerWidth={200}
                                containerHeight={42}
                                direction="column"
                                itemWidth={64}
                                itemHeight={10}
                                itemsSpacing={5}
                                padding={0}
                                translateX={0}
                                translateY={0}
                                symbolSize={30}
                                symbolShape="square"
                            />
                        </SvgWrapper>
                    </ThemeProvider>
                </div>
                <div className="dashboard-statistic-chart-legend-mobile">
                    <ThemeProvider>
                        <SvgWrapper
                            height={10}
                            width={250}
                            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        >
                            <BoxLegendSvg
                                anchor="top-left"
                                data={data}
                                containerWidth={250}
                                containerHeight={10}
                                direction="row"
                                itemWidth={50}
                                itemHeight={10}
                                itemsSpacing={10}
                                padding={0}
                                translateX={0}
                                translateY={0}
                                symbolSize={12}
                                symbolShape="square"
                            />
                        </SvgWrapper>
                    </ThemeProvider>
                </div>

                <div className="dashboard-statistic-chart">
                    <ResponsiveLine
                        data={chartData}
                        margin={{ top: 18, right: 10, bottom: 25, left: 10 }}
                        xScale={{ 
                            type: 'point'
                        }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto'
                        }}
                        tooltip={({ point }) => {
                            return (
                                <div
                                    style={{
                                        background: 'white',
                                        padding: '5px',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    <div>{point.data.yFormatted}</div>
                                </div>
                            )
                        }}
                        colors={(d: any) => d.color}
                        curve="cardinal"
                        enableGridX={false}
                        axisLeft={null}
                        isInteractive={true}
                        useMesh={true}
                        enableCrosshair={false}
                        pointSize={8}
                        pointColor="white"
                        pointBorderWidth={2}
                        pointBorderColor="#8757E8"
                        layers={[
                            'grid',
                            'markers',
                            'axes',
                            'areas',
                            'crosshair',
                            'slices',
                            'points',
                            'mesh',
                            'legends',
                            DashedSolidLine
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}