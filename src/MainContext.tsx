import { createContext, ReactNode, useContext, useState } from "react";
// import studentData from './Data.json'
import { DropdownDataType } from "./Components/Dropdown";


interface MainContextType {
  selectedGrade: string | null;
  setSelectedGrade: React.Dispatch<React.SetStateAction<string | null>>;
  studentsList: DropdownDataType[];
  setStudentsList: React.Dispatch<React.SetStateAction<DropdownDataType[]>>;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export const useMainContext = () => {
  const projectContext = useContext(MainContext);
  if (!projectContext) {
    throw new Error("useMainContext must be used within a LoginProvider");
  }
  return projectContext;
};

interface MainProviderProps {
  children: ReactNode;
}
export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [studentsList, setStudentsList] = useState<DropdownDataType[]>([]);
  return (
    <MainContext.Provider
      value={{ selectedGrade, setSelectedGrade, studentsList, setStudentsList }}
    >
      {children}
    </MainContext.Provider>
  );
};
