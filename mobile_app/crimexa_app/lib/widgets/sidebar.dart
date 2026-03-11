import 'package:flutter/material.dart';

import '../screens/dashboard_screen.dart';
import '../screens/crime_scanner_screen.dart';
import '../screens/predict_crime_screen.dart';
import '../screens/crime_scene_viewer.dart';
import '../screens/crime_map_screen.dart';

class Sidebar extends StatelessWidget {
const Sidebar({super.key});

@override
Widget build(BuildContext context) {
return Drawer(
child: Container(
color: Colors.blueGrey.shade900,
child: ListView(
padding: EdgeInsets.zero,
children: [

```
        /// HEADER
        DrawerHeader(
          decoration: const BoxDecoration(
            color: Colors.black87,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [

              Icon(
                Icons.security,
                color: Colors.white,
                size: 40,
              ),

              SizedBox(height: 10),

              Text(
                "CRIMEXA",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),

              SizedBox(height: 5),

              Text(
                "AI Crime Investigation",
                style: TextStyle(
                  color: Colors.white70,
                ),
              ),
            ],
          ),
        ),

        /// DASHBOARD
        ListTile(
          leading: const Icon(Icons.dashboard, color: Colors.white),
          title: const Text(
            "Dashboard",
            style: TextStyle(color: Colors.white),
          ),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const DashboardScreen(),
              ),
            );
          },
        ),

        /// SCAN CRIME SCENE
        ListTile(
          leading: const Icon(Icons.camera_alt, color: Colors.white),
          title: const Text(
            "Scan Crime Scene",
            style: TextStyle(color: Colors.white),
          ),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const CrimeScannerScreen(),
              ),
            );
          },
        ),

        /// CRIME PREDICTION
        ListTile(
          leading: const Icon(Icons.analytics, color: Colors.white),
          title: const Text(
            "Crime Prediction",
            style: TextStyle(color: Colors.white),
          ),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const PredictCrimeScreen(),
              ),
            );
          },
        ),

        /// 3D CRIME SCENE
        ListTile(
          leading: const Icon(Icons.view_in_ar, color: Colors.white),
          title: const Text(
            "3D Crime Scene",
            style: TextStyle(color: Colors.white),
          ),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const CrimeSceneViewer(
                  prediction: "",
                  objects: [],
                ),
              ),
            );
          },
        ),

        /// CRIME HEATMAP
        ListTile(
          leading: const Icon(Icons.map, color: Colors.white),
          title: const Text(
            "Crime Heatmap",
            style: TextStyle(color: Colors.white),
          ),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const CrimeMapScreen(),
              ),
            );
          },
        ),

        /// REPORTS
        ListTile(
          leading: const Icon(Icons.description, color: Colors.white),
          title: const Text(
            "Reports",
            style: TextStyle(color: Colors.white),
          ),
          onTap: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text("Report module coming soon"),
              ),
            );
          },
        ),

      ],
    ),
  ),
);
```

}
}
