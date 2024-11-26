import React, { useEffect, useMemo, useState } from "react";
import Dropdown from "../Components/Dropdown";
import rawStudentData from "../Data.json";
import { useMainContext } from "../MainContext";
import DataTable, { IDataTableColumn } from "../Components/DataTable";

// Project:     Reactjs Practice
// Module:      View Module
// Component:   View Student Component
// Author:      Advyta
// Date:        26 Nov 2024
// Logic:
// This component renders two dropdown components lets the user select values. Second dropdown is enabled only when the user has selected a grade from the first dropdown.
// Second dropdown lets the user select a student from that grade. Then DataTable component is rendered, it contains scores of all the subjects of the selected student.
//

interface Marks {
  [subject: string]: number;
}

interface Student {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  age: number;
  gender: string;
  marks: Marks;
}

interface Grade {
  id: number;
  grade: number;
  students: Student[];
}
interface StudentDataType {
  students: Grade[];
}
const StudentData = rawStudentData as StudentDataType;

const Students = () => {
  const { selectedGrade, setSelectedGrade, studentsList, setStudentsList } =
    useMainContext();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const dropdownData1 = () => {
    return StudentData.students.map((grade) => ({
      option: `Grade ${grade.grade}`,
      value: grade.id.toString(),
    }));
  };

  // Update the student list when the grade changes

  useEffect(() => {
    if (selectedGrade) {
      const gradeData = StudentData.students.find(
        (grade) => grade.id.toString() === selectedGrade
      );
      const studentOptions = gradeData
        ? gradeData.students.map((student) => ({
            option: `${student.first_name} ${student.last_name}`,
            value: student.id.toString(),
          }))
        : [];
      setStudentsList(studentOptions);
      setSelectedStudent(""); // Reset the second dropdown
    } else {
      setStudentsList([]);
      setSelectedStudent(""); // Reset if no grade is selected
    }
  }, [selectedGrade, setStudentsList]);

  // Get student score data

  const selectStudentMarks = useMemo(() => {
    if (selectedGrade && selectedStudent) {
      const gradeData = StudentData.students.find(
        (grade) => grade.id.toString() === selectedGrade
      );
      const studentData = gradeData?.students.find(
        (student) => student.id.toString() === selectedStudent
      );
      return studentData?.marks || {};
    }
  }, [selectedGrade, selectedStudent]);

  const columnData: IDataTableColumn[] = [
    { id: "subject", name: "Subjects", enableSort: false, align: "left" },
    { id: "marks", name: "Marks", enableSort: true, align: "left" },
  ];
  const rows = React.useMemo(() => {
    return Object.entries(selectStudentMarks || {}).map(([subject, marks]) => ({
      subject,
      marks,
    }));
  }, [selectStudentMarks]);

  return (
    <div className="mt-4 d-flex flex-column">
      <div className="d-flex gap-4">
        <Dropdown
          label="Select Grade: "
          dropdownData={dropdownData1()}
          onChangeFc={(value) => {
            setSelectedGrade(value);
          }}
          value={selectedGrade || ""}
        />
        <Dropdown
          label="Select Student: "
          dropdownData={studentsList}
          onChangeFc={(value) => setSelectedStudent(value)}
          disabled={!selectedGrade}
          value={selectedStudent || ""}
        />
      </div>

      {/* Show table when a student is selected */}
      {selectedStudent && rows.length > 0 && (
        <div className="mt-4">
          <h3>Performance Report for {studentsList.find((student) => student.value === selectedStudent)?.option} in Grade {selectedGrade} </h3>
          <DataTable columnData={columnData} rows={rows} />
        </div>
      )}
    </div>
  );
};

export default Students;
