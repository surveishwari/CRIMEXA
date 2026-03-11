import 'package:flutter/material.dart';

class StatsCard extends StatelessWidget {
  final String title;
  final int count;
  final IconData icon;
  final Color startColor;
  final Color endColor;

  StatsCard({
    required this.title,
    required this.count,
    required this.icon,
    required this.startColor,
    required this.endColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [startColor, endColor],
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
              color: Colors.black12, blurRadius: 10, offset: Offset(0, 5))
        ],
      ),
      child: Row(
        children: [
          Icon(icon, size: 40, color: Colors.white),
          SizedBox(width: 15),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('$count',
                  style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: Colors.white)),
              Text(title, style: TextStyle(color: Colors.white70)),
            ],
          ),
        ],
      ),
    );
  }
}