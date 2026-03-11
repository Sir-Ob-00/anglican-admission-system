import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import Login from "../pages/auth/Login";
import Landing from "../pages/public/Landing";
import About from "../pages/public/About";
import Dashboard from "../pages/dashboard/Dashboard";
import ApplicantsList from "../pages/applicants/ApplicantsList";
import AddApplicant from "../pages/applicants/AddApplicant";
import ApplicantDetails from "../pages/applicants/ApplicantDetails";
import ApplicantReview from "../pages/applicants/ApplicantReview";
import AdmissionsList from "../pages/admissions/AdmissionsList";
import AdmissionDetails from "../pages/admissions/AdmissionDetails";
import ExamsList from "../pages/exams/ExamsList";
import ExamQuestions from "../pages/exams/ExamQuestions";
import ExamResults from "../pages/exams/ExamResults";
import TakeExam from "../pages/exams/TakeExam";
import PaymentsList from "../pages/payments/PaymentsList";
import InitiatePayment from "../pages/payments/InitiatePayment";
import Documents from "../pages/documents/Documents";
import ClassesList from "../pages/classes/ClassesList";
import TeachersList from "../pages/teachers/TeachersList";
import ParentsList from "../pages/parents/ParentsList";
import LinkParent from "../pages/parents/LinkParent";
import Reports from "../pages/reports/Reports";
import Notifications from "../pages/notifications/Notifications";
import UsersManagement from "../pages/settings/UsersManagement";
import BackupSystem from "../pages/settings/BackupSystem";
import ActivityLogs from "../pages/settings/ActivityLogs";
import StudentsList from "../pages/students/StudentsList";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/applicants" element={<ApplicantsList />} />
            <Route path="/applicants/new" element={<AddApplicant />} />
            <Route path="/applicants/:id" element={<ApplicantDetails />} />
            <Route path="/applicants/:id/review" element={<ApplicantReview />} />

            <Route path="/admissions" element={<AdmissionsList />} />
            <Route path="/admissions/:id" element={<AdmissionDetails />} />

            <Route path="/exams" element={<ExamsList />} />
            <Route path="/exams/:id/questions" element={<ExamQuestions />} />
            <Route path="/exams/:id/results" element={<ExamResults />} />
            <Route path="/exams/:id/take" element={<TakeExam />} />

            <Route path="/payments" element={<PaymentsList />} />
            <Route path="/payments/initiate" element={<InitiatePayment />} />

            <Route path="/documents" element={<Documents />} />
            <Route path="/classes" element={<ClassesList />} />
            <Route path="/teachers" element={<TeachersList />} />
            <Route path="/students" element={<StudentsList />} />

            <Route path="/parents" element={<ParentsList />} />
            <Route path="/parents/link" element={<LinkParent />} />

            <Route path="/reports" element={<Reports />} />
            <Route path="/notifications" element={<Notifications />} />

            <Route path="/settings/users" element={<UsersManagement />} />
            <Route path="/settings/backup" element={<BackupSystem />} />
            <Route path="/settings/logs" element={<ActivityLogs />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
