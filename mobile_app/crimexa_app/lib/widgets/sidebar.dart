import 'package:flutter/material.dart';
import '../screens/upload_evidence_screen.dart';
import '../screens/scene_3d_screen.dart';
import '../screens/case_management_screen.dart';

class Sidebar extends StatelessWidget {
  const Sidebar({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        color: Colors.black87,

        child: ListView(
          children: [

            /// HEADER
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.redAccent,
              ),
              child: Text(
                "CRIMEXA Menu",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),

            /// UPLOAD EVIDENCE
            ListTile(
              leading: const Icon(
                Icons.upload_file,
                color: Colors.white,
              ),
              title: const Text(
                "Upload Evidence",
                style: TextStyle(color: Colors.white),
              ),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => const UploadEvidenceScreen(),
                  ),
                );
              },
            ),

            /// 3D SCENE VIEWER
            ListTile(
              leading: const Icon(
                Icons.map,
                color: Colors.white,
              ),
              title: const Text(
                "3D Scene Viewer",
                style: TextStyle(color: Colors.white),
              ),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => const Scene3DScreen(
                      modelPath: "assets/3d_scenes/sample.obj",
                    ),
                  ),
                );
              },
            ),

            /// CASE MANAGEMENT
            ListTile(
              leading: const Icon(
                Icons.folder,
                color: Colors.white,
              ),
              title: const Text(
                "Case Management",
                style: TextStyle(color: Colors.white),
              ),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => const CaseManagementScreen(),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}