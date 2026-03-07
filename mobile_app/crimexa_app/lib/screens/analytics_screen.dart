import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AnalyticsScreen extends StatefulWidget {
  const AnalyticsScreen({super.key});

  @override
  State<AnalyticsScreen> createState() => _AnalyticsScreenState();
}

class _AnalyticsScreenState extends State<AnalyticsScreen> {
  List<int> monthlyData = List.filled(12, 0);

  @override
  void initState() {
    super.initState();
    fetchAnalytics();
  }

  Future<void> fetchAnalytics() async {
    try {
      final response = await http.get(Uri.parse("http://127.0.0.1:5000/analytics"));
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          monthlyData = List<int>.from(data);
        });
      }
    } catch (e) {
      // fallback to zeros
      setState(() {
        monthlyData = List.filled(12, 0);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final List<String> months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: BarChart(
          BarChartData(
            maxY: (monthlyData.reduce((a, b) => a > b ? a : b) + 10).toDouble(),
            barGroups: List.generate(
              12,
              (index) => BarChartGroupData(
                x: index,
                barRods: [
                  BarChartRodData(
                    toY: monthlyData[index].toDouble(),
                    color: Colors.blueAccent,
                    width: 22,
                    borderRadius: BorderRadius.circular(6),
                  ),
                ],
              ),
            ),
            titlesData: FlTitlesData(
              leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: true, reservedSize: 40)),
              bottomTitles: AxisTitles(
                sideTitles: SideTitles(
                  showTitles: true,
                  getTitlesWidget: (value, meta) {
                    final index = value.toInt();
                    return Text(months[index], style: const TextStyle(fontSize: 12));
                  },
                ),
              ),
              topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
              rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
            ),
            borderData: FlBorderData(show: false),
            gridData: FlGridData(show: false),
          ),
        ),
      ),
    );
  }
}