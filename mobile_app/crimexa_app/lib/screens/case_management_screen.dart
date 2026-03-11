import 'package:flutter/material.dart';
import '../widgets/case_card.dart';

class CaseManagement extends StatelessWidget {
  const CaseManagement({super.key});

  @override
  Widget build(BuildContext context) {
    final cases = List.generate(
        5,
        (index) => {
              'title': 'Case #${index + 1}',
              'description': 'Details about this case'
            });

    return Scaffold(
      appBar: AppBar(title: const Text("Case Management")),
      body: ListView.builder(
        itemCount: cases.length,
        itemBuilder: (context, index) {
          final c = cases[index];
          return CaseCard(
            title: c['title']!,
            description: c['description']!,
            onView: () {},
            onEdit: () {},
            onDelete: () {},
          );
        },
      ),
    );
  }
}
