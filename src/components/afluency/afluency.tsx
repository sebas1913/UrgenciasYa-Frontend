import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface HourData {
    [hour: string]: number;
}

interface ChartProps {
    hourData: HourData;
}

const DynamicHourChart: React.FC<ChartProps> = ({ hourData }) => {
    const [chartData, setChartData] = useState<{ hour: string; value: number }[]>([]);

    useEffect(() => {
        const updateChartData = () => {
            const currentDate = new Date();
            const currentHour = currentDate.getHours();
            const currentMinute = currentDate.getMinutes();

            const relevantHours = [-3, -2, -1, 0, 1, 2, 3].map(offset => {
                const hour = (currentHour + offset + 24) % 24;
                return hour.toString().padStart(2, '0') + ':00';
            });

            const newChartData = relevantHours.map(hour => ({
                hour,
                value: hourData[hour] || 0,
            }));

            setChartData(newChartData);
        };

        updateChartData();
        const intervalId = setInterval(updateChartData, 60000); // Actualizar cada minuto

        return () => clearInterval(intervalId);
    }, [hourData]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <XAxis dataKey="hour" />
                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
                                    <p>{`${payload[0].payload.hour}: ${payload[0].value}`}</p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DynamicHourChart;