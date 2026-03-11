import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../widgets/sidebar.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  Widget statCard(String title, String value, IconData icon) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 500),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.blueGrey.shade900,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Icon(icon, size: 40, color: Colors.blue),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(value,
                  style: const TextStyle(
                      fontSize: 22, fontWeight: FontWeight.bold)),
              Text(title)
            ],
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Sidebar(),
      appBar: AppBar(title: const Text("CRIMEXA Dashboard")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [

            /// Stats Row
            Row(
              children: [
                Expanded(child: statCard("Total Cases", "120", Icons.folder)),
                const SizedBox(width: 10),
                Expanded(child: statCard("Open Cases", "34", Icons.warning)),
              ],
            ),

            const SizedBox(height: 10),

            Row(
              children: [
                Expanded(child: statCard("Evidence", "87", Icons.search)),
                const SizedBox(width: 10),
                Expanded(child: statCard("Reports", "52", Icons.description)),
              ],
            ),

            const SizedBox(height: 30),

            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                "Crime Statistics",
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
            ),

            const SizedBox(height: 20),

            SizedBox(
              height: 250,
              child: BarChart(
                BarChartData(
                  barGroups: [
                    BarChartGroupData(x: 0, barRods: [BarChartRodData(toY: 10)]),
                    BarChartGroupData(x: 1, barRods: [BarChartRodData(toY: 7)]),
                    BarChartGroupData(x: 2, barRods: [BarChartRodData(toY: 5)]),
                    BarChartGroupData(x: 3, barRods: [BarChartRodData(toY: 12)]),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 30),

            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                "Recent Cases",
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
            ),

            const SizedBox(height: 10),

            Card(
              child: ListTile(
                leading: const Icon(Icons.warning),
                title: const Text("Motor Vehicle Theft"),
                subtitle: const Text("Street - 21:00"),
              ),
            ),

            Card(
              child: ListTile(
                leading: const Icon(Icons.warning),
                title: const Text("Criminal Damage"),
                subtitle: const Text("Restaurant - 17:30"),
              ),
            ),

            Card(
              child: ListTile(
                leading: const Icon(Icons.warning),
                title: const Text("Weapons Violation"),
                subtitle: const Text("Parking Lot - 22:00"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}