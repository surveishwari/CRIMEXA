import 'package:flutter/material.dart';
import '../models/case_model.dart';

class CaseCard extends StatelessWidget {
  final CaseModel caseItem;
  final VoidCallback onTap;

  CaseCard({required this.caseItem, required this.onTap});

  Color getPriorityColor(String priority) {
    switch (priority) {
      case 'High':
        return Colors.redAccent;
      case 'Medium':
        return Colors.orangeAccent;
      default:
        return Colors.green;
    }
  }

  IconData getStatusIcon(String status) {
    switch (status) {
      case 'Open':
        return Icons.lock_open;
      case 'Closed':
        return Icons.check_circle;
      default:
        return Icons.search;
    }
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.all(15),
        margin: EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(15),
          boxShadow: [
            BoxShadow(
                color: Colors.black12, blurRadius: 8, offset: Offset(0, 5))
          ],
        ),
        child: Row(
          children: [
            CircleAvatar(
              radius: 25,
              backgroundColor: getPriorityColor(caseItem.priority),
              child: Icon(getStatusIcon(caseItem.status), color: Colors.white),
            ),
            SizedBox(width: 15),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(caseItem.title,
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  Text('Officer: ${caseItem.officer}',
                      style: TextStyle(color: Colors.grey[600])),
                  Text('Date: ${caseItem.date.toLocal()}'.split(' ')[0],
                      style: TextStyle(color: Colors.grey[600])),
                ],
              ),
            ),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: getPriorityColor(caseItem.priority).withOpacity(0.2),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(caseItem.priority,
                  style: TextStyle(
                      color: getPriorityColor(caseItem.priority),
                      fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }
}