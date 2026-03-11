import 'package:flutter/material.dart';
import 'prediction_screen.dart';
import 'analytics_screen.dart';
import 'heatmap_screen.dart';
import 'report_screen.dart';
import 'sos_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 5,
      child: Scaffold(
        appBar: AppBar(
          title: const Text("CRIMEXA Dashboard"),
          bottom: const TabBar(
            isScrollable: true,
            tabs: [
              Tab(text: "Predict", icon: Icon(Icons.analytics)),
              Tab(text: "Analytics", icon: Icon(Icons.bar_chart)),
              Tab(text: "Heatmap", icon: Icon(Icons.map)),
              Tab(text: "Reports", icon: Icon(Icons.picture_as_pdf)),
              Tab(text: "SOS", icon: Icon(Icons.warning)),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            PredictionScreen(),
            AnalyticsScreen(),
            HeatmapScreen(),
            ReportScreen(),
            SosScreen(),
          ],
        ),
      ),
    );
  }
}