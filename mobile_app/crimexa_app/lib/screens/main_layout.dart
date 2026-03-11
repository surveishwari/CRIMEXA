import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/app_provider.dart';
import '../widgets/sidebar.dart';
import 'dashboard_screen.dart';
import 'cases_screen.dart';
import 'evidence_screen.dart';
import 'report_screen.dart';
import 'suspect_screen.dart';

class MainLayout extends StatelessWidget {
  const MainLayout({super.key});

  @override
  Widget build(BuildContext context) {

    final provider = Provider.of<AppProvider>(context);

    final screens = [
      const DashboardScreen(),
      const CasesScreen(),
      const EvidenceScreen(),
      const ReportScreen(),
      const SuspectScreen(),
    ];

    return Scaffold(
      body: Row(
        children: [

          const Sidebar(),

          Expanded(
            child: screens[provider.selectedIndex],
          )

        ],
      ),
    );
  }
}