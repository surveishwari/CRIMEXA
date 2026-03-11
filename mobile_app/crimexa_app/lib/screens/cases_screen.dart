import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../widgets/data_table_widget.dart';

class CasesScreen extends StatelessWidget {
  const CasesScreen({super.key});

  @override
  Widget build(BuildContext context) {

    final provider = Provider.of<AppProvider>(context);

    return Padding(
      padding: const EdgeInsets.all(30),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [

              const Text(
                "Cases",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),

              ElevatedButton(
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (_) => const CreateCaseDialog(),
                  );
                },
                child: const Text("New Case"),
              )
            ],
          ),

          const SizedBox(height: 20),

          Expanded(
            child: DataTableWidget(
              columns: const [
                DataColumn(label: Text("ID")),
                DataColumn(label: Text("Title")),
                DataColumn(label: Text("Location")),
                DataColumn(label: Text("Status")),
              ],
              rows: provider.cases.map((c) {
                return DataRow(cells: [
                  DataCell(Text(c.id)),
                  DataCell(Text(c.title)),
                  DataCell(Text(c.location)),
                  DataCell(Text(c.status)),
                ]);
              }).toList(),
            ),
          )

        ],
      ),
    );
  }
}

class CreateCaseDialog extends StatefulWidget {
  const CreateCaseDialog({super.key});

  @override
  State<CreateCaseDialog> createState() => _CreateCaseDialogState();
}

class _CreateCaseDialogState extends State<CreateCaseDialog> {

  final titleController = TextEditingController();
  final locationController = TextEditingController();

  @override
  Widget build(BuildContext context) {

    final provider = Provider.of<AppProvider>(context, listen: false);

    return AlertDialog(
      title: const Text("Create Case"),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [

          TextField(
            controller: titleController,
            decoration: const InputDecoration(labelText: "Case Title"),
          ),

          TextField(
            controller: locationController,
            decoration: const InputDecoration(labelText: "Location"),
          ),

        ],
      ),
      actions: [

        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text("Cancel"),
        ),

        ElevatedButton(
          onPressed: () {

            provider.createCase(
              titleController.text,
              locationController.text,
            );

            Navigator.pop(context);
          },
          child: const Text("Create"),
        )

      ],
    );
  }
}