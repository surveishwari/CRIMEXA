import 'package:flutter/material.dart';

class DataTableWidget extends StatelessWidget {

  final List<DataColumn> columns;
  final List<DataRow> rows;

  const DataTableWidget({
    super.key,
    required this.columns,
    required this.rows,
  });

  @override
  Widget build(BuildContext context) {

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B),
        borderRadius: BorderRadius.circular(12),
      ),
      child: DataTable(
        columns: columns,
        rows: rows,
      ),
    );
  }
}