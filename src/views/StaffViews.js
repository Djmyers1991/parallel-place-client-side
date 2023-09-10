import { Route, Routes } from "react-router-dom"
import { LandingPageGreeting } from "../components/landingpage/LandingPage"
import { VocabListTeacher } from "../components/vocabwords/teachervocab/TeacherList"
import { TeacherVocabForm } from "../components/vocabwords/teachervocab/TeacherVocabForm"
import { EditTeacherWord } from "../components/vocabwords/teachervocab/EditTeacherWord"

//import { SubscribedUserPosts } from "../components/subscriptions/ViewSubscribedUserPosts"

export const StaffViews = ({ token, setToken}) => {
  return <>
    <Routes>
        <Route path="/" element={<LandingPageGreeting/>}  />
        <Route path="/words" element={<VocabListTeacher/>}  />

        <Route path="/wordsform" element={<TeacherVocabForm/>}  />
        <Route path="/editword/:wordId" element={<EditTeacherWord/>}  />



       

    </Routes>
  </>
}

