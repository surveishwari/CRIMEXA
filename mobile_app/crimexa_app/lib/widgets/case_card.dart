import 'package:flutter/material.dart';

class CaseCard extends StatelessWidget {
  final String title;
  final String description;
  final VoidCallback onView;
  final VoidCallback onEdit;
  final VoidCallback onDelete;

  const CaseCard({
    super.key,
    required this.title,
    required this.description,
    required this.onView,
    required this.onEdit,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 5),
      child: ListTile(
        leading: const Icon(Icons.folder_open, size: 40, color: Colors.deepPurple),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(description),
        trailing: SizedBox(
          width: 110,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              IconButton(icon: const Icon(Icons.remove_red_eye, color: Colors.blue), onPressed: onView),
              IconButton(icon: const Icon(Icons.edit, color: Colors.orange), onPressed: onEdit),
              IconButton(icon: const Icon(Icons.delete, color: Colors.red), onPressed: onDelete),
            ],
          ),
        ),
      ),
    );
  }
}
