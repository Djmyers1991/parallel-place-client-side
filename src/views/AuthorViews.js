import { Route, Routes } from "react-router-dom"
import { LandingPageGreeting } from "../components/landingpage/LandingPage"
import { VocabListStudent } from "../components/vocabwords/studentvocab/StudentList"
import { StudentVocabForm } from "../components/vocabwords/studentvocab/StudentVocabForm"
import { EditStudentWord } from "../components/vocabwords/studentvocab/EditStudentWord"
import { StudentNameList } from "../components/students/StudentNameList"
import { EditStudentNameList } from "../components/students/EditStudentNameList"
import { TeacherNameList } from "../components/teachers/TeacherNameList"
import { AssignmentList } from "../components/assignments/AssignmentList"
import { StandardSubmissionForm } from "../components/assignments/StandardSubmissionForm"
import { StandardSubmissionList } from "../components/submissions/StandardSubmissionsList"



export const AuthorViews = ({ token, setToken}) => {
  return <>
    <Routes>
       
        
        <Route path="/" element={<LandingPageGreeting/>}  />
        <Route path="/words" element={<VocabListStudent/>}  />
        <Route path="/wordsform" element={<StudentVocabForm/>}  />
        <Route path="/editword/:wordId" element={<EditStudentWord/>}  />
        <Route path="/teachernamelist" element={<TeacherNameList/>}  />
        <Route path="/studentnamelist" element={<StudentNameList/>}  />
        <Route path="/assignmentlist" element={<AssignmentList/>}  />
        <Route path="/standardsubmissionform" element={<StandardSubmissionForm/>}  />
        <Route path="/standardsubmissionslist" element={<StandardSubmissionList/>}  />










          

        
    </Routes>
  </>
}


