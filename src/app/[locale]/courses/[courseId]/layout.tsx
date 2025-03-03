import { Locale } from '@/lib/types/i18n';
import Header from '@/view/components/header';
import { getTranslations } from 'next-intl/server';
import { getCourse } from '@/lib/actions/course-actions';
import VideoWrapper from '@/view/course-details/video-wrapper';

export default async function Layout({
  children: _children,
  comments,
  topics,
  params,
  pdf,
}: {
  children: React.ReactNode;
  comments: React.ReactNode;
  topics: React.ReactNode;
  params: Promise<{ courseId: string }>;
  pdf: React.ReactNode;
}) {
  const { courseId } = await params;

  const course = await getCourse(courseId);

  return (
    <div>
      <Header
        title={course.title}
        breadcrumbs={[
          { label: 'home', href: '#' },
          { label: 'courses', href: '#' },
          { label: 'course_details' },
        ]}
      />
      <div className="container mx-auto py-4">
        <VideoWrapper course={course} topicsComponent={topics} commentsComponent={comments} />
      </div>
      {pdf}
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MetaData' });

  return {
    title: t('title'),
    description: t('description'),
  };
}
