import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/crime_provider.dart';
import 'crime_heatmap_screen.dart';
import 'evidence_mapping_map_screen.dart';
import 'package:fl_chart/fl_chart.dart';

class AdvancedDashboardScreen extends StatefulWidget {
  const AdvancedDashboardScreen({super.key});

  @override
  State<AdvancedDashboardScreen> createState() => _AdvancedDashboardScreenState();
}

class _AdvancedDashboardScreenState extends State<AdvancedDashboardScreen> {
  @override
  void initState() {
    super.initState();
    final crimeProvider = Provider.of<CrimeProvider>(context, listen: false);
    crimeProvider.fetchCrimes();
  }

  @override
  Widget build(BuildContext context) {
    final crimeProvider = Provider.of<CrimeProvider>(context);

    return Scaffold(
      appBar: AppBar(title: const Text('CRIMEXA Dashboard')),
      drawer: Drawer(
        child: ListView(
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(color: Colors.deepPurple),
              child: Text('Menu', style: TextStyle(color: Colors.white, fontSize: 24)),
            ),
            ListTile(
              leading: const Icon(Icons.dashboard),
              title: const Text('Dashboard'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: const Icon(Icons.map),
              title: const Text('Crime Heatmap'),
              onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const CrimeHeatmapScreen())),
            ),
            ListTile(
              leading: const Icon(Icons.analytics),
              title: const Text('Evidence Mapping'),
              onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const EvidenceMappingMapScreen())),
            ),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStatCard('Total Crimes', crimeProvider.crimeList.length.toString(), Colors.red),
                _buildStatCard('Solved Cases', '0', Colors.green),
                _buildStatCard('Pending Cases', '0', Colors.orange),
              ],
            ),
            const SizedBox(height: 20),
            Expanded(
              child: Card(
                elevation: 4,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: PieChart(
                    PieChartData(
                      sections: [
                        PieChartSectionData(value: 40, color: Colors.red, title: 'Robbery'),
                        PieChartSectionData(value: 25, color: Colors.blue, title: 'Burglary'),
                        PieChartSectionData(value: 20, color: Colors.orange, title: 'Assault'),
                        PieChartSectionData(value: 15, color: Colors.green, title: 'Other'),
                      ],
                      sectionsSpace: 4,
                      centerSpaceRadius: 30,
                      pieTouchData: PieTouchData(enabled: true),
                    ),
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String title, String count, Color color) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 500),
      curve: Curves.easeInOut,
      width: 100,
      height: 100,
      child: Card(
        color: color,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(count, style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Text(title, style: const TextStyle(color: Colors.white)),
            ],
          ),
        ),
      ),
    );
  }
}