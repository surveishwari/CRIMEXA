import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class AnalyticsChart extends StatelessWidget {
  final int cases;
  final int suspects;
  final int evidence;

  const AnalyticsChart({
    super.key,
    required this.cases,
    required this.suspects,
    required this.evidence,
  });

  @override
  Widget build(BuildContext context) {
    return PieChart(
      PieChartData(
        sections: [
          PieChartSectionData(
            value: cases.toDouble(),
            title: "Cases",
            color: Colors.red,
            radius: 50,
          ),
          PieChartSectionData(
            value: suspects.toDouble(),
            title: "Suspects",
            color: Colors.orange,
            radius: 50,
          ),
          PieChartSectionData(
            value: evidence.toDouble(),
            title: "Evidence",
            color: Colors.blue,
            radius: 50,
          ),
        ],
      ),
    );
  }
}