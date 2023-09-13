import { Route, Routes } from "react-router-dom"
import { LandingPageGreeting } from "../components/landingpage/LandingPage"
import { VocabListTeacher } from "../components/vocabwords/teachervocab/TeacherList"
import { TeacherVocabForm } from "../components/vocabwords/teachervocab/TeacherVocabForm"
import { EditTeacherWord } from "../components/vocabwords/teachervocab/EditTeacherWord"
import { StudentNameList } from "../components/students/StudentNameList"
import { EditStudentWord } from "../components/vocabwords/studentvocab/EditStudentWord"
import { EditStudentNameList } from "../components/students/EditStudentNameList"
import { TeacherNameList } from "../components/teachers/TeacherNameList"
import { EditTeacherNameList } from "../components/teachers/EditTeacherNameList"
import { AssignmentList } from "../components/assignments/AssignmentList"
import { StandardAssignmentForm, StandardSubmissionForm } from "../components/submissions/StandardSubmissionForm"
import { StandardSubmissionList } from "../components/submissions/StandardSubmissionsList"
import {  TeacherEvaluateSubmission } from "../components/submissions/EditSubmissions"
import { EditTeacherAssignment} from "../components/assignments/EditAssignment"

export const StaffViews = ({ token, setToken}) => {
  return <>
    <Routes>
        <Route path="/" element={<LandingPageGreeting/>}  />
        <Route path="/words" element={<VocabListTeacher/>}  />

        <Route path="/wordsform" element={<TeacherVocabForm/>}  />
        <Route path="/editword/:wordId" element={<EditTeacherWord/>}  />
        <Route path="/studentnamelist" element={<StudentNameList/>}  />
        <Route path="/editstudentprofile/:studentId" element={<EditStudentNameList/>}  />
        <Route path="/editteachernamelist/:teacherId" element={<EditTeacherNameList/>}  />
        <Route path="/teachernamelist" element={<TeacherNameList/>}  />
        <Route path="/assignmentlist" element={<AssignmentList/>}  />
        <Route path="/standardassignmentform" element={<StandardSubmissionForm/>}  />
        <Route path="/standardsubmissionslist" element={<StandardSubmissionList/>}  />
        <Route path="/editstandardsubmission/:submissionId" element={<TeacherEvaluateSubmission/>}  />
        <Route path="/editassignment/:assignmentId" element={<EditTeacherAssignment/>}  />












       

    </Routes>
  </>
}

