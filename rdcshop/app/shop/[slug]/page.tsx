import { TeacherShopPage } from "@/components/teacher-shop-page"
import { initializeDemoTeachers } from "@/lib/demo-teacher-management"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function ShopPage({ params }: PageProps) {
  // Initialize demo teachers if needed (client-side)
  if (typeof window !== "undefined") {
    initializeDemoTeachers()
  }

  // For server-side rendering, we'll handle the data fetching in the client component
  return <TeacherShopPage slug={params.slug} />
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const teacherName = params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `${teacherName} - EduLMS Teacher Shop`,
    description: `Explore courses and recommended products by ${teacherName} on EduLMS`,
    keywords: `${teacherName}, teacher, courses, education, EduLMS`,
  }
}
