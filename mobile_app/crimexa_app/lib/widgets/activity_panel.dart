import 'package:flutter/material.dart';

class ActivityPanel extends StatelessWidget {
  const ActivityPanel({super.key});

  @override
  Widget build(BuildContext context) {

    return Container(
      padding: const EdgeInsets.all(20),

      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(12),
      ),

      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,

        children: const [

          Text(
            "Recent Activity",
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),

          SizedBox(height: 15),

          ListTile(
            leading: Icon(Icons.folder),
            title: Text("New Case Registered"),
            subtitle: Text("Pune Station - 10 mins ago"),
          ),

          ListTile(
            leading: Icon(Icons.search),
            title: Text("Evidence Uploaded"),
            subtitle: Text("Fingerprint Sample"),
          ),

          ListTile(
            leading: Icon(Icons.analytics),
            title: Text("AI Prediction Generated"),
            subtitle: Text("Case #182"),
          ),

        ],
      ),
    );
  }
}