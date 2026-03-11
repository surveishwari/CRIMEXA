// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'case_model.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class CaseModelAdapter extends TypeAdapter<CaseModel> {
  @override
  final int typeId = 1;

  @override
  CaseModel read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return CaseModel(
      title: fields[0] as String,
      officer: fields[1] as String,
      date: fields[2] as DateTime,
      evidenceKeys: (fields[3] as List).cast<int>(),
    );
  }

  @override
  void write(BinaryWriter writer, CaseModel obj) {
    writer
      ..writeByte(4)
      ..writeByte(0)
      ..write(obj.title)
      ..writeByte(1)
      ..write(obj.officer)
      ..writeByte(2)
      ..write(obj.date)
      ..writeByte(3)
      ..write(obj.evidenceKeys);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is CaseModelAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
