import { TeacherRegistrationForm } from "@/components/teacher-registration-form"

export default function TeacherRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">EduLMS এ শিক্ষক হয়ে যোগ দিন</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            আপনার জ্ঞান শেয়ার করুন, হাজারো শিক্ষার্থীর জীবন পরিবর্তন করুন এবং আপনার নিজস্ব shop page পান
          </p>
        </div>

        <TeacherRegistrationForm />
      </div>
    </div>
  )
}

export const metadata = {
  title: "Teacher Registration - EduLMS",
  description: "Join EduLMS as a teacher and get your own shop page with course and Amazon product integration",
}
