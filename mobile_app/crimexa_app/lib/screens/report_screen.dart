import 'package:flutter/material.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';

class ReportScreen extends StatelessWidget {
  const ReportScreen({super.key});

  void generatePdfReport(BuildContext context) async {
    final pdf = pw.Document();
    pdf.addPage(pw.Page(build: (context) {
      return pw.Center(
          child: pw.Column(children: [
        pw.Text("Crime Report", style: pw.TextStyle(fontSize: 24)),
        pw.SizedBox(height: 20),
        pw.Text("Predicted Crime: Theft"),
        pw.Text("Confidence: 82%"),
        pw.Text("Threat Level: HIGH"),
      ]));
    }));

    await Printing.layoutPdf(
        onLayout: (format) async => pdf.save()); // opens print preview
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        onPressed: () => generatePdfReport(context),
        child: const Text("Generate PDF Report"),
      ),
    );
  }
}