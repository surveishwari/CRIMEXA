import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class CrimeChart extends StatelessWidget {
  const CrimeChart({super.key});

  @override
  Widget build(BuildContext context) {

    return Container(
      height: 260,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(12),
      ),

      child: LineChart(

        LineChartData(

          gridData: FlGridData(show: false),

          titlesData: FlTitlesData(show: true),

          borderData: FlBorderData(show: false),

          lineBarsData: [

            LineChartBarData(
              spots: const [
                FlSpot(0, 1),
                FlSpot(1, 3),
                FlSpot(2, 2),
                FlSpot(3, 5),
                FlSpot(4, 3),
                FlSpot(5, 6),
              ],

              isCurved: true,
              barWidth: 3,
            )

          ],
        ),
      ),
    );
  }
}